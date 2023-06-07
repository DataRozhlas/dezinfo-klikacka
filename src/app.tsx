import { useState } from "preact/hooks";
import {
  Center,
  Stack,
  Box,
  Text,
  Button,
  Container,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import ButtonGroupScale from "./ButtonGroupScale";
import "./app.css";
import data from "./data/questions.json";

type Answers = {
  id: number;
  answers: {
    id: number;
    value: number;
    index: number;
  }[];
}[];

export function App() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>([]);

  //const { isOpen, onToggle } = useDisclosure();

  return (
    <Container py={3} px={0} maxWidth={"620px"}>
      {activeQuestion < data.length && (
        <Stack gap={5}>
          <Center>
            <Stack direction={"row"} wrap={"wrap"}>
              {data.map((question, index) => (
                <Box
                  key={`question-${index}`}
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
            {data[activeQuestion]?.question}
          </Text>
          {data[activeQuestion].items &&
            data[activeQuestion].items?.map((item, index) => {
              return (
                <Stack>
                  <Text fontSize={"2xl"}>{item.item}</Text>
                  <ButtonGroupScale
                    options={item.answers}
                    answers={answers}
                    setAnswers={setAnswers}
                    activeQuestion={activeQuestion}
                    subItem={index}
                  />
                </Stack>
              );
            })}
          {data[activeQuestion].answers && (
            <RadioGroup
              value={
                answers
                  .find((answer) => answer.id === activeQuestion)
                  ?.answers[0].index.toString() || ""
              }
              onChange={(value) => {
                setAnswers((prev) => {
                  return [
                    ...prev.filter(
                      (question) => question.id !== activeQuestion
                    ),
                    {
                      id: activeQuestion,
                      answers: [
                        {
                          id: 0,
                          value:
                            data[activeQuestion].answers![parseInt(value)]
                              .value,
                          index: parseInt(value),
                        },
                      ],
                    },
                  ];
                });
              }}
            >
              <Center>
                <Stack>
                  {data[activeQuestion].answers?.map((answer, index) => {
                    return (
                      <Radio value={index.toString()}>{answer.answer}</Radio>
                    );
                  })}
                </Stack>
              </Center>
            </RadioGroup>
          )}

          {
            <Box pt={10}>
              <Button
                width={"100%"}
                isDisabled={
                  !answers.find((answer) => answer.id === activeQuestion) ||
                  (data[activeQuestion].items &&
                    answers.find((answer) => answer.id === activeQuestion)
                      ?.answers.length !== data[activeQuestion].items?.length)
                }
                onClick={() => {
                  setActiveQuestion((prev) => prev + 1);
                }}
              >
                Další &rarr;
              </Button>
            </Box>
          }
        </Stack>
      )}
    </Container>
  );
}
