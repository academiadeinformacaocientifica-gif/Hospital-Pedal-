export type TabType = 'home' | 'doctors' | 'services' | 'about' | 'blog';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Cirurgia Robótica' | 'Nefrologia' | 'Cardiologia' | 'Neurociência' | 'Saúde & Prevenção' | 'Institucional';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  imageUrl: string;
  featured?: boolean;
  tags: string[];
}

export interface Doctor {
  id: string;
  name: string;
  specialty: 'Cardiologia' | 'Oncologia' | 'Ortopedia' | 'Neurologia' | 'Pediatria' | 'Cirurgia Geral';
  role?: string;
  careTeam?: string;
  rating: number;
  reviewCount: number;
  nextAvailable: string;
  availabilityType: 'today' | 'this_week' | 'any_day';
  location: string;
  avatarUrl: string;
  bio: string;
  experienceYears: number;
  consultationFee?: string;
  crm?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  procedures: string[];
  keyBenefits: string[];
  teamLead?: string;
}

export interface AppointmentBooking {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatar: string;
  date: string;
  time: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  location: string;
  appointmentType: 'Presencial' | 'Telemedicina';
  notes?: string;
  createdAt: string;
}
