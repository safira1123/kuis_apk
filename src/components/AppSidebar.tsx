'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '../app/AppLogo';
import {
  LayoutDashboard, BookOpen, ClipboardList, Users, Trophy, LogOut,
  ChevronLeft, ChevronRight, Gamepad2, Star, Moon
} from 'lucide-react';

type SidebarProps = {
  role: 'teacher' | 'student';
  userName: string;
  userAvatar?: string;
};

type NavItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  badge?: number;
};

const teacherNav: NavItem[] = [
  { id: 'nav-dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/teacher-dashboard' },
  { id: 'nav-materials', label: 'Materi', icon: BookOpen, href: '/teacher-dashboard' },
  { id: 'nav-quizzes', label: 'Kuis', icon: ClipboardList, href: '/teacher-dashboard', badge: 3 },
  { id: 'nav-students', label: 'Murid', icon: Users, href: '/teacher-dashboard' },
  { id: 'nav-leaderboard', label: 'Leaderboard', icon: Trophy, href: '/teacher-dashboard' },
];

const studentNav: NavItem[] = [
  { id: 'nav-home', label: 'Beranda', icon: LayoutDashboard, href: '/student-dashboard' },
  { id: 'nav-materials', label: 'Materi', icon: BookOpen, href: '/student-dashboard' },
  { id: 'nav-quizzes', label: 'Kuis', icon: ClipboardList, href: '/student-dashboard', badge: 2 },
  { id: 'nav-ranking', label: 'Ranking', icon: Trophy, href: '/student-dashboard' },
  { id: 'nav-game', label: 'Mini Game', icon: Gamepad2, href: '/student-dashboard' },
];

export default function AppSidebar({ role, userName }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const navItems = role === 'teacher' ? teacherNav : studentNav;

  return (
    <aside
      className="flex flex-col h-screen sticky top-0 bg-white border-r border-border shadow-soft transition-all duration-300 z-20"
      style={{ width: collapsed ? '72px' : '240px', minWidth: collapsed ? '72px' : '240px' }}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 p-4 border-b border-border ${collapsed ? 'justify-center' : ''}`}>
        <AppLogo size={36} />
        {!collapsed && (
          <span className="font-bold text-lg text-gradient-green truncate">QuizLMS</span>
        )}
      </div>

      {/* Role Badge */}
      {!collapsed && (
        <div className="px-4 py-3">
          <div className={`flex items-center gap-2 rounded-2xl p-2.5 ${role === 'teacher' ? 'bg-pastel-green bg-opacity-30' : 'bg-soft-pink bg-opacity-30'}`}>
            {role === 'teacher' ? <Users size={16} className="text-primary-foreground" /> : <Star size={16} className="text-secondary-foreground" />}
            <div className="min-w-0">
              <p className="text-xs font-bold text-foreground truncate">{userName}</p>
              <p className={`text-xs font-medium ${role === 'teacher' ? 'text-primary-foreground' : 'text-secondary-foreground'}`}>
                {role === 'teacher' ? '👩‍🏫 Guru' : '🎓 Murid'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto scrollbar-soft">
        {!collapsed && (
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 py-1 mb-1">
            {role === 'teacher' ? 'Menu Guru' : 'Menu Murid'}
          </p>
        )}
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`sidebar-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-2' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={20} />
              {!collapsed && (
                <span className="flex-1 truncate">{item.label}</span>
              )}
              {!collapsed && item.badge && (
                <span className="bg-soft-pink text-secondary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
              {collapsed && item.badge && (
                <span className="absolute -top-1 -right-1 bg-soft-pink text-secondary-foreground text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Islamic Quote */}
      {!collapsed && (
        <div className="px-4 py-3 mx-3 mb-2 bg-muted rounded-2xl">
          <p className="text-xs text-muted-foreground text-center font-medium">
            <Moon size={12} className="inline mr-1 text-gold" />
            اطْلُبُوا الْعِلْمَ
          </p>
          <p className="text-xs text-muted-foreground text-center italic">Tuntutlah ilmu...</p>
        </div>
      )}

      {/* Bottom: Collapse + Logout */}
      <div className="border-t border-border p-3 space-y-1">
        <Link
          href="/"
          className={`sidebar-link text-red-400 hover:text-red-600 hover:bg-red-50 ${collapsed ? 'justify-center px-2' : ''}`}
          title={collapsed ? 'Keluar' : undefined}
        >
          <LogOut size={20} />
          {!collapsed && <span>Keluar</span>}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`sidebar-link w-full ${collapsed ? 'justify-center px-2' : ''}`}
          title={collapsed ? 'Perluas' : 'Ciutkan'}
        >
          {collapsed ? <ChevronRight size={18} /> : (
            <>
              <ChevronLeft size={18} />
              <span className="text-sm">Ciutkan</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}