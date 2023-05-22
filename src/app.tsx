import { useState } from "preact/hooks";
import {
  Center,
  Stack,
  Box,
  Text,
  ButtonGroup,
  Button,
  Container,
} from "@chakra-ui/react";
import "./app.css";
import data from "./data/konspi.json";

const selectedData = data.slice(0, 10);

const possibleAnswers = [
  "Určitě ano",
  "Spíše ano",
  "Tak napůl",
  "Spíše ne",
  "Určitě ne",
  "Nevím",
];

type Answers = number[];

export function App() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>([]);

  return (
    <Container py={3} px={0}>
      <Stack gap={5}>
        <Center>
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
        </Center>
        <Text align={"center"} fontSize={"2xl"} fontWeight={"extrabold"}>
          {selectedData[activeQuestion].q}
        </Text>
        <Text align={"center"} fontSize={"1xl"} fontWeight={"semibold"}>
          Co si myslíte?
        </Text>
        <Center>
          <ButtonGroup variant="outline" isAttached={true}>
            {possibleAnswers.map((answer, index) => {
              return (
                <Button
                  size="sm"
                  height="60px"
                  width="calc(100%/6)"
                  style={{
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                  }}
                  onClick={() => {
                    setAnswers((prev) => {
                      const newAnswers = [...prev];
                      newAnswers[activeQuestion] = index;
                      return newAnswers;
                    });
                  }}
                  isActive={answers[activeQuestion] === index}
                >
                  {answer}
                </Button>
              );
            })}
          </ButtonGroup>
        </Center>
      </Stack>
    </Container>
  );
}
