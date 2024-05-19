import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    listId: {
        type: Schema.Types.ObjectId,
        ref: 'List',
        required: true,
    },
    properties: {
        type: Map,
        of: String,
    },
    unsubscribed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

export default model('User', userSchema);
