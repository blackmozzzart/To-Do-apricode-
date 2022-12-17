import React, { useState } from 'react';
import { useStore } from "../helpers/use-store";
import { onEnterPress } from "../helpers/use-enter";
import Popup from 'reactjs-popup';

import { ITodoItem } from '../stores/todo-item'

export const TodoNew = () => {
    const [newTodo, setTodo] = useState('');
    const todoList = useStore();

    const addTodo = () => {
        fetch("http://localhost:3010/todos", {
            "headers": {
                'Content-Type': 'application/json'
            },
            "body": JSON.stringify({
                id: Date.now(),
                text: newTodo,
                isDone: false
            }),
            "method": "POST",
        })
            .then(res => res.json())
            .then((todo: ITodoItem) => {
                todoList.addTodo(todo);
            })
            .catch((err => alert("Не удалоось сохранить!")));
        setTodo('');
    };

    
    return (
        // eslint-disable-next-line
        <Popup className='todo-popup' trigger={<div className='btn-wrapper'><button className='btn'><a href='#'>Add todo</a></button></div>} position='bottom center'>
            <div className="todo-new">
                <input type="text" value={newTodo} onKeyDown={onEnterPress(addTodo)} onChange={(e) => setTodo(e.target.value)} />
                <button className='button' onClick={addTodo}>Save</button>
            </div>
        </Popup>
    )
};