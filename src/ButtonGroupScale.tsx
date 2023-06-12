import { ButtonGroup, Button } from "@chakra-ui/react";

const colors = [
  "#4575b4",
  "#91bfdb",
  "#fee090",
  "#fc8d59",
  "#d73027",
  "#e0e0e0",
];

interface Props {
  options: {
    answer: string;
    value: number;
  }[];
  answers: {
    id: number;
    answers: {
      id: number;
      value: number;
      index: number;
    }[];
  }[];
  setAnswers: any;
  activeQuestion: number;
  subItem: number;
}

const ButtonGroupScale = ({
  options,
  answers,
  setAnswers,
  activeQuestion,
  subItem,
}: Props) => {
  return (
    <ButtonGroup variant="outline" isAttached={true} width="100%">
      {options.map((option, buttonIndex) => (
        <Button
          size="sm"
          height="60px"
          flexBasis={"100%"}
          style={{
            whiteSpace: "normal",
            wordWrap: "break-word",
          }}
          bg={colors[buttonIndex]}
          onClick={() => {
            setAnswers((prev: any) => {
              const currentQuestionAnswers = prev.find(
                (question: any) => question.id === activeQuestion
              );
              if (currentQuestionAnswers) {
                const newAnswers = prev.map((question: any) => {
                  if (question.id === activeQuestion) {
                    return {
                      id: activeQuestion,
                      answers: [
                        ...question.answers.filter(
                          (answer: any) => answer.id !== subItem
                        ),
                        {
                          id: subItem,
                          value: option.value,
                          index: buttonIndex,
                        },
                      ],
                    };
                  }
                  return question;
                });
                return newAnswers;
              }
              const newAnswers = [
                ...prev,
                {
                  id: activeQuestion,
                  answers: [
                    { id: subItem, value: option.value, index: buttonIndex },
                  ],
                },
              ];
              return newAnswers;
            });
          }}
          border={
            buttonIndex ===
            answers
              .find((answer) => answer.id === activeQuestion)
              ?.answers.find((answer) => answer.id === subItem)?.index
              ? "4px"
              : "0px"
          }
        >
          {option.answer}
        </Button>
      ))}
    </ButtonGroup>
  );
};
export default ButtonGroupScale;
