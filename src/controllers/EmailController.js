import List from '../models/List.js';
import User from '../models/User.js';
import add from '../queues/emailQueue.js';

export async function sendEmail(req, res) {
    const { listId } = req.params;
    const { subject, body } = req.body;

    try {
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }

        const users = await User.find({ listId, unsubscribed: false });

        users.forEach(user => {
            let personalizedBody = body;
            Object.keys(user.properties).forEach(key => {
                const regex = new RegExp(`\\[${key}\\]`, 'g');
                personalizedBody = personalizedBody.replace(regex, user.properties[key]);
            });

            add({
                email: user.email,
                subject,
                body: personalizedBody,
            });
        });

        res.status(200).json({ message: 'Emails are being sent' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
