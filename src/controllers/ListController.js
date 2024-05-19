import List from '../models/List.js';

export async function createList(req, res) {
    const { title, customProperties } = req.body;

    try {
        const newList = new List({ title, customProperties });
        await newList.save();
        res.status(201).json(newList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
