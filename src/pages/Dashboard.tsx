import React from 'react';
import { NavLink } from 'react-router-dom';

import { Footer } from '../features/footer/Footer';
import { TodoNew } from '../features/TodoNew';
import { TodoList } from "../features/TodoList";


export const Dashboard = () => {

    return (
        <div>
            <h1 className='title'>ToDo List:</h1>

            <TodoNew />

            <TodoList />

            <Footer />

            <NavLink to="/logout">
                <button>exit</button>
            </NavLink>
        </div>
    );
};
