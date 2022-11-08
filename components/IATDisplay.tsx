import { Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import { Item } from "implicit-association-test";
import React from "react";

interface Props {
  leftCategory?: string;
  leftTarget?: string;
  rightCategory?: string;
  rightTarget?: string;
  item: Item;
}

export const IATDisplay = React.memo(function IAT({
  leftCategory,
  leftTarget,
  rightCategory,
  rightTarget,
  item,
}: Props) {
  return (
    <Grid
      templateColumns="1fr 1fr"
      templateRows="max-content 1fr"
      border="1px"
      borderColor="gray.500"
      borderStyle="solid"
      flex="1"
    >
      <GridItem
        padding={2}
        textAlign="center"
        borderBottom="1px"
        borderColor="gray.500"
        display="flex"
        justifyContent="center"
      >
        <HStack>
          <Text fontWeight="semibold" fontSize="3xl">
            {leftCategory}
          </Text>
          {leftCategory != null && leftTarget != null ? (
            <Text color="gray.600" fontSize="3xl">
              OR
            </Text>
          ) : null}
          <Text fontWeight="semibold" fontSize="3xl">
            {leftTarget}
          </Text>
        </HStack>
      </GridItem>
      <GridItem
        padding={2}
        textAlign="center"
        borderBottom="1px"
        borderColor="gray.500"
        display="flex"
        justifyContent="center"
      >
        <HStack>
          <Text fontWeight="semibold" fontSize="3xl">
            {rightCategory}
          </Text>
          {rightCategory != null && rightTarget != null ? (
            <Text color="gray.600" fontSize="3xl">
              OR
            </Text>
          ) : null}
          <Text fontWeight="semibold" fontSize="3xl">
            {rightTarget}
          </Text>
        </HStack>
      </GridItem>
      <GridItem
        colSpan={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="5xl" fontWeight="semibold">
          {item.type === "text" ? item.text : item.url}
        </Text>
      </GridItem>
    </Grid>
  );
});
