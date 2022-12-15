import { observable, computed } from "mobx";

export type User = {
    id: number | null;
    login: string | null;
    password: string | null;
}

export const loginStore = observable<{
    user: User
}>({
    user: {
        id: null,
        login: null,
        password: null,
    }
});

export const isAuthorized = computed(() => {
    const { login, password, id } = loginStore.user;

    return Boolean(login && password && id);
})