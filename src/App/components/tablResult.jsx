import React from "react";
import PropTypes from "prop-types";

const TableResult = ({ numberQuestion, currectAnswersUsers, length }) => {
    const HeadTable = ["Номер вопроса", "Правильно", "Неправильно"];

    return (
        <table className="mb-5 align-middle text-center table-bordered border-primary table table-dark table-hover">
            <thead>
                <tr>
                    {HeadTable.map((item) => (
                        <th className="table-info" key={item} scope="col">
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
                            {currectAnswersUsers[item - 1]}
                        </td>
                        <td className={"table-danger"}>
                            {length - currectAnswersUsers[item - 1]}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
TableResult.propTypes = {
    numberQuestion: PropTypes.array,
    currectAnswersUsers: PropTypes.array,
    length: PropTypes.number
};
export default TableResult;
