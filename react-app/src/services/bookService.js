import axios from 'axios';

const url = 'http://192.168.1.16:4000/books';

export const getBooks = async () => {
    const headerObject = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: null,
    };

    try {
        const response = await axios.get(url + '/', {headers: headerObject});
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch books: ${error.message}`);
    };
};

export const getBookByIdNoUser = async (id) => {
    const headerObject = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.get(url + `/${id}/details`, {headers: headerObject});
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch book details: ${error.message}`);
    };
};

export const getBookById = async (id, token) => {
    const headerObject = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
    };

    try {
        const response = await axios.get(url + `/${id}/details`, 
        { headers: headerObject });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch book details: ${error.message}`);
    };
};

export const deleteBookById = async (id, token) =>{
    const headerObject = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
    };

    try {
        const response = await axios.get(url + `/${id}/delete`, { headers: headerObject });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to delete book: ${error.message}`);
    };
};

export const createBook = async (bookData, token) => {
    const headerObject = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
    };
    
    try {
        const response = await axios.post(url + '/create', bookData,
        { headers: headerObject });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to create book: ${error.message}`);
    };
};

export const saveBookById = async (id, bookData, token) => {
    const headerObject = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
    };

    try {
        const response = await axios.post(url + `/${id}/update`, bookData,
        { headers: headerObject });
        return response.data
    } catch (error) {
        throw new Error(`Failed to save book: ${error.message}`);
    };
};

export const searchBook = async (name) => {
    const headerObject = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.get(url + `/books/search`, 
        { headers: headerObject, params: {q: name} } );
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch searched books: ${error.message}`);
    };
};