import { useState } from 'react'
import { contactEmail } from './config.js'
import { services } from './content.js'

const serviceOptions = [
  ...services.map(({ title }) => title),
  'Something else',
]

export default function Contact({ service, onSelectService }) {
  const [status, setStatus] = useState('')

  function submitBrief(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const brief = [
      'ORAYEN project enquiry',
      '',
      'Name: ' + data.get('name'),
      'Email: ' + data.get('email'),
      'Service: ' + data.get('service'),
      '',
      'Project details',
      data.get('message'),
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
          <a className="contact-whatsapp" href="https://wa.me/94703670956">WhatsApp: 0703670956</a>
        </div>
        <form className="contact-form" id="project-form" onSubmit={submitBrief}>
          <div className="form-row">
            <label>Your name<input name="name" autoComplete="name" required maxLength={100} /></label>
            <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
          </div>
          <label>
            Service
            <select name="service" value={service} required onChange={(event) => onSelectService(event.target.value)}>
              <option value="">Select an option</option>
              {serviceOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label>
            Tell us about your project
            <textarea name="message" required rows={4} maxLength={3000} />
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
