'use client';

import React from 'react';

type Tab = { id: string; label: string };

type TabsNavProps = {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
};

export default function TabsNav({ tabs, activeTab, onTabChange }: TabsNavProps) {
  return (
    <div className="flex flex-wrap gap-2 bg-muted rounded-full p-1">
      {tabs.map((tab) => (
        <button
          key={`tab-${tab.id}`}
          onClick={() => onTabChange(tab.id)}
          className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}