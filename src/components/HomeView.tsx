import React, { useState } from 'react';
import { TabType, Doctor, ServiceItem } from '../types';
import { HOSPITAL_IMAGES, DOCTORS, SERVICES_LIST } from '../data/hospitalData';
import {
  Calendar,
  Phone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  HeartPulse,
  Stethoscope,
  Activity,
  User,
  Clock,
  Search,
  MessageSquare,
  Pill,
  FlaskConical,
  PhoneCall,
  ChevronRight,
  Send,
  Star,
  Users,
  Award,
  MapPin,
  Smile,
  Shield
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomeViewProps {
  setActiveTab: (tab: TabType) => void;
  onSelectDoctorToBook: (doctor: Doctor) => void;
  onSelectService: (service: ServiceItem) => void;
  onQuickSearch: (specialty: string, location: string, date: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setActiveTab,
  onSelectDoctorToBook,
  onSelectService,
  onQuickSearch,
}) => {
  // Contact form state
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formService, setFormService] = useState('Consulta Geral');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quick doctor recommendation list (first 4)
  const featuredDoctors = DOCTORS.slice(0, 4);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setTimeout(() => {
        setFormName('');
        setFormPhone('');
        setFormMessage('');
        setFormSubmitted(false);
      }, 5000);
    }, 800);
  };

  return (
    <div className="w-full flex flex-col gap-16 md:gap-24 pb-16 px-3 sm:px-6 md:px-8 max-w-[1320px] mx-auto">
      
      {/* 1. HERO SECTION - Complexo Hospitalar do Pedalé */}
      <section className="relative w-full mt-2">
        <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden min-h-[460px] sm:min-h-[500px] md:min-h-[540px] flex items-center shadow-[0_15px_40px_rgba(23,38,33,0.18)] bg-[#172621]">
          {/* Background Real Building Facade Photo */}
          <div className="absolute inset-0 z-0">
            <img
              src={HOSPITAL_IMAGES.hospitalBuilding}
              alt="Fachada Central do Complexo Hospitalar General de Exército Pedro Maria Tonha Pedalé"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {/* Cinematic Gradient Overlays for High Legibility & Architectural Visibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#111c18]/95 via-[#111c18]/80 to-[#111c18]/40 md:via-[#111c18]/70 md:to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#111c18]/85 via-transparent to-black/35"></div>
          </div>

          {/* Hero Content Overlay */}
          <div className="relative z-10 w-full p-6 sm:p-10 md:p-14 lg:p-16 text-left max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start"
            >
              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.12] text-white tracking-tight mb-4 uppercase">
                Complexo Hospitalar do Pedalé
              </h1>

              {/* Subtitle / Secondary Title */}
              <p className="text-base sm:text-lg md:text-xl text-[#eaf2ef] leading-relaxed mb-8 max-w-2xl font-normal">
                Unidade hospitalar de referência nacional em Nefrologia, Cardiologia e Neurociência
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => setActiveTab('doctors')}
                  className="px-7 py-3.5 bg-[#801b33] hover:bg-[#681428] text-white font-medium text-[15px] rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2"
                >
                  <span>Agendar Consulta</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveTab('services')}
                  className="px-6 py-3.5 bg-white/15 hover:bg-white/25 text-white font-medium text-[15px] rounded-xl backdrop-blur-sm border border-white/20 transition-all flex items-center gap-2"
                >
                  <span>Ver Especialidades</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 3 Floating Action Cards (Logo Palette Tints) */}
        <div className="mt-6 md:-mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-6 relative z-20">
          {/* Card 1: Logo Sage Green */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveTab('doctors')}
            className="bg-[#d7e6e0] p-6 sm:p-7 rounded-3xl cursor-pointer border border-[#c2d9d1] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              <h3 className="text-xl font-bold text-[#1b2b26] mb-1">
                Consulta Online & Presencial
              </h3>
              <p className="text-sm text-[#384e46] leading-relaxed">
                Agendamento instantâneo com médicos especialistas de referência.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#283e37]">Agendar Agora</span>
              <div className="w-9 h-9 rounded-full bg-[#283e37] text-white flex items-center justify-center group-hover:bg-[#45645a] transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          {/* Card 2: Logo Wine / Rose Tint */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveTab('services')}
            className="bg-[#faecee] p-6 sm:p-7 rounded-3xl cursor-pointer border border-[#ebd0d5] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              <h3 className="text-xl font-bold text-[#54141e] mb-1">
                Farmácia & Medicamentos
              </h3>
              <p className="text-sm text-[#6e232f] leading-relaxed">
                Gestão de receitas digitais e apoio farmacêutico hospitalar integrado.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7a2230]">Ver Detalhes</span>
              <div className="w-9 h-9 rounded-full bg-[#7a2230] text-white flex items-center justify-center group-hover:bg-[#962e3f] transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          {/* Card 3: Logo Soft Slate / Mint */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveTab('services')}
            className="bg-[#e4eee9] p-6 sm:p-7 rounded-3xl cursor-pointer border border-[#cddfd7] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              <h3 className="text-xl font-bold text-[#233a33] mb-1">
                Serviços de Laboratório
              </h3>
              <p className="text-sm text-[#3f5750] leading-relaxed">
                Exames clínicos de alta precisão, ressonância 3T e diagnósticos rápidos.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#45645a]">Consultar Exames</span>
              <div className="w-9 h-9 rounded-full bg-[#233a33] text-white flex items-center justify-center group-hover:bg-[#45645a] transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. SECTION 2 - "Somos mais do que um hospital; somos o seu parceiro dedicado na saúde" */}
      <section className="py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: 4-image collage / mosaic grid */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden shadow-md aspect-[4/5] bg-[#eaf2ef]">
                <img
                  src={HOSPITAL_IMAGES.collageDoctor1}
                  alt="Dra. Especialista do Hospital Pedalé"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-md aspect-square bg-[#d7e6e0]">
                <img
                  src={HOSPITAL_IMAGES.collageDoctor2}
                  alt="Médico Cirurgião em Consulta"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="rounded-3xl overflow-hidden shadow-md aspect-square bg-[#faecee]">
                <img
                  src={HOSPITAL_IMAGES.collageDoctor3}
                  alt="Equipa Médica Multidisciplinar"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-md aspect-[4/5] bg-[#e4eee9]">
                <img
                  src={HOSPITAL_IMAGES.collageDoctor4}
                  alt="Profissional de Enfermagem Dedicada"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Strong Value Statement */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            <h2 className="text-3xl sm:text-4xl md:text-[40px] font-extrabold text-[#172621] leading-[1.2] mb-6 tracking-tight">
              Somos mais do que um hospital; somos o seu parceiro dedicado na saúde.
            </h2>
            
            <p className="text-base sm:text-lg text-[#40544d] leading-relaxed mb-4">
              O Complexo Hospitalar de Doenças Cardio-Pulmonares Cardeal Dom Alexandre do Nascimento (CHPMT) nasceu com um compromisso claro: prestar cuidados de saúde de elevada complexidade com rigor ético, excelência clínica e dedicação ao cidadão.
            </p>
            
            <p className="text-[15px] text-[#556963] leading-relaxed mb-8">
              Contamos com uma equipa multidisciplinar de médicos especialistas, cirurgiões robóticos certificados, enfermeiros altamente qualificados e tecnologia de diagnóstico avançado em Luanda.
            </p>

            <div className="grid grid-cols-2 gap-4 w-full mb-8 pt-4 border-t border-[#d2e2dc]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#d7e6e0] flex items-center justify-center text-[#283e37]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#172621] text-base">Alta Complexidade</h4>
                  <p className="text-xs text-[#556963]">Padrão de Excelência Hospitalar</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#faecee] flex items-center justify-center text-[#7a2230]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#172621] text-base">Corpo Clínico Integrado</h4>
                  <p className="text-xs text-[#556963]">Mais de 50 Especialidades</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('about')}
              className="px-7 py-3.5 bg-[#45645a] hover:bg-[#344d45] text-white font-bold text-sm rounded-full transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center gap-2"
            >
              <span>Conhecer a Instituição</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 3. SECTION 3 - "Cuidados Abrangentes para Todas as Fases da Vida" (4 Pastel Cards) */}
      <section className="py-6 sm:py-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172621] tracking-tight mb-3">
            Cuidados Abrangentes para Todas as Fases da Vida
          </h2>
          <p className="text-base text-[#40544d]">
            Desde a prevenção primária e medicina familiar até às intervenções cirúrgicas de máxima complexidade.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: General Consultation */}
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl border border-[#d2e2dc] p-6 shadow-[0_4px_20px_rgba(40,62,55,0.04)] flex flex-col justify-between hover:shadow-xl transition-all"
          >
            <div>
              <div className="w-full bg-[#d7e6e0] rounded-2xl p-4 flex items-center gap-3 mb-5 text-[#1b2b26]">
                <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-[#283e37]" />
                </div>
                <span className="font-bold text-sm">Clínica Geral</span>
              </div>

              <h3 className="text-xl font-bold text-[#172621] mb-2">
                Consulta Geral
              </h3>
              <p className="text-sm text-[#556963] leading-relaxed mb-6">
                Orientação clínica atenta e dedicada para todas as necessidades diárias de saúde da sua família.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('doctors')}
              className="w-full py-2.5 px-4 rounded-full border border-[#d2e2dc] hover:border-[#45645a] hover:text-[#45645a] text-[#40544d] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Saber Mais</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          {/* Card 2: Preventive Care */}
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl border border-[#d2e2dc] p-6 shadow-[0_4px_20px_rgba(40,62,55,0.04)] flex flex-col justify-between hover:shadow-xl transition-all"
          >
            <div>
              <div className="w-full bg-[#faecee] rounded-2xl p-4 flex items-center gap-3 mb-5 text-[#54141e]">
                <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#7a2230]" />
                </div>
                <span className="font-bold text-sm">Prevenção</span>
              </div>

              <h3 className="text-xl font-bold text-[#172621] mb-2">
                Cuidados Preventivos
              </h3>
              <p className="text-sm text-[#556963] leading-relaxed mb-6">
                Rastreios precoces, programas de vacinação e check-ups integrados de saúde cardiovascular e metabólica.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('services')}
              className="w-full py-2.5 px-4 rounded-full border border-[#d2e2dc] hover:border-[#7a2230] hover:text-[#7a2230] text-[#40544d] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Saber Mais</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          {/* Card 3: Emergency Support */}
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl border border-[#d2e2dc] p-6 shadow-[0_4px_20px_rgba(40,62,55,0.04)] flex flex-col justify-between hover:shadow-xl transition-all"
          >
            <div>
              <div className="w-full bg-[#eaf2ef] rounded-2xl p-4 flex items-center gap-3 mb-5 text-[#1b2b26]">
                <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                  <PhoneCall className="w-5 h-5 text-[#45645a]" />
                </div>
                <span className="font-bold text-sm">Emergência 24h</span>
              </div>

              <h3 className="text-xl font-bold text-[#172621] mb-2">
                Suporte de Urgência
              </h3>
              <p className="text-sm text-[#556963] leading-relaxed mb-6">
                Assistência contínua com equipa de plantão presencial, sala de choque e Linha Verde AVC imediata.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('services')}
              className="w-full py-2.5 px-4 rounded-full border border-[#d2e2dc] hover:border-[#45645a] hover:text-[#45645a] text-[#40544d] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Saber Mais</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          {/* Card 4: Specialist Visits */}
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl border border-[#d2e2dc] p-6 shadow-[0_4px_20px_rgba(40,62,55,0.04)] flex flex-col justify-between hover:shadow-xl transition-all"
          >
            <div>
              <div className="w-full bg-[#faecee] rounded-2xl p-4 flex items-center gap-3 mb-5 text-[#54141e]">
                <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                  <HeartPulse className="w-5 h-5 text-[#7a2230]" />
                </div>
                <span className="font-bold text-sm">Especialidades</span>
              </div>

              <h3 className="text-xl font-bold text-[#172621] mb-2">
                Visitas de Especialistas
              </h3>
              <p className="text-sm text-[#556963] leading-relaxed mb-6">
                Acesso direto a médicos líderes em Nefrologia, Cardiologia, Neurocirurgia, Oncologia e Cirurgia Robótica.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('doctors')}
              className="w-full py-2.5 px-4 rounded-full border border-[#d2e2dc] hover:border-[#7a2230] hover:text-[#7a2230] text-[#40544d] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Saber Mais</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 4. SECTION 4 - "Como Funciona o Atendimento" ("How It Works") */}
      <section className="py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Family consultation image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[420px] rounded-3xl overflow-hidden shadow-2xl border border-[#d2e2dc] bg-white">
              <img
                src={HOSPITAL_IMAGES.familyConsultation}
                alt="Consulta Médica com Família no Complexo Hospitalar do Pedalé"
                className="w-full h-full object-cover aspect-[4/5] hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#233a33]/85 via-transparent to-transparent flex flex-col justify-end p-6 text-white text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-[#d7e6e0] mb-1">Experiência Humanizada</span>
                <p className="text-lg font-bold">Acolhimento de excelência para si e para os seus entes queridos.</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Stepped 4 Floating Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172621] tracking-tight mb-8">
              Como Funciona o Nosso Atendimento
            </h2>

            <div className="flex flex-col gap-4 w-full">
              {/* Step 1 */}
              <motion.div 
                whileHover={{ x: 6 }}
                className="bg-white rounded-2xl p-5 border border-[#d2e2dc] shadow-xs hover:shadow-md transition-all flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#eaf2ef] flex items-center justify-center text-[#45645a] shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#172621]">1. Agendamento Online</h3>
                  <p className="text-sm text-[#556963]">Marque a sua consulta ou exame em poucos minutos através do nosso portal institucional.</p>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div 
                whileHover={{ x: 6 }}
                className="bg-white rounded-2xl p-5 border border-[#d2e2dc] shadow-xs hover:shadow-md transition-all flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#faecee] flex items-center justify-center text-[#7a2230] shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#172621]">2. Consulta Especializada</h3>
                  <p className="text-sm text-[#556963]">Consulte presencialmente nas nossas instalações em Luanda ou por telemedicina segura.</p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div 
                whileHover={{ x: 6 }}
                className="bg-white rounded-2xl p-5 border border-[#d2e2dc] shadow-xs hover:shadow-md transition-all flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#d7e6e0] flex items-center justify-center text-[#283e37] shrink-0">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#172621]">3. Diagnóstico e Tratamento</h3>
                  <p className="text-sm text-[#556963]">Exames laboratoriais e planos clínicos formulados com rigor ético e precisão técnica.</p>
                </div>
              </motion.div>

              {/* Step 4 */}
              <motion.div 
                whileHover={{ x: 6 }}
                className="bg-white rounded-2xl p-5 border border-[#d2e2dc] shadow-xs hover:shadow-md transition-all flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#faecee] flex items-center justify-center text-[#7a2230] shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#172621]">4. Acompanhamento Contínuo</h3>
                  <p className="text-sm text-[#556963]">Monitorização pós-consulta, reavaliações periódicas e apoio permanente ao paciente.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. SECTION 5 - "Fale Connosco Hoje!" Contact & Quick Booking Card */}
      <section id="contacto" className="py-6 sm:py-10">
        <div className="bg-gradient-to-br from-[#eaf2ef] via-[#f3f7f5] to-[#e0ede7] rounded-3xl p-6 sm:p-10 md:p-14 border border-[#c2d9d1] shadow-xs relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Form (7 cols) */}
            <div className="lg:col-span-7 flex flex-col text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172621] tracking-tight mb-3">
                Contacto e Apoio ao Paciente
              </h2>
              <p className="text-base text-[#40544d] mb-8">
                Preencha os seus dados para esclarecer dúvidas sobre os serviços clínicos ou solicitar informações da equipa hospitalar.
              </p>

              {formSubmitted ? (
                <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl border border-[#45645a] text-center shadow-lg animate-in fade-in zoom-in">
                  <div className="w-14 h-14 rounded-full bg-[#d7e6e0] text-[#283e37] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#172621] mb-2">Pedido Recebido com Sucesso!</h3>
                  <p className="text-sm text-[#556963]">
                    A nossa equipa de apoio ao paciente entrará em contacto consigo através do número fornecido o mais breve possível.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                  <div>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Nome Completo"
                      className="w-full px-5 py-3.5 bg-white/90 focus:bg-white rounded-2xl border border-[#c2d9d1] focus:border-[#45645a] text-[#172621] placeholder-[#79918a] focus:outline-none transition-all shadow-xs text-sm"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="Número de Telefone / WhatsApp (+244)"
                      className="w-full px-5 py-3.5 bg-white/90 focus:bg-white rounded-2xl border border-[#c2d9d1] focus:border-[#45645a] text-[#172621] placeholder-[#79918a] focus:outline-none transition-all shadow-xs text-sm"
                    />
                  </div>

                  <div>
                    <select
                      value={formService}
                      onChange={(e) => setFormService(e.target.value)}
                      className="w-full px-5 py-3.5 bg-white/90 focus:bg-white rounded-2xl border border-[#c2d9d1] focus:border-[#45645a] text-[#172621] focus:outline-none transition-all shadow-xs text-sm"
                    >
                      <option value="Consulta Geral">Consulta Geral</option>
                      <option value="Cardiologia Avançada">Cardiologia Avançada</option>
                      <option value="Nefrologia & Diálise">Nefrologia & Diálise</option>
                      <option value="Oncologia Integrada">Oncologia Integrada</option>
                      <option value="Ortopedia & Traumatologia">Ortopedia & Traumatologia</option>
                      <option value="Cirurgia Robótica">Cirurgia Robótica</option>
                      <option value="Pediatria">Pediatria</option>
                      <option value="Exames de Laboratório & Diagnóstico">Exames de Laboratório & Diagnóstico</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full sm:w-auto self-start px-8 py-4 bg-[#45645a] hover:bg-[#344d45] text-white font-bold text-sm rounded-full transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>A enviar pedido...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Enviar Pedido de Contacto</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Nurse Visual (5 cols) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[3/4] rounded-3xl overflow-hidden shadow-md border border-[#c2d9d1] bg-[#1b2e29]">
                <img
                  src={HOSPITAL_IMAGES.nurseContact}
                  alt="Profissional de Saúde do Complexo Hospitalar do Pedalé"
                  className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTION 6 - Featured Doctors Quick Booking Hub */}
      <section className="py-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172621] tracking-tight">
              Médicos Disponíveis para Agendamento
            </h2>
            <p className="text-sm text-[#556963] mt-1">Especialistas com disponibilidade para marcação imediata no CHPMT.</p>
          </div>
          <button
            onClick={() => setActiveTab('doctors')}
            className="text-sm font-bold text-[#45645a] hover:text-[#7a2230] flex items-center gap-1.5 self-start sm:self-auto transition-colors"
          >
            <span>Ver Todos os Médicos ({DOCTORS.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDoctors.map((doc) => (
            <motion.div
              key={doc.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl border border-[#d2e2dc] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-full aspect-[4/4.5] rounded-2xl overflow-hidden bg-[#eaf2ef] mb-4 relative">
                  <img
                    src={doc.avatarUrl}
                    alt={doc.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-[#172621]/80 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-mono font-medium text-white shadow-xs">
                    CHPMT
                  </div>
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-[#7a2230] block mb-1">
                  {doc.specialty}
                </span>
                <h3 className="text-lg font-bold text-[#172621] mb-1 leading-snug">
                  {doc.name}
                </h3>
                <p className="text-xs text-[#556963] mb-4">
                  {doc.role || 'Especialista Hospitalar'}
                </p>
              </div>

              <button
                onClick={() => onSelectDoctorToBook(doc)}
                className="w-full py-2.5 px-4 bg-[#eaf2ef] hover:bg-[#45645a] text-[#283e37] hover:text-white font-bold text-xs rounded-full transition-all flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Agendar Consulta</span>
              </button>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};
