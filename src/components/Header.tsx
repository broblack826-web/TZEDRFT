import React from 'react';
import WebApp from '@twa-dev/sdk';
import { User } from 'lucide-react';

export const Header: React.FC = () => {
  const user = WebApp.initDataUnsafe.user;

  return (
    <header className="flex items-center justify-between py-4 mb-6">
      <div className="flex flex-col">
        <span className="text-xs text-muted font-medium uppercase tracking-widest">С возвращением</span>
        <h1 className="text-xl font-bold text-foreground">
          {user?.first_name ? `Привет, ${user.first_name}!` : 'IdeaSpark'}
        </h1>
      </div>
      
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-primary rounded-full blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
        <div className="relative w-10 h-10 rounded-full bg-secondary border border-border overflow-hidden flex items-center justify-center">
          {user?.photo_url ? (
            <img 
              src={user.photo_url} 
              alt={user.first_name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <User className="w-5 h-5 text-muted" />
          )}
        </div>
      </div>
    </header>
  );
};
