import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSparkStore } from '../store/useSparkStore';
import WebApp from '@twa-dev/sdk';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, Check, ChevronLeft } from 'lucide-react';

export const Editor: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  
  const addSpark = useSparkStore((state) => state.addSpark);
  const navigate = useNavigate();

  const handleSave = useCallback(() => {
    if (title && content) {
      addSpark({
        id: Date.now().toString(),
        title,
        content,
        createdAt: Date.now(),
      });
      WebApp.HapticFeedback.notificationOccurred('success');
      navigate('/');
    }
  }, [title, content, addSpark, navigate]);

  useEffect(() => {
    // Configure Telegram MainButton
    WebApp.MainButton.setText('СОХРАНИТЬ ИСКРУ');
    WebApp.MainButton.setParams({
      is_visible: !!(title && content),
      color: '#00FF88',
      text_color: '#121212'
    });
    WebApp.MainButton.onClick(handleSave);

    // Back button support
    WebApp.BackButton.show();
    WebApp.BackButton.onClick(() => navigate('/'));

    return () => {
      WebApp.MainButton.hide();
      WebApp.MainButton.offClick(handleSave);
      WebApp.BackButton.hide();
    };
  }, [title, content, handleSave, navigate]);

  const generateAI = async () => {
    if (!content) {
      WebApp.HapticFeedback.notificationOccurred('error');
      return;
    }

    setIsGenerating(true);
    setAiSuggestions([]);
    WebApp.HapticFeedback.impactOccurred('medium');

    // Mock AI delay
    setTimeout(() => {
      const mocks = [
        `🚀 Развить это как мобильное приложение для ${content.toLowerCase()}`,
        `💡 Добавить социальную механику "эстафеты" для ${content.toLowerCase()}`,
        `🎨 Создать визуальный стиль в духе киберпанка для ${content.toLowerCase()}`,
        `🤖 Интегрировать ИИ-ассистента, который автоматизирует ${content.toLowerCase()}`,
        `📈 Монетизировать через подписку на эксклюзивный контент по теме ${content.toLowerCase()}`
      ];
      setAiSuggestions(mocks);
      setIsGenerating(false);
      WebApp.HapticFeedback.notificationOccurred('success');
    }, 2000);
  };

  const selectSuggestion = (suggestion: string) => {
    setContent(prev => prev + '\n\n' + suggestion);
    setAiSuggestions([]);
  };

  return (
    <div className="space-y-8 pb-32">
      <header className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/')} 
          className="p-2 rounded-full bg-secondary text-muted hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold">Создание</h1>
      </header>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted px-1">Заголовок</label>
          <input
            type="text"
            placeholder="Назови свою искру..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent border-none focus:ring-0 text-3xl font-black placeholder:text-muted/30 p-0"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted px-1">Суть идеи</label>
          <textarea
            placeholder="Опиши свою идею в паре слов..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-48 bg-transparent border-none focus:ring-0 text-xl leading-relaxed placeholder:text-muted/30 resize-none p-0"
          />
        </div>
      </div>

      <div className="relative">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={generateAI}
          disabled={isGenerating || !content}
          className="w-full py-4 rounded-2xl bg-secondary border border-border flex items-center justify-center gap-3 font-bold text-primary disabled:opacity-50 disabled:grayscale transition-all"
        >
          {isGenerating ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5" />
          )}
          {isGenerating ? 'ИИ разжигает искру...' : 'Разжечь через ИИ ✨'}
        </motion.button>

        <AnimatePresence>
          {aiSuggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6 space-y-3"
            >
              <h3 className="text-xs font-bold text-muted uppercase tracking-widest px-1">Варианты развития:</h3>
              {aiSuggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => selectSuggestion(suggestion)}
                  className="w-full p-4 rounded-xl bg-card border border-border text-left text-sm hover:border-primary/50 transition-colors flex items-center justify-between group"
                >
                  <span className="flex-1">{suggestion}</span>
                  <Check className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
