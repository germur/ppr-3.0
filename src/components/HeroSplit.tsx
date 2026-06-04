import { motion } from 'framer-motion';
import { AlertTriangle, Hammer, ArrowRight, ShieldCheck, Home } from 'lucide-react';

export default function HeroSplit() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-slate-900 border-b border-slate-800">

            {/* Background with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-800 z-10" />
                {/* Placeholder for actual background image */}
                <img
                    src="/ppr-logo.png"
                    alt="Restoration and Remodeling"
                    className="w-full h-full object-cover opacity-30 grayscale"
                 width={800} height={600} loading="lazy" decoding="async" />
            </div>

            <div className="relative z-20 container mx-auto px-4 text-center mt-20 mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wider mb-6 border border-blue-500/20">
                    SERVING ALL OF FLORIDA
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4 max-w-5xl mx-auto leading-tight">
                    Florida's Trusted <br />
                    <span className="text-blue-400">Restoration</span> & <span className="text-orange-500">Recovery Experts</span>
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-12">
                    From catastrophic storm recovery to water, fire and mold damage, we restore your property and your peace of mind. Fast 24/7 response, expert craftsmanship.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">

                    {/* RESTORATION CARD (The Defense) */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="group relative bg-white rounded-2xl p-8 text-left shadow-2xl overflow-hidden border-2 border-transparent hover:border-red-100"
                    >
                        <div className="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-6">
                                <AlertTriangle size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">I Have an Emergency</h2>
                            <p className="text-slate-500 mb-6 text-sm">Water, Fire, Mold, or Storm Damage. We arrive fast to mitigate.</p>

                            <a href="/restoration/" className="inline-flex items-center gap-2 text-red-600 font-bold text-sm tracking-wide uppercase hover:gap-3 transition-all">
                                Dispatch Team Now <ArrowRight size={16} />
                            </a>
                        </div>
                    </motion.div>

                    {/* REMODELING CARD (The Attack) */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="group relative bg-white rounded-2xl p-8 text-left shadow-2xl overflow-hidden border-2 border-transparent hover:border-blue-100"
                    >
                        <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                                <Hammer size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">I Want to Remodel</h2>
                            <p className="text-slate-500 mb-6 text-sm">Kitchens, Bathrooms, & Full Renovations. Build your dream space.</p>

                            <a href="/restoration/" className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm tracking-wide uppercase hover:gap-3 transition-all">
                                Schedule Estimate <ArrowRight size={16} />
                            </a>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Trust Badges */}
            <div className="relative z-20 w-full border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm py-8">
                <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 text-slate-400 text-sm font-medium">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="text-orange-500" size={20} /> Property Restoration Experts
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="text-orange-500" size={20} /> Emergency Response Team
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="text-orange-500" size={20} /> 4.9/5 Star Google Reviews
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="text-orange-500" size={20} /> Direct Insurance Billing
                    </div>
                </div>
            </div>

        </section>
    );
}
