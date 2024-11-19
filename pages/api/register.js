import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, jobTitle } = req.body;

        if (!name || !email || !jobTitle) {
            return res.status(400).json({ success: false, message: 'All fields except are required' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Registration Successful',
            html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <p>Dear ${name},</p>
          <p>Thank you for registering with <strong>Tech Jobs</strong>!</p>
       \n\nYour job form for the position of ${jobTitle} has been successfully submitted. Our team will review your professional information and get back to you shortly. 
          <p>Stay tuned for updates!</p>
          <p>Best regards,</p>
          <p><strong>The Tech Jobs Team</strong></p>
        </div>
      `,
        };

        try {
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ success: true, message: 'Registration successful and email sent!' });
        } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ success: false, message: 'Failed to send email' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
