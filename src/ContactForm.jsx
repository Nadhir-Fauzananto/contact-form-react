import React from 'react'
import successCheckIcon from './images/icon-success-check.svg'

export function ContactForm() {

    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    })
    
    const [queryType, setQueryType] = React.useState(null)
    const [consent, setConsent] = React.useState(false)

    const [error, setError] = React.useState({})
    const [submitStatus, setSubmitStatus] = React.useState('')

    const validateForm = () => {
        const errors = {}

        if (formData.firstName.trim().length < 1) {
            errors.firstName = 'First name is required.'
        }

        if (formData.lastName.trim().length < 1) {
            errors.lastName = 'Last name is required.'
        }

        if (formData.email.trim().length < 1) {
            errors.email = 'A valid email address is required.'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            errors.email = 'Invalid email address.'
        }

        if (formData.message.trim().length < 1) {
            errors.message = 'Message cannot be empty.'
        }

        if (!queryType) {
            errors.queryType = 'Please select a query type.'
        }

        if (!consent) {
            errors.consent = 'You must agree to be contacted.'
        }

        return errors
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))

        if (error[name]) {
            setError(prevErrors => ({
                ...prevErrors,
                [name]: ''
            }))
        }
    }

    const [isFormValid, setIsFormValid] = React.useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        const errors = validateForm()
        if (Object.keys(errors).length > 0) {
            setError(errors)
            setIsFormValid(false)
            setSubmitStatus('error')
            return
        } else {
                const data = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                message: formData.message,
                queryType: queryType,
                consent: consent
            }
                setIsFormValid(true)
                setSubmitStatus('success')
        }
    }
    
    return (
        <div className="contact-form-container">
            <div className="contact-message-container">
                <h1>Contact Us</h1>
                {submitStatus === 'success' ? 
                <div className="submit-status-success-container">
                    <div className="submit-status-success-checkmark">
                        <img src={successCheckIcon} alt="Success checkmark"></img>
                        <h2>Message Sent!</h2>
                    </div>
                    <p className="submit-status-success-message">Your data has been successfully submitted! Our team will contact you as soon as possible.</p>
                </div> : 
                null}
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="name-container">
                    <div className="first-name-container">
                        <label htmlFor="first-name">First Name *</label>
                        <input 
                        type="text" 
                        placeholder="John" 
                        id="first-name" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        aria-required="true"
                        aria-label="Please enter your first name."
                        />
                        {error.firstName ? 
                        <p className="submit-status-error">{error.firstName}</p> : null}
                    </div>

                    <div className="last-name-container">
                        <label htmlFor="last-name">Last Name *</label>
                        <input 
                        type="text" 
                        placeholder="Doe" 
                        id="last-name" 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleInputChange}
                        aria-required="true"
                        aria-label="Please enter your last name."
                        />
                        {error.lastName ? 
                        <p className="submit-status-error">{error.lastName}</p> : null}
                    </div>
                </div>

                <div className="email-container">
                    <label htmlFor="email">Email *</label>
                    <input 
                    type="email" 
                    placeholder="john.doe@example.com" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange}
                    aria-required="true"
                    aria-label="Please enter your email address."
                    />
                    {error.email ? 
                    <p className="submit-status-error">{error.email}</p> : null}
                </div>

                <div className="query-container">
                    <p>Query Type *</p>
                    <div className="query-type-container">
                        <div  className="query-type">
                            <input         
                            type="radio" 
                            name="query" 
                            id="general-query" 
                            checked={queryType === 'general-query'} 
                            onChange={() => { setQueryType('general-query'); setError(prev => ({...prev, queryType: ''})) }}
                            aria-required="true"
                            aria-label="Check this for general query."/>
                            <label htmlFor="general-query">General Query</label>
                        </div>

                        <div className="query-type">                       
                            <input 
                            type="radio" 
                            name="query" 
                            id="support-request" 
                            checked={queryType === 'support-request'} 
                            onChange={() => { setQueryType('support-request'); setError(prev => ({...prev, queryType: ''})) }}
                            aria-required="true"
                            aria-label="Check this for support request."/>
                            <label htmlFor="support-request">Support Request</label>
                        </div>
                    </div>
                    {error.queryType ? 
                    <p className="submit-status-error">{error.queryType}</p> : null}
                </div>

                <div className="message-container">
                    <label htmlFor="message">Message *</label>
                    <textarea 
                    placeholder="Your message" 
                    id="message" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleInputChange}
                    aria-required="true"
                    aria-label="Please enter your message."></textarea>
                    {error.message ? 
                    <p className="submit-status-error">{error.message}</p> : null}
                </div>

                <div className="consent-container">
                    <span className="checkmark-checkbox"></span> 
                    <input 
                    type="checkbox" 
                    id="consent" 
                    name="consent" 
                    checked={consent} 
                    onChange={() => { setConsent(!consent); setError(prev => ({...prev, consent: ''})) }}
                    aria-required="true"
                    aria-label="Check this to agree to being contacted by the team."/>
                    <label htmlFor="consent">I agree to being contacted by the team. *</label>
                    {error.consent ? 
                    <p className="submit-status-error">{error.consent}</p> : null}
                </div>

                <button 
                type="submit" 
                className="submit-btn" 
                onClick={handleSubmit}
                aria-label="A button to submit the form.">Submit</button>
            </form>
        </div>
    )
}