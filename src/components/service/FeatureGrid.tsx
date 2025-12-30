import { motion } from 'framer-motion';

interface Feature {
    title: string;
    description: string;
    icon: React.ElementType;
}

export default function FeatureGrid({ title, features }: { title: string, features: Feature[] }) {
    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">{title}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100"
                            >
                                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                                    <Icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
