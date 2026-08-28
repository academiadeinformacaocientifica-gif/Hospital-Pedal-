import React, { useState } from 'react';
import { TabType, ServiceItem, Doctor } from '../types';
import { SERVICES_LIST, DOCTORS } from '../data/hospitalData';
import { 
  Search, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Clock, 
  Users, 
  ShieldCheck,
  Stethoscope,
  HeartPulse,
  Activity,
  Heart,
  PhoneCall,
  FlaskConical
} from 'lucide-react';

interface ServicesViewProps {
  setActiveTab: (tab: TabType) => void;
  onSelectDoctorToBook: (doctor: Doctor) => void;
  selectedServiceModal: ServiceItem | null;
  setSelectedServiceModal: (service: ServiceItem | null) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  setActiveTab,
  onSelectDoctorToBook,
  selectedServiceModal,
  setSelectedServiceModal,
}) => {
  const [quickSpecialty, setQuickSpecialty] = useState('');
  const [quickDate, setQuickDate] = useState('');

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('doctors');
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'cardiologia':
        return <HeartPulse className="w-7 h-7" />;
      case 'nefrologia':
        return <Activity className="w-7 h-7" />;
      case 'oncologia':
        return <FlaskConical className="w-7 h-7" />;
      case 'ortopedia':
        return <Stethoscope className="w-7 h-7" />;
      case 'cirurgia-robotica':
        return <ShieldCheck className="w-7 h-7" />;
      case 'trauma24':
        return <Clock className="w-7 h-7" />;
      case 'pediatria':
        return <Heart className="w-7 h-7" />;
      default:
        return <Users className="w-7 h-7" />;
    }
  };

  // Find related doctors for the selected service modal
  const getRelatedDoctors = (service: ServiceItem) => {
    return DOCTORS.filter(
      (d) =>
        d.specialty.toLowerCase() === service.title.toLowerCase() ||
        (service.id === 'cirurgia-robotica' && d.specialty === 'Cirurgia Geral') ||
        (service.id === 'trauma24' && (d.specialty === 'Ortopedia' || d.specialty === 'Cirurgia Geral')) ||
        (service.id === 'digital-health')
    ).slice(0, 2);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Top Banner (CHPMT Slate Green) */}
      <section className="bg-[#45645a] py-16 px-4 sm:px-8 md:px-12 text-white text-center">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="text-[36px] sm:text-[44px] md:text-[48px] font-bold text-white tracking-tight mb-4">
            Especialidades e Serviços Clínicos
          </h1>
          <p className="text-[16px] md:text-[18px] text-[#e0ece8] max-w-2xl mx-auto opacity-95 leading-relaxed font-normal">
            Conheça as áreas de atuação do Complexo Hospitalar de Doenças Cardio-Pulmonares Cardeal Dom Alexandre do Nascimento (CHPMT), com assistência médica especializada e rigor clínico.
          </p>
        </div>
      </section>

      {/* Specialty Cards Grid */}
      <section className="py-16 md:py-20 px-4 sm:px-8 md:px-12 max-w-[1280px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-8 border border-[#d2e2dc] flex flex-col justify-between hover:shadow-[0px_10px_30px_rgba(40,62,55,0.08)] transition-all duration-300 group"
            >
              <div>
                {/* Service Icon */}
                <div className="w-14 h-14 rounded-2xl bg-[#eaf2ef] flex items-center justify-center mb-6 text-[#45645a] group-hover:bg-[#45645a] group-hover:text-white transition-all duration-300">
                  {getServiceIcon(service.id)}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[24px] font-bold text-[#172621] tracking-tight group-hover:text-[#45645a] transition-colors">
                    {service.title}
                  </h3>
                  <span className="text-xs font-mono text-[#7a2230] bg-[#f8e9eb] px-2.5 py-0.5 rounded-full font-semibold">
                    {service.category}
                  </span>
                </div>

                <p className="text-[15px] text-[#40544d] leading-relaxed mb-6">
                  {service.fullDescription}
                </p>

                {/* Key Procedures Preview */}
                <div className="space-y-1.5 mb-6 pt-2 border-t border-[#f6f9f8]">
                  {service.procedures.slice(0, 2).map((proc, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#556963]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#45645a] shrink-0" />
                      <span className="truncate">{proc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#f6f9f8]">
                <button
                  onClick={() => setSelectedServiceModal(service)}
                  className="w-full py-2.5 px-4 font-mono text-[14px] text-[#45645a] border border-[#45645a] rounded-xl hover:bg-[#45645a] hover:text-white transition-colors text-center font-semibold flex items-center justify-center gap-2"
                >
                  <span>Saber Mais</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Card "Precisa de uma Consulta?" */}
      <section className="px-4 sm:px-8 md:px-12 pb-20 max-w-[1280px] mx-auto w-full">
        <div className="bg-[#eaf2ef] rounded-3xl p-8 md:p-12 border border-[#c2d9d1] shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-[28px] md:text-[36px] font-bold text-[#172621] tracking-tight mb-2">
              Precisa de uma Consulta?
            </h2>
            <p className="text-[16px] text-[#40544d] max-w-xl mx-auto">
              Nossa equipa médica de referência está pronta para cuidar de si e da sua família com excelência e dedicação.
            </p>
          </div>

          <form
            onSubmit={handleQuickBook}
            className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-[#d2e2dc] flex flex-col md:flex-row items-center gap-4 max-w-4xl mx-auto"
          >
            <div className="w-full md:w-1/2 flex flex-col text-left">
              <label className="font-mono text-[12px] text-[#40544d] mb-1 font-medium">
                Especialidade Desejada
              </label>
              <div className="flex items-center border-b border-[#c2d9d1] focus-within:border-[#45645a] pb-1.5">
                <Search className="w-4 h-4 text-[#556963] mr-2 shrink-0" />
                <input
                  type="text"
                  value={quickSpecialty}
                  onChange={(e) => setQuickSpecialty(e.target.value)}
                  placeholder="Ex: Cardiologia, Pneumologia, Pediatria..."
                  className="w-full bg-transparent border-none p-0 text-[15px] text-[#172621] placeholder:text-[#556963] focus:outline-none"
                />
              </div>
            </div>

            <div className="w-full md:w-1/3 flex flex-col text-left">
              <label className="font-mono text-[12px] text-[#40544d] mb-1 font-medium">
                Data Sugerida
              </label>
              <div className="flex items-center border-b border-[#c2d9d1] focus-within:border-[#45645a] pb-1.5">
                <Calendar className="w-4 h-4 text-[#556963] mr-2 shrink-0" />
                <input
                  type="date"
                  value={quickDate}
                  onChange={(e) => setQuickDate(e.target.value)}
                  className="w-full bg-transparent border-none p-0 text-[14px] text-[#172621] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto bg-[#45645a] text-white font-mono text-[14px] px-8 py-3.5 rounded-xl hover:bg-[#344d45] transition-colors whitespace-nowrap font-semibold shadow-xs"
            >
              Agendar Agora
            </button>
          </form>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 border border-[#d2e2dc] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedServiceModal(null)}
              className="absolute top-5 right-5 p-2 text-[#556963] hover:text-[#172621] hover:bg-[#eaf2ef] rounded-full transition-colors"
              aria-label="Fechar"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-[#eaf2ef] text-[#45645a] flex items-center justify-center">
                {getServiceIcon(selectedServiceModal.id)}
              </div>
              <div>
                <span className="text-xs font-mono text-[#7a2230] bg-[#f8e9eb] px-2.5 py-0.5 rounded-full font-semibold">
                  {selectedServiceModal.category}
                </span>
                <h3 className="text-[26px] font-bold text-[#172621]">
                  {selectedServiceModal.title}
                </h3>
              </div>
            </div>

            <p className="text-[15px] text-[#40544d] leading-relaxed mb-6">
              {selectedServiceModal.fullDescription}
            </p>

            {/* Procedures and key benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#f6f9f8] p-4 rounded-2xl border border-[#d2e2dc]">
                <h4 className="font-mono text-xs font-bold text-[#45645a] uppercase mb-3 flex items-center gap-1.5">
                  <Stethoscope className="w-4 h-4" /> Procedimentos Principais
                </h4>
                <ul className="space-y-2">
                  {selectedServiceModal.procedures.map((proc, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#40544d]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#45645a] shrink-0 mt-0.5" />
                      <span>{proc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#f6f9f8] p-4 rounded-2xl border border-[#d2e2dc]">
                <h4 className="font-mono text-xs font-bold text-[#45645a] uppercase mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Diferenciais CHPMT
                </h4>
                <ul className="space-y-2">
                  {selectedServiceModal.keyBenefits.map((ben, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#40544d]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7a2230] shrink-0 mt-0.5" />
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Related Doctors */}
            <div className="border-t border-[#d2e2dc] pt-5 mb-6">
              <h4 className="font-mono text-xs font-bold text-[#172621] uppercase mb-3 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#45645a]" /> Especialistas Recomendados nesta Área
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {getRelatedDoctors(selectedServiceModal).map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-[#d2e2dc] bg-white hover:border-[#45645a] transition-colors"
                  >
                    <img
                      src={doc.avatarUrl}
                      alt={doc.name}
                      className="w-12 h-12 rounded-xl object-cover bg-[#eaf2ef]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-grow">
                      <p className="text-sm font-bold text-[#172621]">{doc.name}</p>
                      <p className="text-xs text-[#556963] font-mono">{doc.role || doc.specialty}</p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedServiceModal(null);
                        onSelectDoctorToBook(doc);
                      }}
                      className="text-xs font-mono bg-[#45645a] text-white px-3 py-1.5 rounded-lg hover:bg-[#344d45] font-semibold"
                    >
                      Agendar
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedServiceModal(null)}
                className="px-5 py-2.5 rounded-xl border border-[#c2d9d1] font-mono text-xs text-[#40544d] hover:bg-[#eaf2ef] font-semibold"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  setSelectedServiceModal(null);
                  setActiveTab('doctors');
                }}
                className="px-6 py-2.5 rounded-xl bg-[#45645a] text-white font-mono text-xs font-bold hover:bg-[#344d45]"
              >
                Ver Todos os Médicos desta Área
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
