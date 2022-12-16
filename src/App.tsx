import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import './Buttons.css';

import { isAuthorized } from './stores/login';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Logout } from './pages/Logout';

type ProtectedRouteProps = { children: React.ReactElement };

const ProtectedRoute = observer(({ children }: ProtectedRouteProps) => {

    return isAuthorized.get() ? children : <Navigate to="/login" />;
})

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
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                    path="/dashboard"
                />

                <Route
                    element={
                        <Logout />
                    }
                    path="/logout"
                />

                <Route path='*' element={<Navigate to="/login" replace={true} />} />
            </Routes>
        </div>
    );
}

export default App;
