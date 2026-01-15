
import React, { useState } from 'react';

export default function ContactForm() {
    const [status, setStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
        })
            .then(() => setStatus('submitted'))
            .catch((error) => {
                console.error("Form submission error:", error);
                setErrorMessage("Something went wrong. Please call us directly.");
            });
    };

    if (status === 'submitted') {
        return (
            <div className="text-center p-8 bg-green-50 rounded-xl border border-green-200 shadow-sm animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Request Received!</h3>
                <p className="text-green-700 mb-4">Our team has been notified. We will call you at the number provided shortly to confirm your appointment.</p>
                <a href="tel:7866022217" className="inline-block bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition">
                    Call Now if Urgent
                </a>
            </div>
        );
    }

    return (
        <form
            className="space-y-4"
            name="contact-landing"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
        >
            {/* Hidden input for Netlify Form detection */}
            <input type="hidden" name="form-name" value="contact-landing" />

            {/* Honeypot field for anti-spam (optional but recommended) */}
            <p className="hidden">
                <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
            </p>

            {errorMessage && (
                <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm mb-4">
                    {errorMessage}
                </div>
            )}

            <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Full Name *</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                    placeholder="John Doe"
                />
            </div>

            <div className="space-y-1">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Phone Number *</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                    placeholder="(555) 123-4567"
                />
            </div>

            <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address *</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                    placeholder="john@example.com"
                />
            </div>

            <div className="space-y-1">
                <label htmlFor="concern" className="block text-sm font-semibold text-gray-700">Primary Concern</label>
                <div className="relative">
                    <select
                        id="concern"
                        name="concern"
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none"
                    >
                        <option value="Visual Mold">I see mold growth</option>
                        <option value="Musty Smell">I smell a musty odor</option>
                        <option value="Health Symptoms">Experiencing health symptoms</option>
                        <option value="Real Estate">Real Estate / Buying or Selling</option>
                        <option value="Prevention">Prevention / Peace of Mind</option>
                        <option value="Commercial">Commercial Property Issue</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            <div className="space-y-1">
                <label htmlFor="notes" className="block text-sm font-semibold text-gray-700">Additional Details</label>
                <textarea
                    id="notes"
                    name="notes"
                    rows="2"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 resize-none"
                    placeholder="Any specific instructions or questions?"
                ></textarea>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
            >
                <span>Request Priority Appointment</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>

            <p className="text-xs text-center text-gray-500 mt-3 flex items-center justify-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
                SSL Secure Encrypted Submission
            </p>
        </form>
    );
}
