import client from '../models/client.js';

const save = (data) => {
    client.push(data)
}

const existsById = (id) => {
    return client.filter(client => client.id === id).length === 1;
}

const existsByUniquename = (uniquename) => {
    return client.filter(client => client.uniquename === uniquename).length === 1;
}

const existsByEmail = (email) => {
    return client.filter(client => client.email === email).length === 1;
}

const getById = (id) => {
    return client.filter(client => client.id === id)[0];
}

const getByUniquename = (uniquename) => {
    return client.filter(client => client.uniquename === uniquename)[0];
}

const getByEmail = (email) => {
    return client.filter(client => client.email === email)[0];
}

const update = (id, getClient) => {

    const {uniquename, email, password} = getClient;

    const updateClient = client.map(client => {
        if (client.id === id) {
            return {
                id,
                uniquename,
                email,
                password
            }
        }
        return client;
    });

    client.splice(0, client.length, ...updateClient);
}

const remove = (id) => {

    const updateClient = client.filter(client => client.id !== id);
    client.splice(0, client.length, ...updateClient);
}

const getAll = () => {
    return client;
}

const removeAll = () => {
    client.splice(0, client.length);
}

export {save, existsById, existsByUniquename, existsByEmail, getById, getByUniquename, getByEmail, update, remove, getAll, removeAll}