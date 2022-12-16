import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginStore, User } from '../../stores/login';
import { observer } from 'mobx-react-lite';


export const Login = observer(() => {
    const navigate = useNavigate()

    useEffect(() => {
        console.log(loginStore.user)
    }, [loginStore.user])

    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const data = {
            login: formData.get('login') as string,
            password: formData.get('password') as string
        };



        fetch('http://localhost:3010/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then(((user: User) => {
                loginStore.user = user;
                navigate('/dashboard')
            }))
            .catch((err) => {
                console.log('err: ', err);
                alert('Неправильный логин или пароль!');
            })
    }, [navigate]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="login" required type="text" placeholder="Enter login" />
                <br />
                <input name="password" required type="password" placeholder="Enter password" />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
});