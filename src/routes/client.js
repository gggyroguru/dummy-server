import express from "express";
import {
    existsByEmail,
    existsById,
    existsByUniquename, getAll,
    getByUniquename,
    remove, removeAll,
    save,
    update
} from "../queries/client.js";
import randomize from "../utils/randomize.js";


const router = express.Router();

const unique = () => {
    let unique = '';
    while (true) {
        const random = randomize();
        if (!existsById(random)) {
            unique = random;
            break;
        }
    }
    return unique;
}

router.post('/create', (request, response) => {
    const {uniquename, email, password} = request.body;

    if (!uniquename || !email || !password) {
        return response.status(400).json({status: 400, message: 'all fields are required'});
    }
    if (existsByUniquename(uniquename)) {
        return response.status(400).json({status: 400, message: 'uniquename already exists'});
    }
    if (existsByEmail(email)) {
        return response.status(400).json({status: 400, message: 'email already exists'});
    }

    const newClient = {
        id: unique(),
        uniquename,
        email,
        password
    }

    save(newClient);

    return response.status(201).json({status: 201, message: 'client create successfully'});
});

router.get('/get/:uniquename', (request, response) => {

    const {uniquename} = request.params;

    if (!existsByUniquename(uniquename)) {
        return response.status(404).json({status: 404, message: 'client not exists'});
    }

    const getClient = getByUniquename(uniquename)

    return response.status(200).json({status: 200, data: getClient});
});

router.put('/update/:id', (request, response) => {

    const {id} = request.params;

    const {uniquename, email, password} = request.body;

    if (!existsById(id)) {
        return response.status(404).json({status: 404, message: 'client not exists'});
    }

    if (!uniquename || !email || !password) {
        return response.status(400).json({status: 400, message: 'all fields are required'});
    }
    if (existsByUniquename(uniquename)) {
        return response.status(400).json({status: 400, message: 'uniquename already exists'});
    }
    if (existsByEmail(email)) {
        return response.status(400).json({status: 400, message: 'email already exists'});
    }

    update(id, request.body);

    return response.status(202).json({status: 202, message: 'client update successfully'});
})

router.delete('/remove/:id', (request, response) => {

    const {id} = request.params;

    if (!existsById(id)) {
        return response.status(404).json({status: 404, message: 'client not exists'});
    }

    remove(id);

    return response.status(202).json({status: 202, message: 'client remove successfully'});
})

router.get('/getAll', (request, response) => {
    if (getAll().length === 0) {
        return response.status(404).json({status: 404, message: 'client not exists'});
    }
    return response.status(200).json({status: 200, data: getAll()});
})

router.delete('/removeAll', (request, response) => {

    removeAll()
    return response.status(202).json({status: 202, message: 'client delete successfully'});
})

export default router;