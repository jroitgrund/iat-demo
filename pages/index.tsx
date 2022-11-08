import { chakra } from "@chakra-ui/react";
import Head from "next/head";

import { IATControl } from "../components/IATControl";

export default function Home() {
  return (
    <>
      <Head>
        <title>IAT</title>
      </Head>

      <chakra.main display="flex" flex="1" padding={5}>
        <IATControl />
      </chakra.main>
    </>
  );
}
