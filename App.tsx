
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { AccessibilityFilters } from './components/AccessibilityFilters';
import { JobCard } from './components/JobCard';
import { JobDetailModal } from './components/JobDetailModal';
import { SavedJobsModal } from './components/SavedJobsModal';
import { Chatbot } from './components/Chatbot';
import { CompanyProfileModal } from './components/CompanyProfileModal';
import { SearchIcon } from './components/icons/SearchIcon';
import { BookmarkIcon } from './components/icons/BookmarkIcon';
import { MOCK_JOBS, MOCK_COMPANIES } from './constants';
import { Job, Filters, Company } from './types';

function App() {
  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    location: '',
    modalities: [],
    jobTypes: [],
    fullPhysicalAccess: false,
    adaptations: [],
    verifiedOnly: false,
  });
  
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [savedJobIds, setSavedJobIds] = useState<Set<number>>(() => {
    try {
      const item = window.localStorage.getItem('savedJobIds');
      return item ? new Set(JSON.parse(item)) : new Set();
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return new Set();
    }
  });
  const [isSavedJobsModalOpen, setIsSavedJobsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem('savedJobIds', JSON.stringify(Array.from(savedJobIds)));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [savedJobIds]);

  const handleSaveJobToggle = useCallback((jobId: number) => {
    setSavedJobIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  }, []);


  const handleFilterChange = useCallback(<K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleViewCompanyProfile = useCallback((companyName: string) => {
    const company = MOCK_COMPANIES.find(c => c.name === companyName);
    if (company) {
      setSelectedJob(null); // Close job detail modal if open
      setIsSavedJobsModalOpen(false); // Close saved jobs modal if open
      setSelectedCompany(company);
    }
  }, []);

  const filteredJobs = useMemo(() => {
    const lowerSearchTerm = filters.searchTerm.trim().toLowerCase();
    const lowerLocation = filters.location.trim().toLowerCase();
    
    const modalitySet = new Set(filters.modalities);
    const jobTypeSet = new Set(filters.jobTypes);

    if (
      !lowerSearchTerm &&
      !lowerLocation &&
      modalitySet.size === 0 &&
      jobTypeSet.size === 0 &&
      !filters.fullPhysicalAccess &&
      filters.adaptations.length === 0 &&
      !filters.verifiedOnly
    ) {
      return MOCK_JOBS;
    }

    return MOCK_JOBS.filter(job => {
      if (filters.verifiedOnly && !job.verified) return false;
      if (filters.fullPhysicalAccess && !job.fullPhysicalAccess) return false;
      if (modalitySet.size > 0 && !modalitySet.has(job.modality)) return false;
      if (jobTypeSet.size > 0 && !jobTypeSet.has(job.jobType)) return false;
      if (lowerLocation && !job.location.toLowerCase().includes(lowerLocation)) return false;
      if (lowerSearchTerm && 
          !job.title.toLowerCase().includes(lowerSearchTerm) && 
          !job.company.toLowerCase().includes(lowerSearchTerm)) {
        return false;
      }
      if (filters.adaptations.length > 0) {
        if (!filters.adaptations.every(a => job.adaptations.includes(a))) return false;
      }
      return true;
    });
  }, [filters]);

  useEffect(() => {
    setIsUpdating(true);
    const timer = setTimeout(() => setIsUpdating(false), 300);
    return () => clearTimeout(timer);
  }, [filteredJobs]);
  
  const savedJobs = useMemo(() => MOCK_JOBS.filter(job => savedJobIds.has(job.id)), [savedJobIds]);

  return (
    <div className="min-h-screen bg-background font-sans">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-primary focus:text-white">
        Pular para o Conteúdo Principal
      </a>
      <Header />
      <main id="main-content" className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-main">Encontre sua Próxima Oportunidade</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Conectamos talentos com deficiência a empresas que valorizam a inclusão e a diversidade.
            </p>
        </div>
        
        <section id="companies" className="bg-background-secondary p-8 rounded-lg shadow-md mb-12 text-center scroll-mt-24">
          <h2 className="text-3xl font-bold text-text-main mb-4">Sua Empresa é Inclusiva?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Destaque seu compromisso com a diversidade. Crie um perfil para sua empresa, divulgue suas vagas afirmativas e conecte-se com os melhores talentos PCD do mercado.
          </p>
          <button className="bg-primary text-text-interactive font-bold py-3 px-8 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-opacity text-lg">
            Criar Perfil de Empresa
          </button>
        </section>

        <div id="jobs" className="bg-background-secondary p-6 rounded-lg shadow-md mb-8 scroll-mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="search-term" className="block text-sm font-medium text-text-main mb-1">Cargo ou Empresa</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            id="search-term"
                            placeholder="Ex: Analista de Dados"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            value={filters.searchTerm}
                            onChange={e => handleFilterChange('searchTerm', e.target.value)}
                        />
                         <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                </div>
                 <div>
                    <label htmlFor="location" className="block text-sm font-medium text-text-main mb-1">Localização</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            id="location"
                            placeholder="Ex: São Paulo"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            value={filters.location}
                            onChange={e => handleFilterChange('location', e.target.value)}
                        />
                         <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></svg>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
            <AccessibilityFilters 
                filters={filters}
                onFilterChange={handleFilterChange}
                jobCount={filteredJobs.length}
            />
            <div className={`w-full lg:w-3/4 xl:w-4/5 transition-opacity duration-300 ${isUpdating ? 'opacity-50' : 'opacity-100'}`}>
              {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredJobs.map(job => (
                    <JobCard 
                      key={job.id} 
                      job={job} 
                      onViewDetails={setSelectedJob}
                      isSaved={savedJobIds.has(job.id)}
                      onSaveToggle={handleSaveJobToggle}
                      onViewCompanyProfile={handleViewCompanyProfile}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold text-text-main">Nenhuma vaga encontrada</h3>
                    <p className="mt-2 text-gray-600">Tente ajustar seus filtros ou realizar uma nova busca.</p>
                </div>
              )}
            </div>
        </div>
      </main>
      <JobDetailModal 
        job={selectedJob} 
        onClose={() => setSelectedJob(null)}
        isSaved={selectedJob ? savedJobIds.has(selectedJob.id) : false}
        onSaveToggle={handleSaveJobToggle}
        onViewCompanyProfile={handleViewCompanyProfile}
      />
      <CompanyProfileModal 
        company={selectedCompany}
        jobs={MOCK_JOBS.filter(job => job.company === selectedCompany?.name)}
        onClose={() => setSelectedCompany(null)}
        onViewJobDetails={(job) => {
            setSelectedCompany(null);
            setSelectedJob(job);
        }}
      />
      <Chatbot jobs={MOCK_JOBS} onViewDetails={setSelectedJob} />
      
      {savedJobIds.size > 0 && (
        <button 
          onClick={() => setIsSavedJobsModalOpen(true)}
          className="fixed bottom-5 right-24 w-16 h-16 bg-primary text-white rounded-full shadow-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary z-40 flex items-center justify-center"
          aria-label={`Ver ${savedJobIds.size} vagas salvas`}
        >
          <BookmarkIcon className="w-8 h-8" />
          <span className="absolute -top-1 -right-1 bg-error text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {savedJobIds.size}
          </span>
        </button>
      )}

      <SavedJobsModal 
        isOpen={isSavedJobsModalOpen}
        onClose={() => setIsSavedJobsModalOpen(false)}
        savedJobs={savedJobs}
        onViewDetails={(job) => {
          setIsSavedJobsModalOpen(false);
          setSelectedJob(job);
        }}
        onUnsave={handleSaveJobToggle}
      />
    </div>
  );
}

export default App;