import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StoreProvider } from "./helpers/store-provider";
import { TodoList } from "./stores/todo-list";
import { BrowserRouter } from 'react-router-dom';

const todoList = new TodoList([]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StoreProvider value={todoList}>
        <BrowserRouter>
            <div className='a'>
                <App />
            </div>
        </BrowserRouter>
    </StoreProvider>
)