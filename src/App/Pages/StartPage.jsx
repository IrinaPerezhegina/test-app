import React from "react";
import styles from "../styles/styles.module.scss";
import { Link } from "react-router-dom";

const StartPage = () => {
    return (
        <div className="container-sm text-center mt-1">
            <div className="row align-items-center mt-1">
                <div className="col mt-5">
                    <div className={styles.card}>
                        <h2 className={styles.title}>Тестовое задание</h2>
                        <div className={styles.startBtn}>
                            <Link
                                className="border btn btn-primary mb-5 w-50 mx-auto"
                                to="/test"
                            >
                                Начать текстирование
                            </Link>

                            <Link
                                role="button"
                                className="border btn btn-primary mb-5 w-50 mx-auto"
                                to="/result"
                            >
                                Результаты тестирований
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
StartPage.propTypes = {};
export default StartPage;
