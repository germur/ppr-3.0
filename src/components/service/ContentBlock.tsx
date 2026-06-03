import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ContentBlockProps {
    title: string;
    subtitle?: string;
    description: string;
    image: string;
    reverse?: boolean;
    dark?: boolean;
    listItems?: string[];
}

export default function ContentBlock({ title, subtitle, description, image, reverse, dark, listItems }: ContentBlockProps) {
    return (
        <section className={`py-20 lg:py-28 ${dark ? 'bg-background-dark text-white' : 'bg-background-light text-slate-900'} overflow-hidden`}>
            <div className="container mx-auto px-4 max-w-7xl">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>

                    {/* Image Side */}
                    <div className={`relative ${reverse ? 'lg:order-2' : ''}`}>
                        <motion.div
                            initial={{ opacity: 0, x: reverse ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`rounded-2xl overflow-hidden shadow-2xl ${dark ? 'shadow-black/50 border border-slate-700' : 'shadow-slate-200 border border-slate-100'}`}
                        >
                            <img src={image} alt={title} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"  width={800} height={600} loading="lazy" decoding="async" />
                        </motion.div>
                        {/* Decorative Blob */}
                        <div className={`absolute -bottom-12 -right-12 w-64 h-64 rounded-full blur-3xl -z-10 bg-primary/20`}></div>
                    </div>

                    {/* Text Side */}
                    <div className={`${reverse ? 'lg:order-1' : ''}`}>
                        {subtitle && (
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className={`font-bold tracking-widest uppercase text-xs mb-4 block ${dark ? 'text-primary' : 'text-primary'}`}
                            >
                                {subtitle}
                            </motion.span>
                        )}
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight font-display"
                        >
                            {title}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className={`text-lg mb-8 leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'}`}
                        >
                            {description}
                        </motion.p>

                        {listItems && (
                            <ul className="space-y-4 mb-10">
                                {listItems.map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + (index * 0.1) }}
                                        className="flex items-start gap-3"
                                    >
                                        <div className={`mt-0.5 rounded-full flex items-center justify-center flex-shrink-0 ${dark ? 'text-primary' : 'text-primary'}`}>
                                            <CheckCircle2 size={20} className="fill-current/10" />
                                        </div>
                                        <span className={`font-medium ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        )}

                        <motion.a
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            href="/contact/"
                            className={`inline-flex items-center gap-2 font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${dark ? 'bg-primary hover:bg-blue-600 text-white shadow-blue-900/20' : 'bg-primary hover:bg-blue-700 text-white shadow-blue-500/20'}`}
                        >
                            Get Started Now <ArrowRight size={18} />
                        </motion.a>
                    </div>

                </div>
            </div>
        </section>
    );
}
