
import React, { useState } from 'react';

export default function ContactForm() {
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        // Simulate form submission or use Netlify handling attribute if applicable
        setStatus('submitted');
        // Actual submission logic would go here if not using Netlify forms directly via HTML attributes
    };

    if (status === 'submitted') {
        return (
            <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                <h3 className="text-xl font-bold text-green-700 mb-2">Message Sent!</h3>
                <p className="text-green-600">We will contact you shortly.</p>
            </div>
        );
    }

    return (
        <form className="space-y-4" name="contact-landing" method="POST" data-netlify="true" onSubmit={handleSubmit}>
            <input type="hidden" name="form-name" value="contact-landing" />

            <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Full Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                />
            </div>

            <div className="space-y-1">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Phone</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="(555) 123-4567"
                />
            </div>

            <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                />
            </div>

            <div className="space-y-1">
                <label htmlFor="concern" className="block text-sm font-semibold text-gray-700">Primary Concern</label>
                <select
                    id="concern"
                    name="concern"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                    <option value="Visual Mold">I see mold</option>
                    <option value="Musty Smell">I smell mold/musty odor</option>
                    <option value="Health Symptoms">Health symptoms</option>
                    <option value="Real Estate">Real Estate Transaction</option>
                    <option value="Prevention">Just checking / Prevention</option>
                </select>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
            >
                <span>Request Appointment</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>

            <p className="text-xs text-center text-gray-500 mt-3">
                Your privacy is protected. No spam.
            </p>
        </form>
    );
}
