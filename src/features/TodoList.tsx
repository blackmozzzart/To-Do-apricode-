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
    const currentFilter = searchParams.get('filter') as FilterParams || 'all';

    useEffect(() => {
        const filterResult = filterMap[currentFilter] && `?isDone=${filterMap[currentFilter]}`

        fetch(`http://localhost:3010/todos${filterResult}`)
            .then(res => res.json())
            .then((data: ITodoItem[]) => {
                todoList.setTodos(data)
            })
        // eslint-disable-next-line
    }, [currentFilter])

    return useObserver(() => (
        <div className="todo-list">
            <div className="paper">
                <span className="todo-title">Filters:</span>
                <div className="filters">
                    <button className={`filter-btn ${currentFilter === 'all' ? 'filter-btn_active' : ''}`} onClick={() => setSearchParams({ filter: 'all' })}>All</button>
                    <button className={`filter-btn ${currentFilter === 'done' ? 'filter-btn_active' : ''}`} onClick={() => setSearchParams({ filter: 'done' })}>Done</button>
                    <button className={`filter-btn ${currentFilter === 'undone' ? 'filter-btn_active' : ''}`} onClick={() => setSearchParams({ filter: 'undone' })}>Undone</button>
                </div>
            </div>

            <div className="paper">
                <span className='todo-title'>Open Todos</span>
                {todoList.openTodos.map(todo => <TodoItem key={`${todo.id}-${todo.text}`} todo={todo} />)}
            </div>
            <div className="paper paper_green">
                <span className='todo-title'>Finished Todos</span>
                {todoList.finishedTodos.map(todo => <TodoItem key={`${todo.id}-${todo.text}`} todo={todo} />)}
            </div>
        </div>
    ));
};


