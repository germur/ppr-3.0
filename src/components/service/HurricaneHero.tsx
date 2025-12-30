
import { motion } from 'framer-motion';

interface DeploymentStat {
    label: string;
    value: string;
    trend?: 'up' | 'down' | 'neutral';
}

export default function HurricaneHero({ title, subtitle, stats }: { title: string, subtitle: string, stats: DeploymentStat[] }) {
    return (
        <section className="relative bg-slate-900 text-white overflow-hidden min-h-[600px] flex items-center">
            {/* Background Map Effect */}
            <div className="absolute inset-0 z-0 opacity-40">
                <img src="https://images.unsplash.com/photo-1454789476662-53eb23ba5907?q=80&w=2552&auto=format&fit=crop" alt="Storm Map" className="w-full h-full object-cover grayscale mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 pt-20">
                <div>
                    <div className="inline-block bg-red-600/20 text-red-500 border border-red-600/50 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
                        ⚠ Status: Active Response
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        {title}
                    </h1>
                    <p className="text-xl text-slate-300 mb-8 max-w-lg">
                        {subtitle}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-12">
                        <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg shadow-orange-600/20">
                            Request Immediate Dispatch
                        </button>
                        <button className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold hover:bg-slate-100 transition-colors">
                            View Service Map
                        </button>
                    </div>
                </div>

                {/* Command Center Stats Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-slate-950/80 backdrop-blur-md rounded-2xl border border-slate-800 p-8 shadow-2xl"
                >
                    <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-800">
                        <div>
                            <span className="text-xs text-slate-400 uppercase tracking-widest block mb-1">Current Deployment</span>
                            <span className="text-xl font-bold text-white">Miami-Dade & Broward</span>
                        </div>
                        <div className="text-right">
                            <span className="text-xs text-slate-400 uppercase tracking-widest block mb-1">Teams Active</span>
                            <span className="text-2xl font-bold text-blue-500">25+</span>
                        </div>
                    </div>

                    <img
                        src="https://images.unsplash.com/photo-1626017232230-03e5c9b68ca4?q=80&w=2670&auto=format&fit=crop"
                        alt="Trucks on road"
                        className="w-full h-48 object-cover rounded-xl mb-6 border border-slate-800"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-slate-900 p-4 rounded-lg">
                                <span className="text-xs text-slate-500 block mb-1">{stat.label}</span>
                                <span className="text-lg font-bold text-white">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
