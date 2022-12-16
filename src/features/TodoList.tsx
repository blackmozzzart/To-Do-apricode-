import React, { useEffect } from 'react';
import { useStore } from "../helpers/use-store";
import { TodoItem } from "./TodoItem";
import { useObserver } from "mobx-react-lite";
import { ITodoItem } from '../stores/todo-item';
import { useSearchParams } from 'react-router-dom';

type FilterParams = 'all' | 'done' | 'undone';

const filterMap = {
    all: '',
    done: 'true',
    undone: 'false'
}

export const TodoList = () => {
    const todoList = useStore();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const filter = searchParams.get('filter') as FilterParams || 'all'
        const filterResult = filterMap[filter] && `isDone=${filterMap[filter]}`

        fetch(`http://localhost:3010/todos?${filterResult}`)
            .then(res => res.json())
            .then((data: ITodoItem[]) => {
                todoList.setTodos(data)
            })
    }, [searchParams])

    return useObserver(() => (
        <div className="todo-list">
            <div>
                <span>Filters:</span>
                <button onClick={() => setSearchParams({ filter: 'all' })}>All</button>
                <button onClick={() => setSearchParams({ filter: 'done' })}>Done</button>
                <button onClick={() => setSearchParams({ filter: 'undone' })}>Undone</button>
            </div>

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


