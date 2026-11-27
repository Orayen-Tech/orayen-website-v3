import { useState } from 'react'
import { contactEmail } from './config.js'
import { services } from './content.js'

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

  function submitBrief(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const brief = [
      'ORAYEN project enquiry',
      '',
      'Full name: ' + data.get('name'),
      'Email address: ' + data.get('email'),
      'Phone / WhatsApp: ' + data.get('phone'),
      'Country: ' + (data.get('country') || 'Not specified'),
      'Service interested in: ' + data.get('service'),
      'Preferred meeting: ' + data.get('meeting'),
      '',
      'Project details',
      data.get('message'),
      '',
      'Consent: I agree that ORAYEN may use the details I provide to respond to my enquiry via email, phone or WhatsApp.',
    ].join('\r\n')

    if (event.nativeEvent.submitter?.value !== 'download') {
      const subject = encodeURIComponent('ORAYEN project enquiry — ' + data.get('service'))
      window.location.href = 'mailto:' + contactEmail + '?subject=' + subject + '&body=' + encodeURIComponent(brief)
      setStatus('If your email app opens, review the draft and send it there.')
      return
    }

    const url = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'orayen-project-brief.txt'
    document.body.append(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    setStatus('Your project brief is ready in your browser’s downloads.')
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="wrap contact-grid">
        <div>
          <p className="eyebrow">Contact ORAYEN</p>
          <h2>Let’s build something for your business.</h2>
          <p className="body-copy">Share your project idea and tell us what you need help with.</p>
          <a className="contact-email" href={'mailto:' + contactEmail}>{contactEmail}</a>
          <a className="contact-whatsapp" href="https://wa.me/94703670956" aria-label="WhatsApp 0703670956">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2a9.8 9.8 0 0 0-8.4 14.8L2 22l5.4-1.4A10 10 0 1 0 12 2Zm0 17.9a8 8 0 0 1-4.1-1.1l-.3-.2-3.2.8.9-3.1-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.1 7.1 0 0 1-1.3-1.6c-.1-.2 0-.3.1-.4l.4-.4.2-.4v-.4c0-.1-.5-1.3-.7-1.8s-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3a2.5 2.5 0 0 0-.8 1.9 4.3 4.3 0 0 0 .9 2.3 9.8 9.8 0 0 0 3.8 3.4c.5.2.9.4 1.2.5.5.1.9.1 1.3.1.4-.1 1.4-.6 1.6-1.1s.2-1 .2-1.1-.2-.2-.4-.3Z" />
            </svg>
            <span>0703670956</span>
          </a>
        </div>
        <form className="contact-form" id="project-form" onSubmit={submitBrief}>
          <div className="form-row">
            <label>Full Name *<input name="name" autoComplete="name" placeholder="Your full name" required maxLength={100} /></label>
            <label>Email Address *<input name="email" type="email" autoComplete="email" placeholder="name@company.com" required maxLength={254} /></label>
          </div>
          <div className="form-row">
            <label>Phone / WhatsApp *<input name="phone" type="tel" autoComplete="tel" placeholder="+94 71 234 5678" required maxLength={30} /></label>
            <label>
              Country
              <select name="country" defaultValue="">
                <option value="">Select country</option>
                {countries.map((country) => <option key={country}>{country}</option>)}
              </select>
            </label>
          </div>
          <div className="form-row">
            <label>
              Service Interested In *
              <select name="service" value={service} required onChange={(event) => onSelectService(event.target.value)}>
                <option value="">Choose a service</option>
                {serviceOptions.map((option) => <option key={option}>{option}</option>)}
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
            <textarea name="message" placeholder="Tell us about your project" required rows={4} maxLength={3000} />
          </label>
          <label className="consent-label">
            <input name="consent" type="checkbox" required />
            <span>I agree that ORAYEN may use the details I provide to respond to my enquiry via email, phone or WhatsApp.</span>
          </label>
          <div className="flex flex-wrap gap-2">
            <button className="button button-blue" type="submit" value="email">Open email draft <span aria-hidden="true">→</span></button>
            <button className="button button-outline" type="submit" value="download">Download brief <span aria-hidden="true">↓</span></button>
          </div>
          <p className="form-note">Review and send the draft from your email app.</p>
          <p className="form-status" role="status">{status}</p>
        </form>
      </div>
    </section>
  )
}
