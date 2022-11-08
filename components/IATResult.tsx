import { Flex, Text } from "@chakra-ui/react";
import { getResults, RawResults } from "implicit-association-test";
import React, { useMemo } from "react";

export const IATResult = React.memo(function IATResult({
  rawResults,
}: {
  rawResults: RawResults<string, string>;
}) {
  const results = useMemo(() => getResults(rawResults), [rawResults]);

  return results.type === "valid" ? (
    <Flex flex="1" alignItems="center" justifyContent="center" flexDir="column">
      <Text fontSize="5xl" fontWeight="semibold" textAlign="center">
        You associate {results.association[0].target} with{" "}
        {results.association[0].category} and {results.association[1].target}{" "}
        with {results.association[1].category}.
      </Text>
      <Text fontSize="5xl" fontWeight="semibold" textAlign="center">
        Strength of association: {results.d.toFixed(2)}
      </Text>
    </Flex>
  ) : (
    <Flex flex="1" alignItems="center" justifyContent="center">
      <Text fontSize="5xl" fontWeight="semibold" textAlign="center">
        Invalid Test: ({results.reason})
      </Text>
    </Flex>
  );
});
