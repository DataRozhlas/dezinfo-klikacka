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
        data: [
          {
            x: x,
            y: y,
            color: "#FF0000",
            marker: { radius: 7, lineWidth: 2, lineColor: "#000" },
          },
        ],
      },
      {
        name: "Silní odpůrci konspirací",
        type: "scatter",
        dataLabels: {
          enabled: true,
          format: "Silní odpůrci",
          padding: 10,
        },
        tooltip: {
          pointFormat:
            "Důvěra společenskému systému: <b>{point.x:.2f}</b><br/>Informační gramotnost: <b>{point.y:.2f}</b><br/>",
        },
        data: [
          {
            x: 0.26,
            y: -0.04,
            color: "#4575b4",
            marker: { radius: 4, symbol: "square" },
          },
        ],
      },
      {
        name: "Silní příznivci konspirací",
        type: "scatter",
        dataLabels: {
          enabled: true,
          format: "Silní příznivci",
          padding: 10,
        },
        tooltip: {
          pointFormat:
            "Důvěra společenskému systému: <b>{point.x:.2f}</b><br/>Informační gramotnost: <b>{point.y:.2f}</b><br/>",
        },
        data: [
          {
            x: -0.64,
            y: -0.5,
            color: "#d53e4f",
            marker: { radius: 4, symbol: "square" },
          },
        ],
      },
      {
        name: "Průměr české populace",
        type: "scatter",
        dataLabels: {
          enabled: true,
          format: "Celá populace",
          padding: 10,
        },
        tooltip: {
          pointFormat:
            "Důvěra společenskému systému: <b>{point.x:.2f}</b><br/>Informační gramotnost: <b>{point.y:.2f}</b><br/>",
        },
        data: [
          {
            x: -0.14,
            y: -0.34,
            color: "#000",
            marker: { radius: 4, symbol: "square" },
          },
        ],
      },
      {
        visible: false,
        name: "Apatičtí",
        type: "scatter",
        dataLabels: {
          enabled: true,
          format: "Apatičtí",
          padding: 10,
        },
        tooltip: {
          pointFormat:
            "Důvěra společenskému systému: <b>{point.x:.2f}</b><br/>Informační gramotnost: <b>{point.y:.2f}</b><br/>",
        },
        data: [
          {
            x: -0.32,
            y: -0.66,
            color: "#e0e0e0",
            marker: { radius: 4, symbol: "square" },
          },
        ],
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
