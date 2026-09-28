import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup' | 'forgot';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signup',
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  const [name, setName] = useState('Hari Charan');
  const [email, setEmail] = useState('haricharanadusumalli@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [resetSent, setResetSent] = useState(false);

  const { login, signup } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signup') {
      signup(name, email);
      onClose();
    } else if (mode === 'login') {
      login(email, name);
      onClose();
    } else {
      setResetSent(true);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        mode === 'signup'
          ? 'Create your free account'
          : mode === 'login'
          ? 'Welcome back to Grow With Code'
          : 'Reset your password'
      }
      description={
        mode === 'signup'
          ? 'Free forever. Master programming from fundamentals to interview readiness.'
          : mode === 'login'
          ? 'Sign in to resume your lessons, problems, and arena streaks.'
          : 'Enter your email address to receive password reset instructions.'
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        {mode === 'signup' && (
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Hari Charan"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {mode !== 'forgot' && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-slate-300">
                Password
              </label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-xs text-emerald-400 hover:text-emerald-300 cursor-pointer"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        )}

        {mode === 'forgot' && resetSent && (
          <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-lg text-xs text-emerald-300">
            A password reset link was dispatched to {email}. Follow the instructions in the email.
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
        >
          {mode === 'signup'
            ? 'Continue to Onboarding'
            : mode === 'login'
            ? 'Sign In'
            : 'Send Reset Link'}
        </Button>

        {/* Prototype architecture footnote */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>Prototype state (Prepared for Supabase Auth)</span>
          </div>

          <div>
            {mode === 'signup' ? (
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-emerald-400 hover:underline cursor-pointer"
              >
                Already have an account?
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-emerald-400 hover:underline cursor-pointer"
              >
                Need an account? Sign Up
              </button>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
};
