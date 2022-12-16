import { action, computed, makeObservable, observable } from "mobx";
import TodoItem from "./todo-item";

import { ITodoItem } from './todo-item';

export class TodoList {
    @observable.shallow list: TodoItem[] = [];

    constructor(todos: ITodoItem[]) {
        makeObservable(this);   
        this.setTodos(todos)
    }

    @action
    setTodos = (todos: ITodoItem[]) => {
        const mobxTodos: TodoItem[] = todos.map((todo) => new TodoItem(todo))

        this.list = mobxTodos;
    }

    @action
    addTodo = (todo: ITodoItem) => {
        this.list.push(new TodoItem(todo));
    }

    @action
    removeTodo = (todo: ITodoItem) => {
        // this.list.splice(this.list.indexOf(todo), 1);
    };

    @computed
    get finishedTodos(): TodoItem[] {
        return this.list.filter(todo => todo.isDone);
    }

    @computed
    get openTodos(): TodoItem[] {
        return this.list.filter(todo => !todo.isDone);
    }
}
