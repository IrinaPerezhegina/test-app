import React from "react";
import { useUsers } from "../hooks/useUsers";
import { Spinner } from "react-bootstrap";
import correctAnswer from "../correctAnswers.json";
import styles from "../styles/styles.module.scss";
import BarChart from "../components/Bar";
import TableResult from "../components/tablResult";
import { Link } from "react-router-dom";

const ResultPage = () => {
    const { isLoading, users } = useUsers();

    const correct = Object.keys(correctAnswer).map((item) => {
        return correctAnswer[item].correctAnswer.toString();
    });
    const currectAnswersUsers = [0, 0, 0, 0, 0];
    const numberQuestion = [1, 2, 3, 4, 5];
    const dataAnswers = users.map((item) => {
        return item.answers;
    });
    dataAnswers.map((item) =>
        item.map((it, i) => {
            if (it.value === correct[i]) {
                currectAnswersUsers[i] += 1;
            }
            return "";
        })
    );

    if (isLoading) {
        return (
            <div className={styles.containerText}>
                <div className={styles.containerSpinner}>
                    <Spinner />
                </div>
            </div>
        );
    }
    return (
        <>
            {users.length > 0 ? (
                <div className="container text-center shadow  p-3 mb-2 bg-white rounded">
                    <div className={styles.mainTable}>
                        <h2 className="mb-3">
                            Количество тестируемыx: {users.length}
                        </h2>
                        <TableResult
                            length={users.length}
                            currectAnswersUsers={currectAnswersUsers}
                            numberQuestion={numberQuestion}
                        />
                        <h2>Результирующая таблица по всем ответам</h2>
                        <BarChart
                            currectAnswersUsers={currectAnswersUsers}
                            y={users.length}
                        />
                    </div>
                    <div className={styles.resultBtn}>
                        <Link
                            className="border btn btn-primary mb-5 w-50 mx-auto"
                            to="/test"
                        >
                            TEST
                        </Link>

                        <Link
                            className="border btn btn-primary mb-5 w-50 mx-auto"
                            to="/"
                        >
                            EXIT
                        </Link>
                    </div>
                </div>
            ) : (
                <div className={styles.containerText}>
                    <h1>Нету данных</h1>
                </div>
            )}
        </>
    );
};

export default ResultPage;
