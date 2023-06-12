import { useState, useEffect } from "preact/hooks";
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
import Chart from "./Chart";
import "./app.css";
import data from "./data/questions.json";
import { usePostMessageWithHeight } from "./hooks/usePostHeightMessage";

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

  const { containerRef, postHeightMessage } =
    usePostMessageWithHeight("dezinfo-kalkulacka");

  useEffect(() => {
    postHeightMessage();
  }, [activeQuestion, answers]);

  return (
    <Container py={3} px={0} maxWidth={"620px"} ref={containerRef}>
      {activeQuestion < data.length && (
        <Stack gap={5}>
          <Center>
            <Stack direction={"row"} wrap={"wrap"}>
              {data.map((_question, index) => (
                <Box
                  key={`question-${index}`}
                  bg={index === activeQuestion ? "#1A202C" : "#CBD5E0"}
                  rounded={"full"}
                  w={3}
                  h={3}
                  onClick={() => {
                    if (
                      answers.find(
                        (answer) =>
                          answer.id === index && answer.id < activeQuestion
                      )
                    ) {
                      setActiveQuestion(index);
                    }
                  }}
                  cursor={
                    answers.find(
                      (answer) =>
                        answer.id === index && answer.id < activeQuestion
                    )
                      ? "pointer"
                      : "default"
                  }
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
            <Container>
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
                <Stack gap={7}>
                  <Center>
                    <Stack>
                      {data[activeQuestion].answers?.map((answer, index) => {
                        return (
                          <Radio value={index.toString()}>
                            {answer.answer}
                          </Radio>
                        );
                      })}
                    </Stack>
                  </Center>
                  <Text fontSize={"xs"}>
                    Pokud nevíte, jaká je správná odpověď, nezkoušejte ji
                    uhádnout. Lepší je, když zaškrtnete možnost „nevím“.
                  </Text>
                </Stack>
              </RadioGroup>
            </Container>
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
                {activeQuestion < data.length - 1 ? "Další →" : "Výsledky →"}
              </Button>
            </Box>
          }
        </Stack>
      )}
      {activeQuestion === data.length && (
        <Container>
          <Text align={"center"} fontSize={"2xl"} fontWeight={"extrabold"}>
            Váš výsledek
          </Text>
          <Chart answers={answers}></Chart>
        </Container>
      )}
    </Container>
  );
}
