import { observable, computed, reaction } from "mobx";

export type User = {
    id: number | null;
    login: string | null;
    password: string | null;
}

const SESSION_STORAGE_USER_KEY = 'user';

const {
    id = null,
    login = null,
    password = null
}: User = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_USER_KEY) || '{}');

export const loginStore = observable<{
    user: User
}>({
    user: {
        id,
        login,
        password,
    }
});

reaction(
    () => loginStore.user,
    user => {
        sessionStorage.setItem(SESSION_STORAGE_USER_KEY, JSON.stringify(user));
    }
);

export const isAuthorized = computed(() => {
    const { login, password, id } = loginStore.user;

    return Boolean(login && password && id);
})
