import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Contact from '../models/Contact.js';
import AppError from '../util/AppError.js';

//@desc Get all contacts
//@route GET /api/contacts
//@access public
export const getAllContacts = asyncHandler(async (req, res, next) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

//@desc Get a contact
//@route GET /api/contacts/:id
//@access public
export const getContact = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // Önce ID'nin geçerli olup olmadığını kontrol et
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError('Invalid contact ID format', 400));
    }

    const contact = await Contact.findById(id);
    if (!contact) {
        return next(new AppError('Contact is not found', 404));
    }
    res.status(200).json(contact);
});

//@desc Create new contact
//@route POST /api/contacts
//@access public
export const postContact = asyncHandler(async (req, res, next) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return next(
            new AppError('All request body fields are mandatory.', 400)
        );
    }

    // Contact.create() hem dokümanı oluşturur hem de veritabanına kaydeder
    const contact = await Contact.create({ name, email, phone });
    res.status(201).json(contact);
});

//@desc Update a contact
//@route PUT /api/contacts/:id
//@access public
export const putContact = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // Geçerli bir ID olup olmadığını kontrol et
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError('Invalid contact ID format', 400));
    }

    const contact = await Contact.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!contact) {
        return next(new AppError('Contact is not found.', 404));
    }

    res.status(200).json(contact);
});

//@desc Delete a contact
//@route DELETE /api/contacts/:id
//@access public
export const deleteContact = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // Önce ID'nin geçerli olup olmadığını kontrol et
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError('Invalid contact ID format', 400));
    }

    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
        return next(new AppError('Contact is not found.', 404));
    }

    res.status(200).json({ message: 'Contact deleted successfully!', contact });
});
