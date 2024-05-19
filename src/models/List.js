import { Schema, model } from 'mongoose';

const customPropertySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    fallback: {
        type: String,
        required: true,
    },
});

const listSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    customProperties: [customPropertySchema],
}, {
    timestamps: true,
});

export default model('List', listSchema);
