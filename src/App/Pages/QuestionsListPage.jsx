import React, { useState } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "../components/pagination";
import Question from "../components/Question/question";
import correntAnswers from "../correctAnswers.json";
import RadioField from "../components/radioField";
import RegisterForm from "../components/RegisterForm";
import TableForm from "../components/tableForm";
import useMockData from "../utils/mockData";

const QuestionListPage = () => {
    const [register, setRegister] = useState({
        name: "",
        surname: "",
        patronymic: ""
    });
    const [data, setData] = useState({
        1: { name: "1", value: "" },
        2: { name: "2", value: "" },
        3: { name: "3", value: "" },
        4: { name: "4", value: "" },
        5: { name: "5", value: "" }
    });
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 1;
    const [show, setShow] = useState(true);
    const [showResult, setShowResult] = useState(false);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const { initialize } = useMockData();
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: {
                name: target.name,
                value: target.value
            }
        }));
    };

    const IdData = register.name + register.surname + register.patronymic;
    const correctData = Object.keys(data).map((item) => data[item]);

    function isValue(data) {
        return Object.keys(data).every((item) => data[item].value !== "");
    }
    const PostData = {
        id: IdData,
        answers: {
            ...correctData
        }
    };

    const post = (PostData) => {
        initialize(PostData);
        setShowResult(true);
    };

    const questionCrop = paginate(correntAnswers, currentPage, pageSize);

    function getQuestion(data) {
        const Result = [];
        Object.keys(data).map((item) => {
            if (data[item].value === "") {
                Result.push(item);
            }
            return Result;
        });
        return Result;
    }
    const isOpen = Object.keys(data).every((item) => data[item].value !== "");

    return (
        <>
            {show ? (
                <RegisterForm
                    register={register}
                    setRegister={setRegister}
                    onClose={() => setShow(false)}
                    show={show}
                />
            ) : (
                <>
                    {" "}
                    <TableForm
                        data={data}
                        showResult={showResult}
                        onClose={() => setShow(false)}
                    />
                    <div className="container-sm text-center mt-5">
                        <div className="row align-items-center mt-5">
                            <div className="col mt-5">
                                <Question question={questionCrop} />
                                <RadioField
                                    options={questionCrop[0].answer}
                                    value={data[currentPage].value}
                                    name={data[currentPage].name}
                                    onChange={handleChange}
                                    label={questionCrop.question}
                                />

                                <button
                                    className="border btn btn-primary mb-5 w-50 mx-auto "
                                    onClick={() =>
                                        handlePageChange(currentPage - 1)
                                    }
                                    type="submit"
                                    disabled={currentPage === 1}
                                >
                                    BACK
                                </button>
                                <button
                                    className="border btn btn-primary mb-5 w-50 mx-auto"
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                    type="submit"
                                    disabled={currentPage === 5}
                                >
                                    NEXT
                                </button>
                                {currentPage === 5 &&
                                    data[5].value !== "" &&
                                    !isOpen && (
                                        <div className="text-danger p-3">
                                            Для того,чтобы узнать результат
                                            тестирования, необходимо ответить на
                                            все вопросы! Вам необходимо дать
                                            ответ на{" "}
                                            {getQuestion(data).length > 1
                                                ? "следующие вопросы"
                                                : "следующий вопрос"}{" "}
                                            :
                                            {getQuestion(data).map((item) => (
                                                <span key={item}>
                                                    {" "}
                                                    {item}
                                                    {", "}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                {isValue(data) && (
                                    <button
                                        onClick={() => post(PostData)}
                                        className=" mt-1 mb-3 border btn btn-primary w-50 mx-auto"
                                        type="submit"
                                    >
                                        FINISH
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col mt-5 me-1">
                                <Pagination
                                    itemsCount={correntAnswers.length}
                                    pageSize={pageSize}
                                    currentPage={currentPage}
                                    data={data}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default QuestionListPage;
