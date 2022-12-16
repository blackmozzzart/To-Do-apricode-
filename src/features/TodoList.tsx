import React, { useEffect } from 'react';
import { useStore } from "../helpers/use-store";
import { TodoItem } from "./TodoItem";
import { useObserver } from "mobx-react-lite";

export const TodoList = () => {
    const todoList = useStore();

    useEffect(() => {
        fetch('http://localhost:3010/todos')
            .then(res => res.json())
            .then((data: string[]) => {
                data.forEach((item, index) => {
                    todoList.addTodo(item)
                })
            })
    }, [])

    return useObserver(() => (
        <div className="todo-list">
            <div className="open-todos">
                <span className='todo-title'>Open Todos</span>
                {todoList.openTodos.map(todo => <TodoItem key={`${todo.id}-${todo.text}`} todo={todo} />)}
                {/* Task left: {todoList.unfinishedTodoCount} */}
            </div>
            <div className="finished-todos">
                <span className='todo-title'>Finished Todos</span>
                {todoList.finishedTodos.map(todo => <TodoItem key={`${todo.id}-${todo.text}`} todo={todo} />)}
            </div>
        </div>
    ));
};


