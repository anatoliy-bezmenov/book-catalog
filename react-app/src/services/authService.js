const TOKEN_KEY = '[token]';
const USER_KEY = '[user]';

export const setDataToStorage = (data) => {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data));
    return;
};

export const removeToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        return;
    }
};

export const getUser = () => {
    if (typeof window !== 'undefined') {
    return localStorage[USER_KEY];
    }
};

export const getToken = () => {
    if (typeof window !== 'undefined') {
    return localStorage[TOKEN_KEY];
    }
};