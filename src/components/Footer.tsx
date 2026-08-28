import React, { useState } from 'react';
import { TabType } from '../types';
import { ChpmtLogo } from './ChpmtLogo';
import { Mail, MapPin, Globe, Share2, Phone, ShieldCheck, Send, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="w-full bg-[#1b2e29] text-white pt-16 pb-12 mt-10 rounded-t-[2.5rem] md:rounded-t-[3.5rem] border-t border-[#2e4740]">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-8 md:px-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10 text-left">
          
          {/* Col 1: Brand & Mission (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
              id="footer-brand-logo"
            >
              <div className="bg-white px-4 py-2.5 rounded-2xl inline-block shadow-sm group-hover:bg-emerald-50/20 transition-colors">
                <ChpmtLogo variant="full" height={42} />
              </div>
            </button>

            <p className="text-sm text-[#c2d9d1] leading-relaxed max-w-sm">
              Inovação médica de ponta, cuidados humanizados e uma equipa clínica de referência nacional e internacional ao serviço da sua saúde em Angola.
            </p>

            {/* Newsletter Subscription */}
            <div className="w-full max-w-sm mt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d5e7e1] block mb-2 font-mono">
                Receba Artigos de Saúde & Novidades
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs font-semibold text-[#a8d5c8] bg-[#29423b] p-3 rounded-2xl border border-[#45645a]">
                  <CheckCircle2 className="w-4 h-4 text-[#a8d5c8]" />
                  <span>Obrigado por subscrever a nossa newsletter institucional!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex items-center gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="O seu e-mail institucional ou pessoal"
                    className="w-full px-4 py-2.5 bg-white/10 rounded-full border border-white/20 focus:border-[#45645a] text-white text-xs placeholder-white/50 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#45645a] hover:bg-[#344d45] text-white text-xs font-bold rounded-full transition-colors flex items-center gap-1.5 shrink-0 shadow-xs"
                  >
                    <span>Subscrever</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Especialidades (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-base font-bold text-white tracking-tight mb-2 font-mono">
              Especialidades Clínicas
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#c2d9d1]">
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-white transition-colors text-left">
                  Cardiologia & Hemodinâmica
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-white transition-colors text-left">
                  Nefrologia & Centro de Diálise
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-white transition-colors text-left">
                  Oncologia & Quimioterapia
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-white transition-colors text-left">
                  Cirurgia Robótica (Da Vinci Xi)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-white transition-colors text-left">
                  Neurocirurgia & AVC
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-white transition-colors text-left">
                  Pediatria & Maternidade
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navegação Rápida (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-base font-bold text-white tracking-tight mb-2 font-mono">
              Institucional
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#c2d9d1]">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors text-left">
                  Início
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors text-left">
                  Sobre Nós & Missão
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('doctors')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Corpo Clínico
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('blog')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Blog & Artigos Clínicos
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-white transition-colors text-left">
                  Exames & Diagnóstico
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => {
                    setActiveTab('home');
                    setTimeout(() => {
                      const el = document.getElementById('contacto');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }} 
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Contactos & Marcações
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacto Direto (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-base font-bold text-white tracking-tight mb-2 font-mono">
              Contactos
            </h4>
            <div className="flex flex-col gap-3 text-xs text-[#c2d9d1]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#7a2230] shrink-0 mt-0.5" />
                <span>Morro Bento, Luanda, Angola</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#45645a] shrink-0" />
                <a href="tel:+244943041067" className="hover:text-white underline">
                  +244 943 041 067
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#45645a] shrink-0" />
                <a href="mailto:info@chpedale.com" className="hover:text-white underline">
                  info@chpedale.com
                </a>
              </div>
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10 text-[#d48b95] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#d48b95] shrink-0" />
                <span>Pronto Atendimento 24 Horas</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-[#9bb8ae] gap-4">
          <p>© {new Date().getFullYear()} Complexo Hospitalar de Doenças Cardio-Pulmonares Cardeal Dom Alexandre do Nascimento (CHPMT).</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-[#45645a]" />
              <span>Luanda (AO)</span>
            </span>
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Partilhar Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

