import React, { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    // Initialize Telegram WebApp
    WebApp.ready();
    WebApp.expand();
    
    // Set theme colors based on Telegram theme
    const themeParams = WebApp.themeParams;
    if (themeParams.bg_color) {
      document.documentElement.style.setProperty('--color-background', themeParams.bg_color);
    }
    if (themeParams.text_color) {
      document.documentElement.style.setProperty('--color-foreground', themeParams.text_color);
    }
    if (themeParams.button_color) {
      document.documentElement.style.setProperty('--color-primary', themeParams.button_color);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground safe-area-top safe-area-bottom">
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};
