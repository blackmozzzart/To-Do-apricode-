import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginStore } from '../stores/login';

export const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        loginStore.user = {
            id: null,
            login: null,
            password: null,
        };
        navigate('/login', {replace: true});
    }, [navigate])

    return null
};
