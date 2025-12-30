import { motion } from 'framer-motion';
import { Phone, ShieldCheck, Clock, FileCheck, ArrowRight } from 'lucide-react';

interface ServiceHeroProps {
    title: string;
    subtitle: string;
    image: string;
    serviceType: 'restoration' | 'remodeling' | 'commercial';
    template?: 'emergency' | 'split' | 'commercial' | 'standard';
}

export default function ServiceHero({ title, subtitle, image, serviceType, template = 'standard' }: ServiceHeroProps) {
    const isRestoration = serviceType === 'restoration';

    // Theme Logic
    const theme = {
        restoration: { accent: 'bg-urgent hover:bg-orange-600', badge: 'bg-urgent/20 text-orange-200 border-urgent/30' },
        remodeling: { accent: 'bg-secondary hover:bg-orange-600', badge: 'bg-secondary/20 text-blue-200 border-secondary/30' },
        commercial: { accent: 'bg-primary hover:bg-blue-700', badge: 'bg-blue-500/20 text-blue-200 border-blue-400/30' }
    }[serviceType];

    // EMERGENCY LAYOUT (Full screen, urgent, centered)
    if (template === 'emergency' || (template === 'standard' && serviceType === 'restoration')) {
        return (
            <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40" />
                </div>
                <div className="relative z-10 container mx-auto px-4 pt-20">
                    <div className="max-w-4xl">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-6 border backdrop-blur-sm ${theme.badge}`}>
                            <span className="relative flex h-2 w-2 mr-1">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-urgent opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-urgent"></span>
                            </span>
                            LIVE DISPATCH ACTIVE
                        </motion.div>
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
                            {title}
                        </motion.h1>
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-slate-200 mb-8 max-w-2xl leading-relaxed">
                            {subtitle}
                        </motion.p>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4">
                            <a href="tel:1-800-555-0199" className="bg-urgent hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-urgent/20 transition-all transform hover:-translate-y-1">
                                <Phone size={20} /> Call 24/7 Emergency
                            </a>
                            <a href="#contact" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
                                <FileCheck size={20} /> File Insurance Claim
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>
        );
    }

    // SPLIT LAYOUT (Residential / Remodeling)
    if (template === 'split') {
        return (
            <section className="relative min-h-[600px] flex items-center bg-white dark:bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20 dark:opacity-40">
                    <img src={image} alt="" className="w-full h-full object-cover grayscale blur-sm" />
                </div>
                <div className="container mx-auto px-4 z-10 relative">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-4 block">Premium Remodeling</span>
                            <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                                {title}
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                                {subtitle}
                            </p>
                            <div className="flex gap-4">
                                <button className="bg-secondary hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold shadow-lg transition-transform hover:-translate-y-1">
                                    Request Quote
                                </button>
                                <button className="text-slate-900 dark:text-white font-bold flex items-center gap-2 hover:gap-3 transition-all px-4">
                                    View Portfolio <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                <img src={image} alt={title} className="w-full h-full object-cover" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // COMMERCIAL LAYOUT (Gradient Overlay, Center)
    return (
        <section className="relative min-h-[70vh] flex flex-col justify-center bg-slate-900">
            <div className="absolute inset-0 z-0">
                <img src={image} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900" />
            </div>
            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-sm">
                    Available 24/7 Statewide
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black text-white mb-6 max-w-4xl mx-auto leading-tight">
                    {title}
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                    {subtitle}
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-bold transition-colors">
                        Request Proposal
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-lg font-bold backdrop-blur-sm transition-colors">
                        Commercial Portfolio
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
