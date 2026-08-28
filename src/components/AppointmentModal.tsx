import React, { useState } from 'react';
import { Doctor, AppointmentBooking } from '../types';
import { ChpmtLogo } from './ChpmtLogo';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  CheckCircle, 
  Video, 
  Building, 
  ShieldCheck, 
  Download,
  Share2,
  Copy
} from 'lucide-react';

interface AppointmentModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onConfirmBooking: (booking: AppointmentBooking) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  doctor,
  onClose,
  onConfirmBooking,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [appointmentType, setAppointmentType] = useState<'Presencial' | 'Telemedicina'>('Presencial');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [selectedTime, setSelectedTime] = useState<string>('10:00');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [bookingResult, setBookingResult] = useState<AppointmentBooking | null>(null);

  if (!doctor) return null;

  const timeSlots = [
    '08:30', '09:15', '10:00', '10:45', '11:30', 
    '14:00', '14:45', '15:30', '16:15', '17:00'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientEmail || !patientPhone) {
      alert('Por favor, preencha todos os campos obrigatórios do paciente.');
      return;
    }

    const newBooking: AppointmentBooking = {
      id: `PED-${Math.floor(100000 + Math.random() * 900000)}`,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      doctorAvatar: doctor.avatarUrl,
      date: selectedDate,
      time: selectedTime,
      patientName,
      patientEmail,
      patientPhone,
      location: appointmentType === 'Presencial' ? doctor.location : 'Telemedicina Hub Online',
      appointmentType,
      notes,
      createdAt: new Date().toISOString(),
    };

    setBookingResult(newBooking);
    onConfirmBooking(newBooking);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto border border-[#d2e2dc] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-[#d2e2dc] flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <img
              src={doctor.avatarUrl}
              alt={doctor.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#45645a]"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="text-lg font-bold text-[#172621]">{doctor.name}</h3>
              <p className="text-xs font-mono text-[#40544d]">{doctor.specialty} • {doctor.role || 'Especialista'}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#556963] hover:text-[#172621] hover:bg-[#eaf2ef] rounded-full transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Appointment Mode Selection */}
            <div>
              <label className="block text-xs font-mono font-bold text-[#172621] uppercase mb-2">
                Modalidade de Atendimento
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAppointmentType('Presencial')}
                  className={`p-3 rounded-2xl border flex items-center gap-2.5 transition-all text-left ${
                    appointmentType === 'Presencial'
                      ? 'border-[#45645a] bg-[#eaf2ef] text-[#172621] font-semibold ring-1 ring-[#45645a]'
                      : 'border-[#d2e2dc] hover:bg-[#f6f9f8] text-[#40544d]'
                  }`}
                >
                  <Building className="w-4 h-4 text-[#45645a]" />
                  <div>
                    <p className="text-xs font-bold">Presencial no Hospital</p>
                    <p className="text-[10px] text-[#556963]">{doctor.location}</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAppointmentType('Telemedicina')}
                  className={`p-3 rounded-2xl border flex items-center gap-2.5 transition-all text-left ${
                    appointmentType === 'Telemedicina'
                      ? 'border-[#7a2230] bg-[#f8e9eb] text-[#7a2230] font-semibold ring-1 ring-[#7a2230]'
                      : 'border-[#d2e2dc] hover:bg-[#f6f9f8] text-[#40544d]'
                  }`}
                >
                  <Video className="w-4 h-4 text-[#7a2230]" />
                  <div>
                    <p className="text-xs font-bold">Telemedicina Online</p>
                    <p className="text-[10px] text-[#556963]">Vídeo consulta segura</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Date and Time Picker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-[#172621] uppercase mb-1.5">
                  <Calendar className="w-3.5 h-3.5 inline mr-1 text-[#45645a]" /> Data da Consulta *
                </label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-2.5 bg-[#f6f9f8] border border-[#c2d9d1] rounded-xl text-sm text-[#172621] focus:border-[#45645a] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#172621] uppercase mb-1.5">
                  <Clock className="w-3.5 h-3.5 inline mr-1 text-[#45645a]" /> Horário Selecionado *
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-2.5 bg-[#f6f9f8] border border-[#c2d9d1] rounded-xl text-sm text-[#172621] focus:border-[#45645a] outline-none font-mono"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot} (Disponível)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Patient Info Fields */}
            <div className="pt-2 border-t border-[#d2e2dc] space-y-3">
              <h4 className="text-xs font-mono font-bold text-[#172621] uppercase">
                Dados do Paciente
              </h4>

              <div>
                <label className="block text-xs text-[#40544d] mb-1 font-medium">Nome Completo *</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#556963]" />
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Ex: Ana Manuel Silva"
                    className="w-full pl-9 pr-3 py-2 bg-[#f6f9f8] border border-[#c2d9d1] rounded-xl text-sm text-[#172621] focus:border-[#45645a] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#40544d] mb-1 font-medium">E-mail *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#556963]" />
                    <input
                      type="email"
                      required
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      placeholder="paciente@email.com"
                      className="w-full pl-9 pr-3 py-2 bg-[#f6f9f8] border border-[#c2d9d1] rounded-xl text-sm text-[#172621] focus:border-[#45645a] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#40544d] mb-1 font-medium">Telefone / WhatsApp *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#556963]" />
                    <input
                      type="tel"
                      required
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="+244 923 000 000"
                      className="w-full pl-9 pr-3 py-2 bg-[#f6f9f8] border border-[#c2d9d1] rounded-xl text-sm text-[#172621] focus:border-[#45645a] outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#40544d] mb-1 font-medium">Observações ou Sintomas (Opcional)</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Descreva brevemente o motivo da consulta ou histórico médico prévio..."
                  className="w-full p-2.5 bg-[#f6f9f8] border border-[#c2d9d1] rounded-xl text-sm text-[#172621] focus:border-[#45645a] outline-none"
                />
              </div>
            </div>

            {/* Privacy notice */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[#eaf2ef] text-[11px] text-[#40544d]">
              <ShieldCheck className="w-4 h-4 text-[#45645a] shrink-0" />
              <span>Seus dados de saúde são estritamente confidenciais e protegidos pelos protocolos clínicos do CHPMT.</span>
            </div>

            {/* Submit Action */}
            <div className="pt-3 border-t border-[#d2e2dc] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-[#c2d9d1] font-mono text-xs text-[#40544d] hover:bg-[#eaf2ef] font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#45645a] text-white font-mono text-xs font-bold hover:bg-[#344d45] transition-colors shadow-xs"
              >
                Confirmar Agendamento
              </button>
            </div>
          </form>
        ) : (
          /* Success Screen */
          <div className="p-8 text-center space-y-6">
            <div className="flex justify-center mb-2">
              <ChpmtLogo variant="compact" height={36} />
            </div>

            <div className="w-14 h-14 rounded-full bg-[#eaf2ef] text-[#45645a] flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono bg-[#eaf2ef] text-[#283e37] px-3 py-1 rounded-full font-bold">
                COMPROVATIVO DE AGENDAMENTO
              </span>
              <h3 className="text-2xl font-bold text-[#172621] mt-3">Consulta Agendada com Sucesso!</h3>
              <p className="text-xs text-[#40544d] mt-1 font-mono">
                Código: <strong className="text-[#45645a] font-bold">{bookingResult?.id}</strong>
              </p>
            </div>

            <div className="bg-[#f6f9f8] rounded-2xl p-5 border border-[#d2e2dc] text-left text-xs space-y-2.5 font-mono">
              <div className="flex justify-between border-b border-[#d2e2dc] pb-2">
                <span className="text-[#556963]">Médico Especialista:</span>
                <span className="font-bold text-[#172621]">{bookingResult?.doctorName}</span>
              </div>
              <div className="flex justify-between border-b border-[#d2e2dc] pb-2">
                <span className="text-[#556963]">Especialidade:</span>
                <span className="font-bold text-[#172621]">{bookingResult?.doctorSpecialty}</span>
              </div>
              <div className="flex justify-between border-b border-[#d2e2dc] pb-2">
                <span className="text-[#556963]">Data & Horário:</span>
                <span className="font-bold text-[#45645a]">{bookingResult?.date} às {bookingResult?.time}</span>
              </div>
              <div className="flex justify-between border-b border-[#d2e2dc] pb-2">
                <span className="text-[#556963]">Modalidade:</span>
                <span className="font-bold text-[#172621]">{bookingResult?.appointmentType}</span>
              </div>
              <div className="flex justify-between border-b border-[#d2e2dc] pb-2">
                <span className="text-[#556963]">Local / Sala:</span>
                <span className="font-bold text-[#172621]">{bookingResult?.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#556963]">Paciente:</span>
                <span className="font-bold text-[#172621]">{bookingResult?.patientName}</span>
              </div>
            </div>

            <p className="text-xs text-[#556963]">
              Um e-mail de confirmação e lembrete foram enviados para <strong>{bookingResult?.patientEmail}</strong>.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  alert('Comprovativo baixado em PDF (Simulação)');
                }}
                className="px-4 py-2 bg-[#eaf2ef] border border-[#c2d9d1] rounded-xl font-mono text-xs text-[#172621] flex items-center gap-1.5 hover:bg-[#d2e2dc] font-semibold"
              >
                <Download className="w-3.5 h-3.5" /> Baixar PDF
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#45645a] text-white rounded-xl font-mono text-xs font-bold hover:bg-[#344d45]"
              >
                Concluir
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
