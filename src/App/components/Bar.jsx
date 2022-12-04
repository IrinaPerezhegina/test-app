import React from "react";
import { Bar } from "react-chartjs-2";

import {
    Filler,
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import PropTypes from "prop-types";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const BarChart = ({ currectAnswersUsers, y }) => {
    const wrongAnswersUsers = currectAnswersUsers.map(
        (item, i) => y - currectAnswersUsers[i]
    );

    const barChartData = {
        labels: ["1 Вопрос", "2 Вопрос", "3 Вопрос", "4 Вопрос", "5 Вопрос"],
        datasets: [
            {
                data: currectAnswersUsers,
                label: "Right Answer",
                borderColor: "#3333ff",
                backgroundColor: "rgba(32, 145, 43, 0.8)",
                fill: true
            },
            {
                data: wrongAnswersUsers,
                label: "Wrong Answer",
                borderColor: "#ff3333",
                backgroundColor: "rgba(255, 0, 0, 0.5)",
                fill: true
            }
        ]
    };

    const barChart = (
        <Bar
            type="bar"
            width={200}
            height={50}
            options={{
                title: {
                    display: true,
                    text: "Результаты тестирования всех пользователей",
                    fontSize: 15
                },
                legend: {
                    display: true,
                    position: "top"
                },
                scales: {
                    y: {
                        suggestedMin: 0,
                        suggestedMax: y
                    }
                }
            }}
            data={barChartData}
        />
    );
    return barChart;
};
BarChart.propTypes = {
    currectAnswersUsers: PropTypes.array,
    wrongAnswersUsers: PropTypes.array,
    y: PropTypes.number
};

export default BarChart;
