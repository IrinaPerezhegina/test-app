import React from "react";
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import QuestionListPage from "./Pages/QuestionsListPage";
import StartPage from "./Pages/StartPage";
import ResultPage from "./Pages/ResultPage";
import { ToastContainer } from "react-toastify";
import UserProvider from "./hooks/useUsers";

function App() {
    return (
        <>
            <UserProvider>
                <Router>
                    <Switch>
                        <Route path="/result">
                            <ResultPage />
                        </Route>
                        <Route path="/test">
                            <QuestionListPage />
                        </Route>
                        <Route path="/" exact>
                            <StartPage />
                        </Route>
                        <Redirect to="/" />
                    </Switch>
                </Router>
            </UserProvider>
            <ToastContainer />
        </>
    );
}
export default App;
