import { Resend } from "resend";

const inbox = "shaiksulduz238@gmail.com";

export default async function handler(request, response) {
    if (request.method !== "POST") {
        return response.status(405).json({ error: "Method not allowed" });
    }

    const { name, email, subject, message } = request.body || {};

    if (!name || !email || !message) {
        return response.status(400).json({ error: "Name, email, and message are required." });
    }

    if (!process.env.RESEND_API_KEY) {
        return response.status(500).json({ error: "Email service is not configured yet." });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const sender = process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

    try {
        const result = await resend.emails.send({
            from: sender,
            to: [inbox],
            replyTo: email,
            subject: subject || `Portfolio message from ${name}`,
            text: [
                `Name: ${name}`,
                `Email: ${email}`,
                "",
                message,
            ].join("\n"),
        });

        if (result.error) {
            return response.status(502).json({ error: "Resend could not deliver the message." });
        }

        return response.status(200).json({ ok: true });
    } catch (error) {
        console.error("Contact form email failed:", error);
        return response.status(500).json({ error: "Unable to send your message right now." });
    }
}