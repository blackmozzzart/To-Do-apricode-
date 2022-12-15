import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StoreProvider } from "./helpers/store-provider";
import { TodoList } from "./stores/todo-list";
import { BrowserRouter } from 'react-router-dom';

const todoList = new TodoList([
    'Страница авторизации (постзапрос логин/пароль)',
    'Фильтр "все, выполненные, невыполненные" (гет запрос с query-параметрами all, done, undone)',
    'Попап для добавления туду в тудулист (постзапрос)',
    'Пометить выполненным, невыполненным, удаление (первые два - гет запрос. третий - пост)',
    'Стилизация, плюс адаптив',
    'Изучить MobX',
    'Посмотреть Роковой патруль :)'
]);

//@ts-ignore - for debugging
window.todoList = todoList

ReactDOM.render(
    <StoreProvider value={todoList}>
        <BrowserRouter>
            <div className='a'>
                <App />
            </div>
        </BrowserRouter>
    </StoreProvider>
    , document.getElementById('root'));