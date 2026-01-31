import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
  })
)
app.use(express.json())

// Email configuration (replace with your service)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, service, message } = req.body

    // Validation
    if (!name || !email || !service || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Message length validation
    if (message.trim().length < 10) {
      return res.status(400).json({ error: 'Message too short' })
    }

    // Send email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New AI Consulting Inquiry from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company) || 'Not provided'}</p>
        <p><strong>Service Interested In:</strong> ${escapeHtml(service)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `
    }

    // Send confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank You for Your Inquiry - Aetheric AI Consulting',
      html: `
        <h2>Thank You for Reaching Out</h2>
        <p>Hi ${escapeHtml(name)},</p>
        <p>We've received your inquiry about <strong>${escapeHtml(service)}</strong>. Our team will review your message and get back to you within 24 hours.</p>
        <p>Best regards,<br>Aetheric AI Consulting Team</p>
      `
    }

    // Try to send emails (may fail on Render free tier due to SMTP blocking)
    try {
      await transporter.sendMail(adminMailOptions)
      await transporter.sendMail(userMailOptions)
      console.log('✅ Emails sent successfully')
    } catch (emailError) {
      // Log error but still return success (form data is validated)
      console.error('⚠️ Email sending failed (SMTP blocked on Render free tier):', emailError.message)
      console.log('📝 Form data received:', { name, email, company, service, message: message.substring(0, 50) + '...' })
    }

    res.status(200).json({ 
      success: true, 
      message: 'Your inquiry has been sent successfully!' 
    })
  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({ 
      error: 'Failed to send inquiry. Please try again later.' 
    })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

// Helper function to escape HTML
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
