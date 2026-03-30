import React from 'react';
import { useSparkStore } from '../store/useSparkStore';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { SparkCard } from '../components/SparkCard';
import { FAB } from '../components/FAB';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const sparks = useSparkStore((state) => state.sparks);
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[calc(100vh-120px)]">
      <Header />

      <div className="space-y-6 pb-24">
        {sparks.length > 0 ? (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {sparks.map((spark) => (
                <SparkCard 
                  key={spark.id} 
                  spark={spark} 
                  onClick={() => console.log('Spark clicked:', spark.id)} 
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center space-y-4"
          >
            <div className="p-4 rounded-full bg-secondary/50 text-muted">
              <Sparkles className="w-12 h-12" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-foreground">Искр пока нет</h3>
              <p className="text-sm text-muted max-w-[200px]">
                Запиши свою первую гениальную идею, а ИИ поможет её развить.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      <FAB onClick={() => navigate('/editor')} />
    </div>
  );
};
