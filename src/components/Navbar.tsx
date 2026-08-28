import React, { useState } from 'react';
import { TabType } from '../types';
import { ChpmtLogo } from './ChpmtLogo';
import { Menu, X, User, CheckCircle2, Calendar, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAuth,
  user,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: TabType; label: string; ptLabel: string }[] = [
    { id: 'home', label: 'Home', ptLabel: 'Início' },
    { id: 'about', label: 'About', ptLabel: 'Sobre Nós' },
    { id: 'services', label: 'Services', ptLabel: 'Especialidades' },
    { id: 'doctors', label: 'Appointments', ptLabel: 'Agendamentos' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-3 sm:px-6 md:px-8 py-3 bg-[#f6f9f8]/90 backdrop-blur-md transition-all">
      <div className="max-w-[1320px] mx-auto bg-white/95 backdrop-blur-md rounded-full px-4 sm:px-8 py-2.5 shadow-[0_4px_20px_rgba(40,62,55,0.06)] border border-[#d2e2dc] flex items-center justify-between">
        {/* Official Hospital Brand Logo */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          id="nav-brand-logo"
        >
          <ChpmtLogo variant="full" height={42} className="group-hover:opacity-90 transition-opacity" />
        </button>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-[#40544d]" id="desktop-nav-links">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                id={`nav-link-${item.id}`}
                className={`relative py-1.5 transition-colors ${
                  isActive ? 'text-[#283e37] font-bold' : 'hover:text-[#7a2230]'
                }`}
              >
                {item.ptLabel}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#45645a] rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('home');
              setTimeout(() => {
                const el = document.getElementById('contacto');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="py-1.5 transition-colors hover:text-[#7a2230]"
          >
            Contactos
          </a>
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eaf2ef] border border-[#c2d9d1] text-xs font-semibold text-[#283e37]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#45645a]" />
                <span>{user.name.split(' ')[0]}</span>
              </div>
              <button
                onClick={onLogout}
                className="text-xs text-[#728a9c] hover:text-[#7a2230] transition-colors font-medium px-1"
              >
                Sair
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth('login')}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-[#283e37] hover:bg-[#eaf2ef] rounded-full transition-colors"
            >
              <User className="w-4 h-4 text-[#7a2230]" />
              <span>Acesso</span>
            </button>
          )}

          {/* Book Appointment CTA button */}
          <button
            onClick={() => setActiveTab('doctors')}
            className="flex items-center gap-2 px-6 py-2.5 text-[14px] font-bold bg-[#45645a] hover:bg-[#344d45] text-white rounded-full transition-all duration-200 shadow-[0_4px_14px_rgba(69,100,90,0.3)] hover:shadow-[0_6px_20px_rgba(69,100,90,0.4)] active:scale-95"
            id="nav-book-appointment-btn"
          >
            <Calendar className="w-4 h-4 text-[#d7e6e0]" />
            <span>Agendar Consulta</span>
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setActiveTab('doctors')}
            className="px-3.5 py-1.5 text-xs font-bold bg-[#45645a] text-white rounded-full md:hidden"
          >
            Agendar
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#283e37] hover:bg-[#eaf2ef] rounded-full transition-colors"
            id="mobile-menu-toggle"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mt-2 bg-white rounded-3xl p-6 shadow-xl border border-[#d2e2dc]"
          >
            <div className="flex flex-col gap-3 text-[15px] font-semibold">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left py-2.5 px-4 rounded-xl transition-colors ${
                    activeTab === item.id
                      ? 'bg-[#eaf2ef] text-[#283e37] font-bold'
                      : 'text-[#40544d] hover:bg-[#f6f9f8]'
                  }`}
                >
                  {item.ptLabel}
                </button>
              ))}

              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('home');
                  setMobileMenuOpen(false);
                  setTimeout(() => {
                    const el = document.getElementById('contacto');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="text-left py-2.5 px-4 rounded-xl text-[#40544d] hover:bg-[#f6f9f8]"
              >
                Contactos
              </a>

              <div className="pt-4 border-t border-[#d2e2dc] flex flex-col gap-3">
                {user ? (
                  <div className="flex items-center justify-between py-2 px-2">
                    <span className="text-sm text-[#283e37]">Olá, {user.name}</span>
                    <button onClick={onLogout} className="text-sm text-[#7a2230] font-bold">
                      Sair
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onOpenAuth('login');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 text-center font-bold text-sm border border-[#283e37] text-[#283e37] rounded-full"
                  >
                    Entrar no Portal
                  </button>
                )}
                <button
                  onClick={() => {
                    setActiveTab('doctors');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 text-center font-bold text-sm bg-[#45645a] text-white rounded-full shadow-md hover:bg-[#344d45]"
                >
                  Agendar Consulta Agora
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
