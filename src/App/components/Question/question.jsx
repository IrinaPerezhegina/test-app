import React from "react";
import styles from "../../styles/styles.module.scss";
import PropTypes from "prop-types";

const Question = ({ question }) => {
    return (
        <div className={styles.testWtapper}>
            {question.map((qual) => (
                <div key={Date.now()}>
                    <h2 className={styles.title}>{qual.question}</h2>
                </div>
            ))}
        </div>
    );
};
Question.propTypes = {
    question: PropTypes.array
};
export default Question;
