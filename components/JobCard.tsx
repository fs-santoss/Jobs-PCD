
import React from 'react';
import { Job } from '../types';
import { CheckIcon } from './icons/CheckIcon';
import { BookmarkIcon } from './icons/BookmarkIcon';
import { VerifiedIcon } from './icons/VerifiedIcon';

interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
  isSaved: boolean;
  onSaveToggle: (jobId: number) => void;
  onViewCompanyProfile: (companyName: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails, isSaved, onSaveToggle, onViewCompanyProfile }) => {
  
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSaveToggle(job.id);
  };

  return (
    <div 
      className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full relative cursor-pointer"
      onClick={() => onViewDetails(job)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onViewDetails(job)}
      tabIndex={0}
      role="button"
      aria-label={`Ver detalhes da vaga ${job.title} na empresa ${job.company}`}
    >
      <button 
        onClick={handleSaveClick} 
        className="absolute top-4 right-4 text-gray-400 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1 z-10"
        aria-label={isSaved ? 'Remover vaga salva' : 'Salvar vaga'}
      >
        <BookmarkIcon className="w-6 h-6" fill={isSaved ? 'currentColor' : 'none'} />
      </button>

      <div className="flex-grow">
        <h3 className="text-xl font-bold text-primary pr-8">{job.title}</h3>
        <div className="flex items-center gap-1.5 mt-1">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onViewCompanyProfile(job.company);
            }}
            className="text-md text-text-main font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded z-10 relative"
            aria-label={`Ver perfil da empresa ${job.company}`}
          >
            {job.company}
          </button>
          {job.verified && (
            <div title="Empresa Verificada: Práticas de inclusão e acessibilidade confirmadas pela JobsPCD.">
              <VerifiedIcon className="w-5 h-5 text-primary" />
            </div>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1">{job.location} - {job.modality}</p>
        
        <div className="mt-4">
            <h4 className="text-sm font-semibold text-text-main mb-2">Adaptações disponíveis:</h4>
            <ul className="space-y-1">
                {job.adaptations.slice(0, 2).map(adaptation => (
                    <li key={adaptation} className="flex items-center text-sm text-gray-700">
                        <CheckIcon className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        <span>{adaptation}</span>
                    </li>
                ))}
                {job.adaptations.length > 2 && (
                    <li className="text-sm text-gray-500 font-medium">
                        e mais {job.adaptations.length - 2}...
                    </li>
                )}
                 {job.fullPhysicalAccess && (
                    <li className="flex items-center text-sm text-gray-700 font-semibold">
                       <CheckIcon className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        <span>Acesso Físico Completo</span>
                    </li>
                )}
            </ul>
        </div>
      </div>
      
      <div className="mt-6 text-right">
        <div 
            className="inline-block bg-primary text-text-interactive font-semibold py-2 px-5 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-opacity"
        >
          Ver Detalhes
        </div>
      </div>
    </div>
  );
};