import { useState } from "preact/hooks";
import { Center, Stack, Box, styled } from "@chakra-ui/react";
import "./app.css";
import data from "./data/konspi.json";

const selectedData = data.slice(0, 10);

export function App() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  console.log(activeQuestion);
  return (
    <Center>
      <Stack py={3}>
        <Stack direction={"row"} wrap={"wrap"}>
          {selectedData.map((question, index) => (
            <Box
              bg={index === activeQuestion ? "#1A202C" : "#CBD5E0"}
              rounded={"full"}
              w={3}
              h={3}
              onClick={() => setActiveQuestion(index)}
              cursor={"pointer"}
            ></Box>
          ))}
        </Stack>
      </Stack>
    </Center>
  );
}
