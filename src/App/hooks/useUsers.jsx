import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import userService from "../service/user.service";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import styles from "../styles/styles.module.scss";

const UserContext = React.createContext();

export const useUsers = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        getUsers();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    async function getUsers() {
        try {
            const content = await userService.get();

            setUsers(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.message;
        setError(message);
    }
    return (
        <UserContext.Provider value={{ users }}>
            {!isLoading ? (
                children
            ) : (
                <div className={styles.containerText}>
                    <div className={styles.containerSpinner}>
                        <Spinner />
                    </div>
                </div>
            )}
        </UserContext.Provider>
    );
};
UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default UserProvider;
