import { action, makeObservable, observable } from "mobx";

export interface ITodoItem {
    id: number;
    text: string;
    isDone: boolean;
}

export default class TodoItem {
    id = Date.now();

    @observable text: string = '';
    @observable isDone: boolean = false;

    constructor({ text, isDone, id }: ITodoItem) {
        makeObservable(this);
        this.id = id;
        this.text = text;
        this.isDone = isDone;
    }

    @action
    toggleIsDone = () => {
        this.isDone = !this.isDone
    }

    @action
    updateText = (text: string) => {
        this.text = text;
    }
}
