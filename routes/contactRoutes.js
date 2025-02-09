import express from 'express';
import {
    getContact,
    getAllContacts,
    postContact,
    putContact,
    deleteContact,
} from '../controllers/contactController.js';

const router = express.Router();

router.route('/:id').get(getContact).put(putContact).delete(deleteContact);

router.route('/').get(getAllContacts).post(postContact);

export default router;
