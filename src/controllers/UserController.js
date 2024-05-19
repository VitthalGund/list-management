import csv from 'csv-parser';
import { createReadStream, unlinkSync } from 'fs';
import path from 'path';
import List from '../models/List.js';
import User from '../models/User.js';

export async function uploadUsers(req, res) {
    const { listId } = req.params;
    const filePath = req.file.path;

    try {
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }

        const results = [];
        const errors = [];
        const existingUsers = await User.find({ listId }).select('email');
        const existingEmails = new Set(existingUsers.map(user => user.email));

        createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
                const { name, email, ...customProps } = data;

                if (!name || !email) {
                    errors.push({ ...data, error: 'Name and email are required' });
                    return;
                }

                if (existingEmails.has(email)) {
                    errors.push({ ...data, error: 'Duplicate email' });
                    return;
                }

                const userProps = {};
                for (const prop of list.customProperties) {
                    userProps[prop.title] = customProps[prop.title] || prop.fallback;
                }

                results.push({
                    name,
                    email,
                    listId,
                    properties: userProps,
                });

                existingEmails.add(email);
            })
            .on('end', async () => {
                try {
                    await User.insertMany(results);
                    unlinkSync(filePath); // Clean up the uploaded CSV file

                    res.status(200).json({
                        success: results.length,
                        errors: errors.length,
                        total: await User.countDocuments({ listId }),
                        errorDetails: errors,
                    });
                } catch (err) {
                    res.status(500).json({ error: err.message });
                }
            });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function unsubscribeUser(req, res) {
    const { userId } = req.params;

    try {
        const user = await findByIdAndUpdate(userId, { unsubscribed: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User unsubscribed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
