import React, { useState } from 'react';
import { ChpmtLogo } from './ChpmtLogo';
import { X, Mail, Lock, User, Shield, CheckCircle } from 'lucide-react';

interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
  onSuccess: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ mode: initialMode, onClose, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (mode === 'register' && !name)) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    const finalName = mode === 'register' ? name : email.split('@')[0].toUpperCase();
    onSuccess({ name: finalName, email });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 border border-[#d2e2dc] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-[#556963] hover:text-[#172621] hover:bg-[#eaf2ef] rounded-full transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Official Brand Logo */}
        <div className="flex justify-center mb-5">
          <ChpmtLogo variant="compact" height={38} />
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#d2e2dc] mb-6">
          <button
            onClick={() => setMode('login')}
            className={`pb-3 font-mono text-sm flex-1 text-center transition-colors border-b-2 ${
              mode === 'login'
                ? 'border-[#45645a] text-[#45645a] font-bold'
                : 'border-transparent text-[#556963] hover:text-[#172621]'
            }`}
          >
            Portal do Utente (Entrar)
          </button>
          <button
            onClick={() => setMode('register')}
            className={`pb-3 font-mono text-sm flex-1 text-center transition-colors border-b-2 ${
              mode === 'register'
                ? 'border-[#45645a] text-[#45645a] font-bold'
                : 'border-transparent text-[#556963] hover:text-[#172621]'
            }`}
          >
            Criar Conta (Registo)
          </button>
        </div>

        <h3 className="text-xl font-bold text-[#172621] mb-1">
          {mode === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta no CHPMT'}
        </h3>
        <p className="text-xs text-[#40544d] mb-6">
          {mode === 'login'
            ? 'Aceda aos seus relatórios de exames, histórico de consultas e telemedicina.'
            : 'Registe-se para agendamentos rápidos e acesso ao prontuário eletrónico.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs text-[#40544d] mb-1 font-medium">Nome Completo</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#556963]" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#f6f9f8] border border-[#c2d9d1] rounded-xl text-sm text-[#172621] focus:border-[#45645a] outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs text-[#40544d] mb-1 font-medium">E-mail</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#556963]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full pl-9 pr-3 py-2.5 bg-[#f6f9f8] border border-[#c2d9d1] rounded-xl text-sm text-[#172621] focus:border-[#45645a] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#40544d] mb-1 font-medium">Senha</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#556963]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-[#f6f9f8] border border-[#c2d9d1] rounded-xl text-sm text-[#172621] focus:border-[#45645a] outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#45645a] text-white font-mono text-sm font-bold rounded-xl hover:bg-[#344d45] transition-colors shadow-xs mt-2"
          >
            {mode === 'login' ? 'Entrar no Portal' : 'Concluir Registo'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#d2e2dc] text-center">
          <p className="text-xs text-[#556963]">
            {mode === 'login' ? 'Ainda não tem conta?' : 'Já possui conta?'}
            <button
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="ml-1 text-[#7a2230] font-bold hover:underline font-mono"
            >
              {mode === 'login' ? 'Registe-se aqui' : 'Faça login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
