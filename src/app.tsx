import { useState, useEffect } from "preact/hooks";
import {
  Center,
  Stack,
  Box,
  Text,
  ButtonGroup,
  Button,
  Container,
  ScaleFade,
  Tooltip,
} from "@chakra-ui/react";
import "./app.css";
import data from "./data/konspi.json";
import { usePostMessageWithHeight } from "./hooks/usePostHeightMessage";

//const selectedData = data.slice(0, 10);
//randomly select 10
const selectedData: any[] = [];
while (selectedData.length <= 10) {
  const i = Math.floor(Math.random() * data.length);
  selectedData.push(data[i]);
  data.splice(i, 1);
}

const possibleAnswers = [
  "Určitě ano",
  "Spíše ano",
  "Tak napůl",
  "Spíše ne",
  "Určitě ne",
  "Nevím",
];

const colors = [
  "#4575b4",
  "#91bfdb",
  "#fee090",
  "#fc8d59",
  "#d73027",
  "#e0e0e0",
];

type Answers = number[];

export function App() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>([]);

  const { containerRef, postHeightMessage } =
    usePostMessageWithHeight("dezinfo-klikacka");

  useEffect(() => {
    postHeightMessage();
  }, [activeQuestion, answers]);

  //const { isOpen, onToggle } = useDisclosure();

  return (
    <Container py={3} px={0} maxWidth={"620px"} ref={containerRef}>
      {activeQuestion < selectedData.length && (
        <Stack gap={5}>
          <Center>
            <Stack direction={"row"} wrap={"wrap"}>
              {selectedData.map((question, index) => (
                <Box
                  key={question.q}
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
            {selectedData[activeQuestion]?.q}
          </Text>
          <Text align={"center"} fontSize={"1xl"} fontWeight={"semibold"}>
            Co si myslíte vy?
          </Text>
          <Center>
            <ButtonGroup variant="outline" isAttached={true} width="100%">
              {possibleAnswers.map((answer, index) => {
                return (
                  <Button
                    size="sm"
                    height="60px"
                    flexBasis={"100%"}
                    style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                    }}
                    bg={colors[index]}
                    onClick={() => {
                      setAnswers((prev) => {
                        const newAnswers = [...prev];
                        newAnswers[activeQuestion] = index;
                        return newAnswers;
                      });
                    }}
                    border={answers[activeQuestion] === index ? "4px" : "0px"}
                  >
                    {answer}
                  </Button>
                );
              })}
            </ButtonGroup>
          </Center>
          <ScaleFade
            initialScale={0}
            in={answers[activeQuestion] !== undefined}
          >
            <Box mt={5}>
              <Stack gap={5}>
                <Text align={"center"} fontSize={"1xl"} fontWeight={"semibold"}>
                  Co si myslí Češky a Češi
                </Text>
                <Center>
                  {possibleAnswers.map((answer, index) => {
                    const value =
                      selectedData[activeQuestion]?.a[answer as keyof {}];
                    return (
                      <Tooltip
                        label={`${answer}: ${(
                          Math.floor(value * 10) / 10
                        ).toLocaleString("cs-CZ")} %`}
                      >
                        <Box
                          bg={colors[index]}
                          h={"60px"}
                          w={`${value}%`}
                          borderLeftRadius={index === 0 ? "md" : "none"}
                          borderRightRadius={index === 5 ? "md" : "none"}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          cursor={"help"}
                          border={
                            answers[activeQuestion] === index ? "4px" : "0px"
                          }
                        >
                          <Text
                            fontSize="xs"
                            fontWeight={"semibold"}
                            style={{
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {(Math.floor(value * 10) / 10).toLocaleString(
                              "cs-CZ"
                            )}{" "}
                            %
                          </Text>
                        </Box>
                      </Tooltip>
                    );
                  })}
                </Center>
              </Stack>
            </Box>
          </ScaleFade>
          {answers[activeQuestion] !== undefined && (
            <Box pt={10}>
              <Button
                width={"100%"}
                onClick={() => {
                  setActiveQuestion((prev) => prev + 1);
                }}
              >
                Další &rarr;
              </Button>
            </Box>
          )}
        </Stack>
      )}
      {activeQuestion === selectedData.length && (
        <Stack gap={10}>
          {answers.map((answerMain, indexMain) => {
            return (
              <Box>
                <Text
                  align={"center"}
                  fontSize={"2xl"}
                  fontWeight={"extrabold"}
                  pb={3}
                >
                  {selectedData[indexMain]?.q}
                </Text>
                <Center>
                  {possibleAnswers.map((answer, index) => {
                    const value =
                      selectedData[indexMain]?.a[answer as keyof {}];
                    return (
                      <Tooltip
                        label={`${answer}: ${(
                          Math.floor(value * 10) / 10
                        ).toLocaleString("cs-CZ")} %`}
                      >
                        <Box
                          bg={colors[index]}
                          h={"60px"}
                          w={`${value}%`}
                          borderLeftRadius={index === 0 ? "md" : "none"}
                          borderRightRadius={index === 5 ? "md" : "none"}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          cursor={"help"}
                          border={answerMain === index ? "4px" : "0px"}
                        >
                          <Text
                            fontSize="xs"
                            fontWeight={"semibold"}
                            style={{
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {(Math.floor(value * 10) / 10).toLocaleString(
                              "cs-CZ"
                            )}{" "}
                            %
                          </Text>
                        </Box>
                      </Tooltip>
                    );
                  })}
                </Center>
              </Box>
            );
          })}
        </Stack>
      )}
    </Container>
  );
}
