import React from 'react';
import { motion } from 'framer-motion';
import { Spark } from '../types';
import { Zap, Clock } from 'lucide-react';

interface SparkCardProps {
  spark: Spark;
  onClick: () => void;
}

export const SparkCard: React.FC<SparkCardProps> = ({ spark, onClick }) => {
  const timeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'только что';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}м назад`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}ч назад`;
    return `${Math.floor(hours / 24)}д назад`;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className="group relative p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors duration-300 cursor-pointer overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute -right-10 -top-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-300"></div>
      
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Zap className="w-4 h-4 fill-primary/20" />
        </div>
        <div className="flex items-center text-[10px] text-muted uppercase tracking-widest font-semibold">
          <Clock className="w-3 h-3 mr-1" />
          {timeAgo(spark.createdAt)}
        </div>
      </div>

      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
        {spark.title}
      </h3>
      
      <p className="text-sm text-muted leading-relaxed line-clamp-3">
        {spark.content}
      </p>

      <div className="mt-4 flex items-center justify-end">
        <div className="text-[10px] text-primary font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Подробнее →
        </div>
      </div>
    </motion.div>
  );
};
