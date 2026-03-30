import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface FABProps {
  onClick: () => void;
}

export const FAB: React.FC<FABProps> = ({ onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      onClick={onClick}
      className="fixed bottom-10 right-6 z-50 group flex items-center justify-center"
    >
      {/* Pulse Effect */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-16 h-16 bg-primary rounded-full blur-xl"
      />
      
      <div className="relative w-14 h-14 bg-primary rounded-full shadow-lg shadow-primary/30 flex items-center justify-center text-background">
        <Plus className="w-6 h-6 stroke-[3px]" />
      </div>
      
      {/* Tooltip on hover */}
      <div className="absolute right-16 px-3 py-1.5 bg-card border border-border rounded-lg text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        Новая Искра ✨
      </div>
    </motion.button>
  );
};
