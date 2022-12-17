import React from 'react';
import { NavLink } from 'react-router-dom';

import { Footer } from '../features/footer/Footer';
import { TodoNew } from '../features/TodoNew';
import { TodoList } from "../features/TodoList";


export const Dashboard = () => {

    return (
        <div className="container">
            <h1 className='title'>ToDo List:</h1>
            <TodoNew />

            <TodoList />

            <div className='btn-wrapper'>
                <div className="btn">
                    <NavLink to="/logout">
                        <span>Log Out</span>
                    </NavLink>
                </div>
            </div>

            <Footer />
        </div>
    );
};
