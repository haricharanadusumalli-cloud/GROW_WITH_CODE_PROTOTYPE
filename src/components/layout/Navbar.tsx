import React, { useState } from 'react';
import {
  Code,
  Flame,
  Zap,
  Award,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  Compass,
  Briefcase,
  TerminalSquare,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';

interface NavbarProps {
  onOpenAuth?: (mode: 'login' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const {
    user,
    isAuthenticated,
    currentView,
    navigateTo,
    logout,
    activeNotification,
    clearNotification,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass, view: { type: 'dashboard' as const } },
    { id: 'learn', label: 'Learn', icon: Code, view: { type: 'learn-catalog' as const } },
    { id: 'arena', label: 'Code Arena', icon: TerminalSquare, view: { type: 'arena' as const } },
    { id: 'interview', label: 'Interviews', icon: Briefcase, view: { type: 'interview-setup' as const } },
  ];

  const isCurrentActive = (linkId: string) => {
    if (linkId === 'dashboard') return currentView.type === 'dashboard';
    if (linkId === 'learn')
      return (
        currentView.type === 'learn-catalog' ||
        currentView.type === 'course' ||
        currentView.type === 'topic' ||
        currentView.type === 'lesson' ||
        currentView.type === 'problem' ||
        currentView.type === 'assessment' ||
        currentView.type === 'course-completed'
      );
    if (linkId === 'arena')
      return currentView.type === 'arena' || currentView.type === 'arena-challenge';
    if (linkId === 'interview')
      return (
        currentView.type === 'interview-setup' ||
        currentView.type === 'interview-sim' ||
        currentView.type === 'interview-report'
      );
    return false;
  };

  return (
    <>
      {/* Toast Notification Banner */}
      {activeNotification && (
        <aside
          aria-label="Notification"
          className="fixed top-3 right-3 sm:right-6 z-50 flex items-center justify-between gap-3 px-4 py-2.5 bg-slate-900 border border-emerald-500/50 text-slate-100 text-xs sm:text-sm rounded-lg shadow-xl shadow-black/50"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-emerald-300">{activeNotification}</span>
          </div>
          <button
            onClick={clearNotification}
            className="text-slate-400 hover:text-slate-200 p-0.5"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </aside>
      )}

      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-6">
              <button
                onClick={() =>
                  navigateTo(isAuthenticated ? { type: 'dashboard' } : { type: 'landing' })
                }
                className="flex items-center gap-2.5 text-left group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 transition-colors">
                  <TerminalSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-base tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                      Grow With Code
                    </span>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                      v1
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 hidden sm:block">Learn · Practice · Become Ready</p>
                </div>
              </button>

              {/* Desktop Nav Links */}
              {isAuthenticated && (
                <nav className="hidden md:flex items-center gap-1 ml-4" aria-label="Main Navigation">
                  {navLinks.map((link) => {
                    const active = isCurrentActive(link.id);
                    const Icon = link.icon;
                    return (
                      <button
                        key={link.id}
                        onClick={() => navigateTo(link.view)}
                        className={`flex items-center gap-2 px-3 py-1.5 text-xs lg:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                          active
                            ? 'text-white bg-slate-900 border border-slate-700/80 shadow-xs'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${active ? 'text-emerald-400' : 'text-slate-400'}`} />
                        <span>{link.label}</span>
                      </button>
                    );
                  })}
                </nav>
              )}
            </div>

            {/* Right side stats & profile */}
            <div className="flex items-center gap-2 sm:gap-3">
              {isAuthenticated ? (
                <>
                  {/* Streak & XP Quick indicators */}
                  <div className="hidden sm:flex items-center gap-3 pr-3 border-r border-slate-800 text-xs font-mono">
                    <div className="flex items-center gap-1 text-amber-400" title="Daily streak">
                      <Flame className="w-4 h-4 fill-amber-400/20" />
                      <span className="font-semibold">{user.streakDays}d</span>
                    </div>
                    <div className="flex items-center gap-1 text-sky-400" title="Code Arena Level">
                      <Zap className="w-4 h-4 fill-sky-400/20" />
                      <span>Lvl {user.arenaLevel}</span>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-400" title="Earned XP">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{user.arenaXp.toLocaleString()} XP</span>
                    </div>
                  </div>

                  {/* Profile Menu Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setProfileDropdownOpen((prev) => !prev)}
                      className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-850 hover:border-slate-700 transition-colors cursor-pointer"
                      aria-label="User menu"
                    >
                      <div className="w-7 h-7 rounded-md bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center">
                        {user.name.charAt(0)}
                      </div>
                      <span className="hidden sm:inline text-xs font-medium text-slate-200 max-w-[100px] truncate">
                        {user.name}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {profileDropdownOpen && (
                      <div
                        className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-xl shadow-black/50 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                        onMouseLeave={() => setProfileDropdownOpen(false)}
                      >
                        <div className="px-3.5 py-2 border-b border-slate-800">
                          <p className="text-xs font-semibold text-slate-200">{user.name}</p>
                          <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                          <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 mt-1">
                            <span>Lvl {user.arenaLevel} Developer</span>
                            <span>·</span>
                            <span>{user.solvedProblemsCount} Solved</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            navigateTo({ type: 'profile' });
                          }}
                          className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 text-left transition-colors cursor-pointer"
                        >
                          <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span>View Profile & Progress</span>
                        </button>

                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            if (user.certificates.length > 0) {
                              navigateTo({
                                type: 'certificate',
                                certificateId: user.certificates[0].id,
                              });
                            } else {
                              navigateTo({ type: 'dashboard' });
                            }
                          }}
                          className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 text-left transition-colors cursor-pointer"
                        >
                          <Award className="w-3.5 h-3.5 text-slate-400" />
                          <span>Certificates ({user.certificates.length})</span>
                        </button>

                        <div className="my-1 border-t border-slate-800" />

                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-rose-400 hover:bg-rose-950/40 text-left transition-colors cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => (onOpenAuth ? onOpenAuth('login') : navigateTo({ type: 'dashboard' }))}
                  >
                    Log In
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => (onOpenAuth ? onOpenAuth('signup') : navigateTo({ type: 'onboarding' }))}
                  >
                    Start Learning
                  </Button>
                </div>
              )}

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="md:hidden p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-900"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 pt-2 pb-4 space-y-2">
            {isAuthenticated ? (
              <>
                <div className="flex items-center justify-around py-2 border-b border-slate-850 text-xs font-mono">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Flame className="w-4 h-4" />
                    <span>{user.streakDays}d Streak</span>
                  </div>
                  <div className="flex items-center gap-1 text-sky-400">
                    <Zap className="w-4 h-4" />
                    <span>Lvl {user.arenaLevel}</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{user.arenaXp} XP</span>
                  </div>
                </div>

                {navLinks.map((link) => {
                  const active = isCurrentActive(link.id);
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.id}
                      onClick={() => {
                        navigateTo(link.view);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-left ${
                        active
                          ? 'bg-slate-900 text-emerald-400 border border-slate-800'
                          : 'text-slate-300 hover:bg-slate-900/60'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </button>
                  );
                })}

                <div className="pt-2 border-t border-slate-850 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      navigateTo({ type: 'profile' });
                      setMobileMenuOpen(false);
                    }}
                  >
                    Profile
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-rose-400"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-2 pt-2">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => {
                    onOpenAuth?.('signup');
                    setMobileMenuOpen(false);
                  }}
                >
                  Start Learning for Free
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    onOpenAuth?.('login');
                    setMobileMenuOpen(false);
                  }}
                >
                  Log In
                </Button>
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
};
