//@desc Get all contacts
//@route GET /api/contacts

import AppError from '../util/AppError.js';

//@access public
export const getAllContacts = (req, res, next) => {
    res.status(200).json({ message: 'Get all contats' });
};

//@desc Get a contact
//@route GET /api/contacts/:id
//@access public
export const getContact = (req, res, next) => {
    res.status(200).json({ message: `Get contact for ${req.params.id}` });
};

//@desc Create new contact
//@route POST /api/contacts
//@access public
export const postContact = (req, res, next) => {
    console.log(req.body);
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        const error = new Error('All request body fields are mandatory.');
        const error2 = new AppError(
            'All request body fields are mandatory.',
            400
        );
        res.status(400);
        //next(error2);
        throw error;
    }
    res.status(200).json({ message: 'Create contact' });
};

//@desc Update a contact
//@route PUT /api/contacts/:id
//@access public
export const putContact = (req, res, next) => {
    res.status(200).json({ message: `Update contact for ${req.params.id}` });
};

//@desc Delete a contact
//@route DELETE /api/contacts/:id
//@access public
export const deleteContact = (req, res, next) => {
    res.status(200).json({ message: `Delete contact for ${req.params.id}` });
};
