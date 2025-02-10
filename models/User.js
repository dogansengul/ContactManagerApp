import mongoose from 'mongoose';
const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, 'Please add the user name.'],
        },
        email: {
            type: String,
            required: [true, 'Please add the user email.'],
            unique: [true, 'Email adress already taken'],
        },
        password: {
            type: String,
            required: [true, 'Please add the user password.'],
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
export default User;
