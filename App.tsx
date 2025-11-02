
import React, { useState, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { AccessibilityFilters } from './components/AccessibilityFilters';
import { JobCard } from './components/JobCard';
import { JobDetailModal } from './components/JobDetailModal';
import { Chatbot } from './components/Chatbot';
import { SearchIcon } from './components/icons/SearchIcon';
import { MOCK_JOBS } from './constants';
import { Job, Filters } from './types';

function App() {
  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    location: '',
    modalities: [],
    jobTypes: [],
    fullPhysicalAccess: false,
    adaptations: [],
  });
  
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleFilterChange = useCallback(<K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter(job => {
      const searchTermMatch = job.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) || 
                              job.company.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const locationMatch = job.location.toLowerCase().includes(filters.location.toLowerCase());
      const modalityMatch = filters.modalities.length === 0 || filters.modalities.includes(job.modality);
      const jobTypeMatch = filters.jobTypes.length === 0 || filters.jobTypes.includes(job.jobType);
      const physicalAccessMatch = !filters.fullPhysicalAccess || job.fullPhysicalAccess;
      const adaptationsMatch = filters.adaptations.every(a => job.adaptations.includes(a));

      return searchTermMatch && locationMatch && modalityMatch && jobTypeMatch && physicalAccessMatch && adaptationsMatch;
    });
  }, [filters]);

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

        <div className="bg-background-secondary p-6 rounded-lg shadow-md mb-8">
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
            <div className="w-full lg:w-3/4 xl:w-4/5">
              {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredJobs.map(job => (
                    <JobCard key={job.id} job={job} onViewDetails={setSelectedJob} />
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
      <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      <Chatbot jobs={MOCK_JOBS} onViewDetails={setSelectedJob} />
    </div>
  );
}

export default App;
