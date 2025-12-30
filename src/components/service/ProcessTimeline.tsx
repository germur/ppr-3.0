import { motion } from 'framer-motion';

interface ProcessStep {
    title: string;
    description: string;
    icon: React.ElementType; // Lucide icon
}

export default function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Our Protocol</span>
                    <h2 className="text-4xl font-bold text-slate-900 mt-2">The Restoration Process</h2>
                    <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                        Transparent, step-by-step recovery process to ensure your property is restored to pre-loss condition.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="relative flex flex-col items-center text-center group"
                                >
                                    <div className="w-24 h-24 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:border-blue-100 group-hover:shadow-md transition-all">
                                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                                            <Icon size={32} />
                                        </div>
                                        <div className="absolute top-0 right-0 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-4 border-white">
                                            {index + 1}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
