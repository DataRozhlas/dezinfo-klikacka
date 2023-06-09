import { useRef } from "preact/hooks";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const mean = (data: number[]) => {
  return (
    data.reduce((prev: number, current: number) => prev + current) / data.length
  );
};

const convertRange = (value: number) => {
  return value * 2 - 1;
};

const Chart = (props: HighchartsReact.Props) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const x = convertRange(
    mean(
      props.answers
        .filter((answer: { id: number }) => answer.id < 3)
        .map((answer: { answers: any[] }) =>
          answer.answers.map((answer: { value: any }) => answer.value)
        )
        .flat()
    )
  );
  const y = convertRange(
    mean(
      props.answers
        .filter((answer: { id: number }) => answer.id > 2)
        .map(
          (answer: { answers: { value: any }[] }) => answer.answers[0].value
        )!
    )
  );

  const options: Highcharts.Options = {
    chart: {
      height: "100%",
    },
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    yAxis: {
      max: 1,
      min: -1,
      lineWidth: 0,
      gridLineWidth: 0.5,
      title: {
        text: "",
      },
      plotLines: [
        {
          value: 0,
          label: {
            text: "Důvěra společenskému systému",
          },
        },
      ],
    },
    xAxis: {
      max: 1,
      min: -1,
      lineWidth: 0,
      gridLineWidth: 0.5,
      tickLength: 0,
      plotLines: [
        {
          value: 0,
          label: {
            text: "Informační gramotnost",
          },
        },
      ],
    },
    series: [
      {
        name: "Váš výsledek",
        type: "scatter",
        dataLabels: {
          enabled: true,
          format: "Vy",
          padding: 10,
        },
        tooltip: {
          pointFormat:
            "Důvěra společenskému systému: <b>{point.x:.2f}</b><br/>Informační gramotnost: <b>{point.y:.2f}</b><br/>",
        },
        data: [{ x: x, y: y, color: "#d52834", marker: { radius: 5 } }],
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
      {...props}
    />
  );
};
export default Chart;
