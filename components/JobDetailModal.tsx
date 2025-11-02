import React, { useEffect, useRef } from 'react';
import { Job } from '../types';
import { CheckIcon } from './icons/CheckIcon';
import { CloseIcon } from './icons/CloseIcon';
import { BookmarkIcon } from './icons/BookmarkIcon';

interface JobDetailModalProps {
  job: Job | null;
  onClose: () => void;
  isSaved: boolean;
  onSaveToggle: (jobId: number) => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, onClose, isSaved, onSaveToggle }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (job) {
      document.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [job, onClose]);

  if (!job) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="job-title"
    >
      <div
        ref={modalRef}
        className="bg-background-secondary rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-text-main focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
          aria-label="Fechar detalhes da vaga"
        >
          <CloseIcon className="w-6 h-6" />
        </button>

        <h2 id="job-title" className="text-3xl font-bold text-primary mb-2">{job.title}</h2>
        <p className="text-lg text-text-main font-semibold">{job.company}</p>
        <p className="text-md text-gray-600 mb-6">{job.location} | {job.modality} | {job.jobType}</p>
        
        {job.salary && (
            <p className="text-lg font-bold text-green-700 mb-6">
                Salário: R$ {job.salary.toLocaleString('pt-BR')}
            </p>
        )}

        <div className="prose max-w-none text-text-main">
          <h3 className="font-bold text-xl mb-2">Descrição da Vaga</h3>
          <p>{job.description}</p>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold text-xl mb-4 text-text-main">Acessibilidade e Adaptações para esta Vaga</h3>
            <ul className="space-y-2">
                 {job.adaptations.map(adaptation => (
                    <li key={adaptation} className="flex items-center text-text-main">
                        <CheckIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                        <span>{adaptation}</span>
                    </li>
                ))}
                 {job.fullPhysicalAccess && (
                    <li className="flex items-center text-text-main font-semibold">
                       <CheckIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                        <span>Local com Acesso Físico Completo (Rampas, Elevadores)</span>
                    </li>
                )}
            </ul>
        </div>
        
        <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => onSaveToggle(job.id)}
              className={`flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors text-lg ${
                isSaved ? 'bg-background text-primary border-2 border-primary' : 'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white'
              }`}
            >
              <BookmarkIcon className="w-6 h-6" fill={isSaved ? 'currentColor' : 'none'} />
              {isSaved ? 'Vaga Salva' : 'Salvar Vaga'}
            </button>
            <button className="bg-primary text-text-interactive font-bold py-3 px-8 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-opacity text-lg">
                Candidatar-se
            </button>
        </div>
      </div>
    </div>
  );
};
