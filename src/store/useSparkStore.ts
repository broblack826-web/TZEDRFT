import { create } from 'zustand';
import { Spark, SparkStore } from '../types';

export const useSparkStore = create<SparkStore>((set) => ({
  sparks: [
    {
      id: '1',
      title: 'AI Startup Idea',
      content: 'A platform for creators to generate ideas using AI.',
      createdAt: Date.now() - 100000,
    },
    {
      id: '2',
      title: 'TWA Game Concept',
      content: 'A viral game inside Telegram with social mechanics.',
      createdAt: Date.now() - 50000,
    },
    {
      id: '3',
      title: 'Minimalist Notion',
      content: 'A clean and fast note-taking app for mobile users.',
      createdAt: Date.now(),
    },
  ],
  addSpark: (spark) => set((state) => ({ sparks: [spark, ...state.sparks] })),
  removeSpark: (id) => set((state) => ({ sparks: state.sparks.filter((s) => s.id !== id) })),
}));
