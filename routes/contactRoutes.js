import express from 'express';
import {
    getContact,
    getAllContacts,
    postContact,
    putContact,
    deleteContact,
} from '../controllers/contactController.js';

const router = express.Router();

router.route('/').get(getAllContacts).post(postContact);

router.route('/:id').get(getContact).put(putContact).delete(deleteContact);

export default router;
