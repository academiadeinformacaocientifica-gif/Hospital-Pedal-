import React, { useState, useEffect } from 'react';
import { TabType, Doctor, ServiceItem, AppointmentBooking } from './types';
import { DOCTORS } from './data/hospitalData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { FindDoctorView } from './components/FindDoctorView';
import { ServicesView } from './components/ServicesView';
import { AboutView } from './components/AboutView';
import { BlogView } from './components/BlogView';
import { AppointmentModal } from './components/AppointmentModal';
import { AuthModal } from './components/AuthModal';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedDoctorToBook, setSelectedDoctorToBook] = useState<Doctor | null>(null);
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);
  const [initialSpecialtyFilter, setInitialSpecialtyFilter] = useState<string | undefined>(undefined);
  
  // Auth state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);

  // Toast notification for appointment confirmation
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Always reset safely to 'home' on initial page load / refresh
  useEffect(() => {
    setActiveTab('home');
    window.scrollTo({ top: 0, left: 0 });

    // Clean any hash or query that could cause reload routing issues
    try {
      if (window.location.hash || (window.location.pathname && window.location.pathname !== '/')) {
        window.history.replaceState(null, '', '/');
      }
    } catch {
      // Safe fallback for sandboxed iframes
    }

    // Intercept any runtime errors to safely fallback to home
    const errorHandler = (event: ErrorEvent) => {
      console.warn("Recovered from runtime event:", event.message);
    };

    const rejectionHandler = (event: PromiseRejectionEvent) => {
      console.warn("Recovered from promise rejection:", event.reason);
    };

    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', rejectionHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', rejectionHandler);
    };
  }, []);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleQuickSearch = (specialty: string, location: string, date: string) => {
    if (specialty) {
      setInitialSpecialtyFilter(specialty);
    }
    setActiveTab('doctors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmBooking = (booking: AppointmentBooking) => {
    setToastMessage(`Consulta agendada com ${booking.doctorName} para ${booking.date} às ${booking.time}!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f9f8] text-[#172621]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#283e37] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#45645a] animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-5 h-5 text-[#d7e6e0] shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-white/60 hover:text-white ml-2 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenAuth={handleOpenAuth}
        user={currentUser}
        onLogout={() => setCurrentUser(null)}
      />

      {/* Main Screen Views */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <HomeView
            setActiveTab={handleTabChange}
            onSelectDoctorToBook={(doc) => setSelectedDoctorToBook(doc)}
            onSelectService={(service) => {
              setSelectedServiceModal(service);
              setActiveTab('services');
            }}
            onQuickSearch={handleQuickSearch}
          />
        )}

        {activeTab === 'doctors' && (
          <FindDoctorView
            onSelectDoctorToBook={(doc) => setSelectedDoctorToBook(doc)}
            initialSpecialtyFilter={initialSpecialtyFilter}
          />
        )}

        {activeTab === 'services' && (
          <ServicesView
            setActiveTab={handleTabChange}
            onSelectDoctorToBook={(doc) => setSelectedDoctorToBook(doc)}
            selectedServiceModal={selectedServiceModal}
            setSelectedServiceModal={setSelectedServiceModal}
          />
        )}

        {activeTab === 'about' && (
          <AboutView setActiveTab={handleTabChange} />
        )}

        {activeTab === 'blog' && (
          <BlogView 
            onNavigateToTab={handleTabChange}
          />
        )}
      </main>

      {/* Site Footer */}
      <Footer setActiveTab={handleTabChange} />

      {/* Booking Modal */}
      {selectedDoctorToBook && (
        <AppointmentModal
          doctor={selectedDoctorToBook}
          onClose={() => setSelectedDoctorToBook(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {/* Auth Modal */}
      {authModalOpen && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthModalOpen(false)}
          onSuccess={(user) => {
            setCurrentUser(user);
            setToastMessage(`Bem-vindo, ${user.name}! Sessão iniciada.`);
            setTimeout(() => setToastMessage(null), 5000);
          }}
        />
      )}
    </div>
  );
}
