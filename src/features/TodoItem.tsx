import React, { useState } from 'react';
import { BiRectangle, BiCheckSquare, BiEdit, BiTrash } from 'react-icons/bi';

import TodoItemClass from "../stores/todo-item";
import { useStore } from "../helpers/use-store";
import { onEnterPress } from "../helpers/use-enter";

interface Props {
    todo: TodoItemClass;
}

export const TodoItem = ({ todo }: Props) => {
    const todoList = useStore();
    const [newText, setText] = useState(todo.text);
    const [isEditing, setEdit] = useState(false);

    const saveText = () => {
        fetch(`http://localhost:3010/todos/${todo.id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: newText
            }),
            method: "PATCH",
        })
            .then(res => res.json())
            .then(() => {
                todo.updateText(newText);
            })
            .catch(() => alert('Не удалось изменить статус задачи. Попробуйте позже!'))
            .finally(() => {
                setEdit(false);
                setText('');
            })
    };

    const handleStatusChange = () => {
        fetch(`http://localhost:3010/todos/${todo.id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isDone: !todo.isDone
            }),
            method: "PATCH",
        })
            .then(res => res.json())
            .then(() => {
                todo.toggleIsDone();
            })
            .catch(() => alert('Не удалось изменить статус задачи. Попробуйте позже!'))
    }

    const handleDelete = () => {
        fetch(`http://localhost:3010/todos/${todo.id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(() => {
                todoList.removeTodo(todo.id)
            })
            .catch(() => alert('Не удалось удалить задачу. Попробуйте позже!'))
    }

    return (
        <div className="todo-item">
            {
                isEditing ?
                    <>
                        <input autoFocus type="text" value={newText} onKeyDown={onEnterPress(saveText)} onChange={(e) => setText(e.target.value)} />
                        <button onClick={saveText}>save</button>
                    </>
                    :
                    <>
                        <span>{todo.text}</span>
                        <div className="actions">
                            <label>
                                {todo.isDone ? <BiCheckSquare size={21} /> : <BiRectangle size={21} />}
                                <input onChange={handleStatusChange} style={{ display: 'none' }} type='checkbox' defaultChecked={todo.isDone} />
                            </label>
                            <label onClick={() => setEdit(true)}><BiEdit size={21} /></label>
                            <label onClick={handleDelete}><BiTrash size={21} /></label>
                        </div>
                    </>
            }
        </div>
    )
};
