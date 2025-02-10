import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Contact from '../models/Contact.js';
import AppError from '../util/AppError.js';

//@desc Get all contacts
//@route GET /api/contacts
//@access private
export const getAllContacts = asyncHandler(async (req, res, next) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});

//@desc Get a contact
//@route GET /api/contacts/:id
//@access private
export const getContact = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // Önce ID'nin geçerli olup olmadığını kontrol et
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError('Invalid contact ID format', 400);
    }

    const contact = await Contact.findById(id);
    if (!contact) {
        throw new AppError('Contact is not found', 404);
    }
    res.status(200).json(contact);
});

//@desc Create new contact
//@route POST /api/contacts
//@access private
export const postContact = asyncHandler(async (req, res, next) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        throw new AppError('All request body fields are mandatory.', 400);
    }

    // Contact.create() hem dokümanı oluşturur hem de veritabanına kaydeder
    const contact = await Contact.create({
        user_id: req.user.id,
        name,
        email,
        phone,
    });
    res.status(201).json(contact);
});

//@desc Update a contact
//@route PUT /api/contacts/:id
//@access private
export const putContact = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // Geçerli bir ID olup olmadığını kontrol et
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError('Invalid contact ID format', 400);
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        throw new AppError('Contact is not found.', 404);
    }

    if (contact.user_id.toString() !== req.user.id) {
        throw new AppError(
            "User don't have permission to update other users contacts.",
            403
        );
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        id,
        {
            user_id: req.user.id,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json(updatedContact);
});

//@desc Delete a contact
//@route DELETE /api/contacts/:id
//@access private
export const deleteContact = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // Önce ID'nin geçerli olup olmadığını kontrol et
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError('Invalid contact ID format', 400);
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        throw new AppError('Contact is not found.', 404);
    }

    if (contact.user_id.toString() !== req.user.id) {
        throw new AppError(
            "User don't have permission to update other users contacts.",
            403
        );
    }
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
        throw new AppError(
            "User don't have permission to delete other users contacts.",
            404
        );
    }

    res.status(200).json({
        message: 'Contact deleted successfully!',
        deletedContact,
    });
});
