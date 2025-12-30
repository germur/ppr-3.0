import { motion } from 'framer-motion';
import { Hammer, Zap, Wind, ShieldCheck, Home } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function PillarShowcase() {
  return (
    <div className="p-8 max-w-6xl mx-auto bg-slate-50 min-h-screen font-sans text-slate-900">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
          PPR 2.5 Technical Pillars
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Demonstrating Astro + React + Tailwind + Lucide + Framer Motion
        </p>
      </header>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]"
      >
        {/* Bento Grid Item 1: Large Feature */}
        <motion.div 
          variants={item}
          className="md:col-span-2 row-span-2 bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                <Home size={200} />
            </div>
            <div>
                 <div className="bg-blue-100 text-blue-700 p-2 rounded-lg w-fit mb-4">
                    <ShieldCheck size={24} />
                 </div>
                 <h2 className="text-2xl font-semibold mb-2">Restoration Services</h2>
                 <p className="text-slate-500">
                     Comprehensive solutions for water, fire, and storm damage. using our new architecture.
                 </p>
            </div>
            <div className="mt-8">
                <button className="bg-slate-900 text-white px-6 py-2 rounded-full hover:bg-slate-800 transition-colors flex items-center gap-2">
                    Start Restoration <Zap size={16} />
                </button>
            </div>
        </motion.div>

        {/* Bento Grid Item 2: Stat */}
        <motion.div 
          variants={item}
          className="bg-indigo-600 text-white rounded-2xl p-6 shadow-sm flex flex-col justify-center items-center text-center"
        >
            <Wind size={48} className="mb-4 animate-pulse" />
            <h3 className="text-4xl font-bold mb-1">24/7</h3>
            <p className="text-indigo-200">Emergency Response</p>
        </motion.div>

        {/* Bento Grid Item 3: Feature */}
        <motion.div 
          variants={item}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden group"
        >
             <div className="bg-orange-100 text-orange-600 p-2 rounded-lg w-fit mb-auto">
                <Hammer size={24} />
             </div>
             <h3 className="text-xl font-semibold mt-4">Remodeling</h3>
             <p className="text-slate-500 text-sm mt-1">Kitchens, Baths & More</p>
             <motion.div 
                className="absolute inset-0 bg-orange-50/50" 
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ type: 'tween' }}
             />
        </motion.div>

        {/* Bento Grid Item 4: Wide Strip */}
        <motion.div 
           variants={item}
           className="md:col-span-3 bg-slate-900 text-slate-300 rounded-2xl p-8 flex items-center justify-between overflow-hidden"
        >
             <div className="z-10">
                 <h3 className="text-white text-xl font-semibold">Join the network</h3>
                 <p className="text-slate-400">Trusted by over 1000 homeowners in Florida</p>
             </div>
             <div className="flex gap-4 opacity-50">
                <ShieldCheck size={32} />
                <Zap size={32} />
                <Wind size={32} />
             </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
