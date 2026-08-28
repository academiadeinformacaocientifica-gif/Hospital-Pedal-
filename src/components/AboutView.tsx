import React from 'react';
import { TabType } from '../types';
import { HOSPITAL_IMAGES } from '../data/hospitalData';
import { ChpmtLogo } from './ChpmtLogo';
import { 
  ShieldCheck, 
  Award, 
  Leaf, 
  BookOpen, 
  ArrowRight,
  Building2,
  Stethoscope,
  HeartHandshake,
  Target,
  Eye,
  Heart
} from 'lucide-react';

interface AboutViewProps {
  setActiveTab: (tab: TabType) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ setActiveTab }) => {
  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <section className="py-16 md:py-20 px-4 sm:px-8 md:px-12 max-w-[1280px] mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-[#d2e2dc]">
            <ChpmtLogo variant="full" height={52} />
          </div>
        </div>

        <h1 className="text-[36px] sm:text-[44px] md:text-[52px] font-bold text-[#172621] tracking-tight mb-4 max-w-3xl mx-auto leading-tight">
          Excelência e Humanização em Saúde
        </h1>

        <p className="text-[16px] md:text-[18px] text-[#40544d] max-w-3xl mx-auto leading-relaxed font-normal mb-12">
          No Complexo Hospitalar de Doenças Cardio-Pulmonares Cardeal Dom Alexandre do Nascimento (CHPMT), aliamos medicina de alta complexidade, tecnologia diagnóstica de última geração e acolhimento humano para servir Angola com rigor ético e clínico.
        </p>

        {/* Hospital Building Image */}
        <div className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-lg border border-[#d2e2dc] bg-[#eaf2ef] relative group">
          <img
            alt="Fachada Principal do Complexo Hospitalar Cardeal Dom Alexandre do Nascimento"
            className="w-full h-auto max-h-[480px] object-cover group-hover:scale-[1.01] transition-transform duration-700"
            src={HOSPITAL_IMAGES.hospitalBuilding}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between text-white text-left gap-2">
            <div>
              <p className="font-bold text-lg">Complexo Hospitalar Cardeal Dom Alexandre do Nascimento</p>
              <p className="text-xs font-mono text-white/80">Campus Hospitalar Integrado • Luanda, Angola</p>
            </div>
            <span className="bg-[#7a2230]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-white border border-white/20 font-bold">
              Atendimento Permanente 24/7
            </span>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores (3 Cards) */}
      <section className="py-12 md:py-16 px-4 sm:px-8 md:px-12 max-w-[1280px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Missão */}
          <div className="bg-white rounded-2xl p-8 border border-[#d2e2dc] shadow-sm flex flex-col justify-start hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#eaf2ef] flex items-center justify-center mb-6 text-[#45645a]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-[24px] font-bold text-[#172621] tracking-tight mb-3">
              Missão
            </h3>
            <p className="text-[15px] text-[#40544d] leading-relaxed">
              Proporcionar cuidados de saúde de excelência em medicina de alta complexidade cardio-pulmonar e especialidades afins, com rigor clínico e respeito incondicional pela vida.
            </p>
          </div>

          {/* Visão */}
          <div className="bg-white rounded-2xl p-8 border border-[#d2e2dc] shadow-sm flex flex-col justify-start hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#eaf2ef] flex items-center justify-center mb-6 text-[#45645a]">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-[24px] font-bold text-[#172621] tracking-tight mb-3">
              Visão
            </h3>
            <p className="text-[15px] text-[#40544d] leading-relaxed">
              Ser o polo de referência nacional e internacional em assistência hospitalar, inovação biomédica e formação clínica contínua na região da África Austral.
            </p>
          </div>

          {/* Valores */}
          <div className="bg-white rounded-2xl p-8 border border-[#d2e2dc] shadow-sm flex flex-col justify-start hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#f8e9eb] flex items-center justify-center mb-6 text-[#7a2230]">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-[24px] font-bold text-[#172621] tracking-tight mb-3">
              Valores
            </h3>
            <p className="text-[15px] text-[#40544d] leading-relaxed">
              Humanização, Rigor Deontológico, Inovação Tecnológica, Sustentabilidade e Segurança Inegociável do Paciente em todos os momentos de assistência.
            </p>
          </div>
        </div>
      </section>

      {/* Hospital Pillars */}
      <section className="bg-[#f0f6f4] py-16 px-4 sm:px-8 md:px-12 mt-8 border-y border-[#d2e2dc]">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[28px] md:text-[36px] font-bold text-[#172621] tracking-tight mb-2">
              Pilares Institucionais do CHPMT
            </h2>
            <p className="text-[15px] text-[#40544d] max-w-xl mx-auto">
              Compromisso com a excelência clínica, segurança e padrões internacionais de governança hospitalar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#d2e2dc] text-center shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#eaf2ef] text-[#45645a] flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#172621] mb-1">Qualidade & Segurança</h4>
              <p className="text-xs text-[#40544d]">Protocolos certificados de biossegurança e farmacovigilância de padrão internacional.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#d2e2dc] text-center shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#eaf2ef] text-[#45645a] flex items-center justify-center mx-auto mb-3">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#172621] mb-1">Cuidado Multidisciplinar</h4>
              <p className="text-xs text-[#40544d]">Equipa médica e multiprofissional integrada no acompanhamento contínuo do doente.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#d2e2dc] text-center shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#eaf2ef] text-[#45645a] flex items-center justify-center mx-auto mb-3">
                <Leaf className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#172621] mb-1">Eco-Eficiência</h4>
              <p className="text-xs text-[#40544d]">Gestão responsável de resíduos hospitalares e infraestrutura com alta eficiência energética.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#d2e2dc] text-center shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#eaf2ef] text-[#45645a] flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#172621] mb-1">Ensino & Investigação</h4>
              <p className="text-xs text-[#40544d]">Apoio à formação médica contínua, estágios e desenvolvimento de ensaios e protocolos.</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setActiveTab('doctors')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#45645a] text-white rounded-xl font-mono text-sm font-bold hover:bg-[#344d45] transition-colors shadow-sm"
            >
              Conheça Nossa Equipa Médica
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
