import React, { useEffect, useState } from "react";
import { validator } from "../utils/validator";
import TextField from "../components/common/textField";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const RegisterForm = ({ show, onClose, register, setRegister }) => {
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setRegister((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Поле 'Name' обязательно для заполнения"
            }
        },
        surname: {
            isRequired: {
                message: "Поле 'Surname' обязательно для заполнения"
            }
        },

        patronymic: {
            isRequired: {
                message: "Поле 'Patronymic' обязательно для заполнения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [register]);
    const validate = () => {
        const errors = validator(register, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return "";
    };
    if (!show) {
        return null;
    }
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="bg-white rounded col-md-6 offset-md-3 shadow mt-5 p-4">
                        <form onSubmit={handleSubmit}>
                            <h3 className="mb-4 text-center ">Register</h3>
                            <TextField
                                label="NAME"
                                name="name"
                                value={register.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="SURNAME"
                                name="surname"
                                value={register.surname}
                                onChange={handleChange}
                                error={errors.surname}
                            />
                            <TextField
                                label="PATRONYMIC"
                                name="patronymic"
                                value={register.patronymic}
                                onChange={handleChange}
                                error={errors.patronymic}
                            />

                            <button
                                onClick={onClose}
                                className="btn btn-primary w-100 mx-auto"
                                type="submit"
                                disabled={!isValid}
                            >
                                START
                            </button>
                            <Link
                                to="/"
                                className="mt-3 btn btn-primary w-100 mx-auto"
                                type="submit"
                            >
                                EXIT
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
RegisterForm.propTypes = {
    register: PropTypes.object,
    setRegister: PropTypes.func,
    show: PropTypes.bool,
    onClose: PropTypes.func
};
export default RegisterForm;
