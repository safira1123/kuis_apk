import React from 'react';

type AppLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function AppLayout({ children, sidebar }: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden islamic-pattern-bg">
      {sidebar}
      <main className="flex-1 overflow-y-auto scrollbar-soft">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
