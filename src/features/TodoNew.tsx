import React, { useState } from 'react';
import { useStore } from "../helpers/use-store";
import { onEnterPress } from "../helpers/use-enter";
import Popup from 'reactjs-popup';

export const TodoNew = () => {
    const [newTodo, setTodo] = useState('');
    const todoList = useStore();

    const addTodo = () => {
        todoList.addTodo(newTodo);
        setTodo('');
    };

    return (
        <div className='container'>
            <Popup className='todo-popup' trigger={<button className='btn'><a href='#'>Add todo</a></button>} position='bottom center'>
                <div className="todo-new">
                    <input type="text" value={newTodo} onKeyDown={onEnterPress(addTodo)} onChange={(e) => setTodo(e.target.value)} />
                    <button className='button' onClick={addTodo}>Save</button>
                </div>
            </Popup>
        </div>
    )
};