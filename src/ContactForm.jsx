import { useState } from 'react'
import './ContactForm.css'

export default function ContactForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'AI Consulting',
    message: '',
    honeypot: ''
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', or null

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field on change
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Honeypot check (spam prevention)
    if (formData.honeypot) {
      setSubmitStatus('success')
      setTimeout(() => {
        onClose()
      }, 1500)
      return
    }

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    setSubmitStatus(null)

    try {
      // POST to backend endpoint
      const apiUrl = import.meta.env.VITE_API_URL || 'https://matrix-6.onrender.com'
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          service: formData.service,
          message: formData.message.trim()
        })
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      const data = await response.json()
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        company: '',
        service: 'AI Consulting',
        message: '',
        honeypot: ''
      })
      setErrors({})

      // Close modal after success message
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      setIsLoading(false)
    }
  }

  return (
    <div className="contact-form-wrapper">
      <div className="contact-form-modal" onClick={(e) => e.stopPropagation()}>
        <button className="form-close-btn" onClick={onClose}>✕</button>

        <div className="form-header">
          <h2>Get in Touch</h2>
          <p>Let's discuss how AI can transform your business</p>
        </div>

        {submitStatus === 'success' ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Thank You!</h3>
            <p>Your inquiry has been received. We'll get back to you within 24 hours.</p>
          </div>
        ) : submitStatus === 'error' ? (
          <div className="error-banner">
            <p>Something went wrong. Please try again or contact us directly.</p>
            <button className="retry-btn" onClick={() => setSubmitStatus(null)}>
              Try Again
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className={errors.name ? 'input-error' : ''}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="company">Company Name</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company (optional)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="service">Service Interested In *</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
              >
                <option value="AI Consulting">AI Consulting</option>
                <option value="Automation">Automation</option>
                <option value="Analytics">Analytics</option>
                <option value="Chatbots">Chatbots</option>
                <option value="Predictive Models">Predictive Models</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your AI needs..."
                rows="5"
                className={errors.message ? 'input-error' : ''}
              />
              {errors.message && <span className="error-text">{errors.message}</span>}
            </div>

            {/* Honeypot field (hidden from users) */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              style={{ display: 'none' }}
              tabIndex="-1"
              autoComplete="off"
            />

            <button
              type="submit"
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner" />
                  Sending...
                </>
              ) : (
                'Send Inquiry'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
