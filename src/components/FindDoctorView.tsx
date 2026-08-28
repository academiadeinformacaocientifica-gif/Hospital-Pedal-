import React, { useState, useMemo } from 'react';
import { Doctor } from '../types';
import { DOCTORS } from '../data/hospitalData';
import { 
  Search, 
  Filter, 
  Star, 
  Calendar, 
  MapPin, 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  Baby, 
  Heart, 
  Activity, 
  Bone, 
  Brain, 
  Scissors,
  Check,
  RotateCcw
} from 'lucide-react';

interface FindDoctorViewProps {
  onSelectDoctorToBook: (doctor: Doctor) => void;
  initialSpecialtyFilter?: string;
}

export const FindDoctorView: React.FC<FindDoctorViewProps> = ({
  onSelectDoctorToBook,
  initialSpecialtyFilter,
}) => {
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    initialSpecialtyFilter ? [initialSpecialtyFilter] : ['Pediatria']
  );
  const [availability, setAvailability] = useState<'any' | 'today' | 'this_week'>('any');
  const [sortBy, setSortBy] = useState<'recommended' | 'earliest' | 'experience' | 'rating'>('recommended');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const specialtyOptions = [
    { name: 'Cardiologia', icon: Heart },
    { name: 'Oncologia', icon: Activity },
    { name: 'Ortopedia', icon: Bone },
    { name: 'Neurologia', icon: Brain },
    { name: 'Pediatria', icon: Baby },
    { name: 'Cirurgia Geral', icon: Scissors },
  ];

  const handleSpecialtyToggle = (spec: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSpecialties([]);
    setAvailability('any');
    setSortBy('recommended');
    setCurrentPage(1);
  };

  // Filtered and Sorted Doctors
  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = doc.name.toLowerCase().includes(query);
        const matchSpec = doc.specialty.toLowerCase().includes(query);
        const matchRole = doc.role?.toLowerCase().includes(query) ?? false;
        const matchLoc = doc.location.toLowerCase().includes(query);
        if (!matchName && !matchSpec && !matchRole && !matchLoc) return false;
      }

      // Specialty filter
      if (selectedSpecialties.length > 0) {
        if (!selectedSpecialties.includes(doc.specialty)) return false;
      }

      // Availability filter
      if (availability === 'today' && doc.availabilityType !== 'today') {
        return false;
      }
      if (availability === 'this_week' && doc.availabilityType === 'any_day') {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      if (sortBy === 'earliest') {
        if (a.availabilityType === 'today') return -1;
        if (b.availabilityType === 'today') return 1;
        return 0;
      }
      return b.reviewCount - a.reviewCount;
    });
  }, [searchQuery, selectedSpecialties, availability, sortBy]);

  // Paginated doctors
  const totalPages = Math.max(1, Math.ceil(filteredDoctors.length / itemsPerPage));
  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Dynamic heading based on filter
  const getHeadingText = () => {
    if (selectedSpecialties.length === 1) {
      if (selectedSpecialties[0] === 'Pediatria') {
        return `${filteredDoctors.length} Pediatricians Available`;
      }
      return `${filteredDoctors.length} Especialistas em ${selectedSpecialties[0]} Disponíveis`;
    }
    return `${filteredDoctors.length} Médicos Especialistas Disponíveis`;
  };

  return (
    <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-8 md:px-12 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-3 bg-white p-6 rounded-2xl border border-[#d2e2dc] h-fit sticky top-24 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#d2e2dc]">
            <h2 className="text-[20px] font-bold text-[#172621] flex items-center gap-2 tracking-tight">
              <Filter className="w-5 h-5 text-[#7a2230]" />
              <span>Filtros</span>
            </h2>
            {(selectedSpecialties.length > 0 || searchQuery || availability !== 'any') && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-mono text-[#7a2230] hover:underline flex items-center gap-1 font-semibold"
                title="Limpar todos os filtros"
              >
                <RotateCcw className="w-3 h-3" /> Limpar
              </button>
            )}
          </div>

          {/* Search Doctor */}
          <div className="mb-6">
            <label className="font-mono text-[12px] text-[#40544d] block mb-2 font-medium">
              Pesquisar Médico
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#556963]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Nome ou Especialidade..."
                className="w-full pl-9 pr-3 py-2 bg-[#f6f9f8] border border-[#c2d9d1] rounded-xl focus:border-[#45645a] focus:ring-1 focus:ring-[#45645a] text-[14px] text-[#172621] outline-none"
              />
            </div>
          </div>

          {/* Specialty Checkboxes */}
          <div className="mb-6 border-t border-[#d2e2dc] pt-5">
            <h3 className="font-mono text-[13px] font-semibold text-[#172621] mb-3 uppercase tracking-wider">
              Especialidade
            </h3>
            <div className="space-y-2.5">
              {specialtyOptions.map((spec) => {
                const isChecked = selectedSpecialties.includes(spec.name);
                return (
                  <label
                    key={spec.name}
                    className="flex items-center gap-2.5 cursor-pointer text-[14px] text-[#40544d] hover:text-[#172621] select-none"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleSpecialtyToggle(spec.name)}
                      className="w-4 h-4 rounded border-[#c2d9d1] text-[#45645a] focus:ring-[#45645a]"
                    />
                    <span>{spec.name}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Availability Radio */}
          <div className="mb-6 border-t border-[#d2e2dc] pt-5">
            <h3 className="font-mono text-[13px] font-semibold text-[#172621] mb-3 uppercase tracking-wider">
              Disponibilidade
            </h3>
            <div className="space-y-2.5">
              <label className="flex items-center gap-2.5 cursor-pointer text-[14px] text-[#40544d] hover:text-[#172621] select-none">
                <input
                  type="radio"
                  name="availability"
                  checked={availability === 'any'}
                  onChange={() => {
                    setAvailability('any');
                    setCurrentPage(1);
                  }}
                  className="w-4 h-4 border-[#c2d9d1] text-[#45645a] focus:ring-[#45645a]"
                />
                <span>Qualquer Dia</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-[14px] text-[#40544d] hover:text-[#172621] select-none">
                <input
                  type="radio"
                  name="availability"
                  checked={availability === 'today'}
                  onChange={() => {
                    setAvailability('today');
                    setCurrentPage(1);
                  }}
                  className="w-4 h-4 border-[#c2d9d1] text-[#45645a] focus:ring-[#45645a]"
                />
                <span>Hoje</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-[14px] text-[#40544d] hover:text-[#172621] select-none">
                <input
                  type="radio"
                  name="availability"
                  checked={availability === 'this_week'}
                  onChange={() => {
                    setAvailability('this_week');
                    setCurrentPage(1);
                  }}
                  className="w-4 h-4 border-[#c2d9d1] text-[#45645a] focus:ring-[#45645a]"
                />
                <span>Esta Semana</span>
              </label>
            </div>
          </div>

          <button
            onClick={() => {
              // Apply confirmation effect
            }}
            className="w-full bg-[#45645a] text-white font-mono text-[13px] py-2.5 rounded-xl hover:bg-[#344d45] transition-colors mt-2 font-semibold shadow-xs"
          >
            Aplicar Filtros ({filteredDoctors.length})
          </button>
        </aside>

        {/* Doctor Results Grid */}
        <section className="lg:col-span-9 flex flex-col">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#d2e2dc]">
            <div>
              <h1 className="text-[26px] md:text-[32px] font-bold text-[#172621] tracking-tight">
                {getHeadingText()}
              </h1>
              <p className="text-xs font-mono text-[#556963] mt-0.5">
                Exibindo página {currentPage} de {totalPages} ({filteredDoctors.length} médicos cadastrados)
              </p>
            </div>

            <div className="flex items-center gap-2 text-[#40544d] self-start sm:self-auto">
              <span className="font-mono text-[13px]">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-[#c2d9d1] rounded-lg py-1.5 px-3 font-mono text-[13px] text-[#172621] focus:border-[#45645a] outline-none"
              >
                <option value="recommended">Recomendados</option>
                <option value="earliest">Mais Rápido Disponível</option>
                <option value="experience">Mais Experiência</option>
                <option value="rating">Melhor Avaliados</option>
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          {paginatedDoctors.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#d2e2dc] p-12 text-center my-6">
              <Users className="w-12 h-12 text-[#556963] mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-bold text-[#172621] mb-1">Nenhum médico encontrado</h3>
              <p className="text-sm text-[#40544d] mb-6">
                Não encontramos especialistas com os filtros selecionados.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-[#45645a] text-white rounded-xl font-mono text-xs font-semibold"
              >
                Limpar Filtros e Ver Todos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white rounded-2xl border border-[#d2e2dc] overflow-hidden hover:shadow-[0px_10px_30px_rgba(40,62,55,0.08)] transition-all duration-300 flex flex-col h-full group"
                >
                  {/* Photo Headshot */}
                  <div className="relative h-64 overflow-hidden bg-[#eaf2ef]">
                    <img
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      alt={`Foto de ${doctor.name}`}
                      src={doctor.avatarUrl}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-[#172621]/80 backdrop-blur-xs px-2.5 py-1 rounded-full text-white text-[11px] font-mono font-medium shadow-xs">
                      CHPMT
                    </div>
                  </div>

                  {/* Doctor Info Body */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-[20px] font-bold text-[#172621] group-hover:text-[#45645a] transition-colors mb-1">
                      {doctor.name}
                    </h3>

                    <p className="font-mono text-[13px] text-[#40544d] mb-2 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#7a2230]"></span>
                      <span className="font-semibold text-[#172621]">{doctor.specialty}</span>
                    </p>

                    <p className="font-mono text-[11px] text-[#45645a] mb-4 flex items-center gap-1.5 bg-[#eaf2ef] w-fit px-2.5 py-1 rounded-full font-medium">
                      <Users className="w-3.5 h-3.5" />
                      <span>{doctor.careTeam || 'Equipa de Cuidado Multidisciplinar'}</span>
                    </p>

                    <div className="mt-auto space-y-2 mb-5 pt-3 border-t border-[#f6f9f8]">
                      <div className="flex items-center gap-2 text-[#40544d]">
                        <Calendar className="w-4 h-4 text-[#556963] shrink-0" />
                        <span className="font-mono text-[12px]">
                          Próxima vaga: <strong className="text-[#172621] font-semibold">{doctor.nextAvailable}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[#40544d]">
                        <MapPin className="w-4 h-4 text-[#556963] shrink-0" />
                        <span className="font-mono text-[12px]">{doctor.location}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectDoctorToBook(doctor)}
                      className="w-full bg-[#45645a] text-white font-mono text-[13px] py-2.5 rounded-xl hover:bg-[#344d45] transition-colors mt-auto font-semibold shadow-xs"
                    >
                      Agendar Consulta
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10 pt-8 border-t border-[#d2e2dc]">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#c2d9d1] text-[#40544d] hover:bg-[#eaf2ef] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Página anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                const isActive = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl font-mono text-[13px] transition-colors ${
                      isActive
                        ? 'bg-[#45645a] text-white font-bold'
                        : 'border border-[#c2d9d1] text-[#40544d] hover:bg-[#eaf2ef]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#c2d9d1] text-[#40544d] hover:bg-[#eaf2ef] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Próxima página"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
