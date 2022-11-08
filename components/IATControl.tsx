import { Flex } from "@chakra-ui/react";
import { IAT, Item } from "implicit-association-test";
import React, { useCallback, useEffect, useState } from "react";
import { useRef } from "react";

import { IATDisplay } from "./IATDisplay";
import { IATResult } from "./IATResult";

export const IATControl = React.memo(function IATControl() {
  const [iat, setIat] = useState(
    IAT({
      categories: {
        Unpleasant: [item("Ugly"), item("Creepy"), item("Disturbing")],
        Pleasant: [item("Beautiful"), item("Nice"), item("Friendly")],
      },
      targets: {
        Insects: [item("Ant"), item("Cockroach"), item("Spider")],
        Flowers: [item("Tulip"), item("Rose"), item("Daffodil")],
      },
      trialsPerBlock: { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3 },
    })
  );

  const lastTime = useRef(new Date().getTime());
  const [started, setStarted] = useState(false);

  const onLeft = useCallback(() => {
    const now = new Date().getTime();
    if (!iat.testComplete) {
      const correct = iat.correctChoice === "left";
      setIat(iat.next(now - lastTime.current, correct));
    }
    lastTime.current = new Date().getTime();
  }, [iat, setIat]);

  const onRight = useCallback(() => {
    const now = new Date().getTime();
    if (!iat.testComplete) {
      const correct = iat.correctChoice === "right";
      setIat(iat.next(now - lastTime.current, correct));
    }
    lastTime.current = new Date().getTime();
  }, [iat, setIat]);

  const onSpaceBar = useCallback(() => {
    setStarted(true);
    lastTime.current = new Date().getTime();
  }, [setStarted]);

  useEffect(() => {
    const onKeyDown = ({ key }: KeyboardEvent) => {
      if (key === "ArrowLeft") {
        onLeft();
      } else if (key === "ArrowRight") {
        onRight();
      } else if (key === " ") {
        onSpaceBar();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onLeft, onRight, onSpaceBar]);

  if (!started) {
    return (
      <Flex
        flex="1"
        justifyContent="center"
        alignItems="center"
        fontSize="5xl"
        fontWeight="semibold"
      >
        Press the spacebar to start, then use the arrow keys to play.
      </Flex>
    );
  }

  if (iat.testComplete) {
    return <IATResult rawResults={iat.rawResults} />;
  } else {
    return (
      <>
        <IATDisplay
          item={iat.item}
          leftCategory={iat.left.category}
          rightCategory={iat.right.category}
          leftTarget={iat.left.target}
          rightTarget={iat.right.target}
        />
      </>
    );
  }
});

function item(text: string): Item {
  return {
    type: "text",
    text,
  };
}
