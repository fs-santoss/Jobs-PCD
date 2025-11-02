import React, { useEffect, useRef } from 'react';
import { Job } from '../types';
import { CloseIcon } from './icons/CloseIcon';
import { TrashIcon } from './icons/TrashIcon';

interface SavedJobsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedJobs: Job[];
  onViewDetails: (job: Job) => void;
  onUnsave: (jobId: number) => void;
}

export const SavedJobsModal: React.FC<SavedJobsModalProps> = ({ isOpen, onClose, savedJobs, onViewDetails, onUnsave }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="saved-jobs-title"
    >
      <div
        ref={modalRef}
        className="bg-background-secondary rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <header className="p-6 border-b border-gray-200 sticky top-0 bg-background-secondary z-10">
            <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-text-main focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
            aria-label="Fechar vagas salvas"
            >
                <CloseIcon className="w-6 h-6" />
            </button>
            <h2 id="saved-jobs-title" className="text-2xl font-bold text-primary">Vagas Salvas</h2>
        </header>

        <div className="overflow-y-auto p-6">
            {savedJobs.length > 0 ? (
                <ul className="space-y-4">
                    {savedJobs.map(job => (
                        <li key={job.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between gap-4">
                            <div>
                                <h3 className="font-bold text-primary">{job.title}</h3>
                                <p className="text-sm text-text-main">{job.company} - {job.location}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <button
                                    onClick={() => onViewDetails(job)}
                                    className="text-primary font-semibold py-1 px-3 rounded-lg hover:bg-primary/10 transition-colors"
                                >
                                    Detalhes
                                </button>
                                <button
                                    onClick={() => onUnsave(job.id)}
                                    className="text-error p-2 rounded-full hover:bg-error/10 transition-colors"
                                    aria-label={`Remover vaga ${job.title}`}
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-600">Você ainda não salvou nenhuma vaga.</p>
                    <p className="text-sm text-gray-500 mt-1">Clique no ícone de marcador para salvar.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
