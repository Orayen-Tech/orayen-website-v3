
import { useState } from 'react'
import { contactEmail } from './config.js'
import { services } from './content.js'
import { supabase } from './supabaseClient.js'

const serviceOptions = [
  ...services.map(({ title }) => title),
  'Something else',
]

const countries = [
  'Australia',
  'Canada',
  'India',
  'Singapore',
  'Sri Lanka',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Other',
]

export default function Contact({ service, onSelectService }) {
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)

  async function submitBrief(event) {
    event.preventDefault()

    if (sending) return

    if (!supabase) {
      setStatus(`The contact form is unavailable right now. Please email ${contactEmail}.`)
      return
    }

    const form = event.currentTarget
    const data = new FormData(form)

    setSending(true)
    setStatus('Sending message...')

    try {
      const { error } = await supabase
        .from('orayen contact')
        .insert([{
          full_name: data.get('name'),
          email: data.get('email'),
          phone: data.get('phone'),
          country: data.get('country') || null,
          service_interested: data.get('service'),
          meeting: data.get('meeting'),
          message: data.get('message'),
        }])

      if (error) throw error

      setStatus('Message sent successfully!')
      form.reset()
      onSelectService('')

    } catch (error) {
      console.error('Supabase error:', error)
      setStatus('Failed to send message. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="wrap contact-grid">
        <div>
          <p className="eyebrow">Contact ORAYEN</p>
          <h2>Let’s build something for your business.</h2>
          <p className="body-copy">
            Share your project idea and tell us what you need help with.
          </p>

          <a
            className="contact-email"
            href={'mailto:' + contactEmail}
          >
            {contactEmail}
          </a>

          <a
            className="contact-whatsapp"
            href="https://wa.me/94703670956"
            aria-label="WhatsApp 0703670956"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2a9.8 9.8 0 0 0-8.4 14.8L2 22l5.4-1.4A10 10 0 1 0 12 2Zm0 17.9a8 8 0 0 1-4.1-1.1l-.3-.2-3.2.8.9-3.1-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.1 7.1 0 0 1-1.3-1.6c-.1-.2 0-.3.1-.4l.4-.4.2-.4v-.4c0-.1-.5-1.3-.7-1.8s-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3a2.5 2.5 0 0 0-.8 1.9 4.3 4.3 0 0 0 .9 2.3 9.8 9.8 0 0 0 3.8 3.4c.5.2.9.4 1.2.5.5.1.9.1 1.3.1.4-.1 1.4-.6 1.6-1.1s.2-1 .2-1.1-.2-.2-.4-.3Z" />
            </svg>
            <span>0703670956</span>
          </a>
        </div>

        <form
          className="contact-form"
          id="project-form"
          onSubmit={submitBrief}
        >
          <div className="form-row">
            <label>
              Full Name *
              <input
                name="name"
                autoComplete="name"
                placeholder="Your full name"
                required
                maxLength={100}
              />
            </label>

            <label>
              Email Address *
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@company.com"
                required
                maxLength={254}
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Phone / WhatsApp *
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+94 71 234 5678"
                required
                maxLength={30}
              />
            </label>

            <label>
              Country
              <select name="country" defaultValue="">
                <option value="">Select country</option>
                {countries.map((country) => (
                  <option key={country}>{country}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              Service Interested In *
              <select
                name="service"
                value={service}
                required
                onChange={(event) =>
                  onSelectService(event.target.value)
                }
              >
                <option value="">Choose a service</option>
                {serviceOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>

          <label>
            Preferred Meeting
            <select name="meeting" defaultValue="Online Meeting">
              <option>Online Meeting</option>
              <option>Phone Call</option>
              <option>WhatsApp Call</option>
              <option>In-person Meeting</option>
            </select>
          </label>

          <label>
            Project Details *
            <textarea
              name="message"
              placeholder="Tell us about your project"
              required
              rows={4}
              maxLength={3000}
            />
          </label>

          <label className="consent-label">
            <input
              name="consent"
              type="checkbox"
              required
            />
            <span>
              I agree that ORAYEN may use the details I provide
              to respond to my enquiry via email, phone or WhatsApp.
            </span>
          </label>

          <div className="flex flex-wrap gap-2">
            <button
              className="button button-blue"
              type="submit"
              disabled={sending}
            >
              {sending ? 'Sending...' : 'Send Message →'}
            </button>
          </div>

          <p className="form-status" role="status">
            {status}
          </p>
        </form>
      </div>
    </section>
  )
}
