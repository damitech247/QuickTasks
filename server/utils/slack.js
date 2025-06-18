const axios = require('axios');

exports.sendSlackMessage = async (text) => {
    // const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!webhookUrl) return;

    try {
        await axios.post(webhookUrl, {
            text: `📌 ${text}`,
        });
    } catch (err) {
        console.error("Slack notification failed:", err.message);
    }
};
