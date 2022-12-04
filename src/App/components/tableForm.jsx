import React from "react";
import PropTypes from "prop-types";
import correctAnswer from "../correctAnswers.json";
import styles from "../styles/styles.module.scss";
import { Link } from "react-router-dom";

const TableForm = ({ showResult, data, onClose }) => {
    const Head = ["Номер вопроса", "Правильный ответ", "Ваш Ответ"];
    const correct = Object.keys(correctAnswer).map((item) => {
        return correctAnswer[item].correctAnswer.toString();
    });
    const numberQuestion = [1, 2, 3, 4, 5];
    const UserAnswer = Object.keys(data).map((item) => {
        return data[item].value;
    });
    if (!showResult) {
        return null;
    }
    return (
        <div className={styles.containerTable}>
            <div className="container mt-5 text-center">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow mt-5 p-4 p-3 mb-2 bg-white rounded">
                        <h2 className="mb-3">Ваш результат</h2>
                        <table className="table table-bordered  align-middle border-primary table table-dark table-hover text-center">
                            <thead>
                                <tr>
                                    {Head.map((item) => (
                                        <th
                                            className="table-info"
                                            key={item}
                                            scope="col"
                                        >
                                            {item}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {numberQuestion.map((item) => (
                                    <tr className="table-dark" key={item}>
                                        <th className="table-info" scope="row">
                                            {item}
                                        </th>
                                        <td className="table-success">
                                            {correct[item - 1]}
                                        </td>
                                        <td
                                            className={
                                                correct[item - 1] ===
                                                UserAnswer[item - 1]
                                                    ? "table-success"
                                                    : "table-danger"
                                            }
                                        >
                                            {UserAnswer[item - 1]}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Link
                            onClick={onClose}
                            className="border btn btn-primary mt-4 mb-5 w-50 mx-auto"
                            to="/"
                        >
                            EXIT
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
TableForm.propTypes = {
    showResult: PropTypes.bool,
    data: PropTypes.object,
    onClose: PropTypes.func
};
export default TableForm;
