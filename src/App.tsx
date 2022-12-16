import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import './Buttons.css';
import { Footer } from './features/footer/Footer';
import { Login } from './features/login/Login';
import { TodoList } from "./features/TodoList";
import { TodoNew } from "./features/TodoNew";
import { isAuthorized } from './stores/login';

// @ts-ignore
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    console.log('isAuthorized: ', isAuthorized)

    if (!isAuthorized) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

const App = () => {
    return (
        <div className="App">
            <Routes>

                <Route
                    element={<Login />}
                    path="/login"
                />

                <Route
                    element={
                        <PrivateRoute>
                            <h1 className='title'>ToDo List:</h1>
                            <TodoNew />
                            <TodoList />
                            <Footer />
                        </PrivateRoute>
                    }
                    path="/dashboard"
                />

                <Route path='*' element={<Navigate to="/login" replace={true} />} />
            </Routes>
        </div>
    );
}

export default App;
