import { motion } from 'framer-motion';

interface ProcessStep {
    id: string | number;
    title: string;
    description: string;
}

export default function ProcessStepsDark({ steps, title, subtitle }: { steps: ProcessStep[], title: string, subtitle?: string }) {
    return (
        <section className="py-24 bg-slate-900 text-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="mb-16">
                    {subtitle && <span className="text-blue-400 font-bold tracking-wider uppercase text-sm">{subtitle}</span>}
                    <h2 className="text-3xl md:text-4xl font-bold mt-2">{title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex gap-6 items-start border-l-2 border-slate-700 pl-8 relative"
                        >
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-900"></div>
                            <div>
                                <span className="text-blue-400 font-mono text-sm mb-1 block">STEP 0{index + 1}</span>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-slate-400 max-w-2xl">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
