
import React, { useEffect, useRef } from 'react';
import { Company, Job } from '../types';
import { CloseIcon } from './icons/CloseIcon';
import { VerifiedIcon } from './icons/VerifiedIcon';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';

interface CompanyProfileModalProps {
  company: Company | null;
  jobs: Job[];
  onClose: () => void;
  onViewJobDetails: (job: Job) => void;
}

export const CompanyProfileModal: React.FC<CompanyProfileModalProps> = ({ company, jobs, onClose, onViewJobDetails }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose();
        }
        };
        
        if (company) {
            document.addEventListener('keydown', handleKeyDown);
            modalRef.current?.focus();
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [company, onClose]);

    if (!company) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="company-name"
        >
            <div
                ref={modalRef}
                className="bg-background-secondary rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 relative flex flex-col"
                onClick={(e) => e.stopPropagation()}
                tabIndex={-1}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-text-main focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
                    aria-label={`Fechar perfil de ${company.name}`}
                >
                    <CloseIcon className="w-6 h-6" />
                </button>

                <header className="flex flex-col sm:flex-row items-start gap-6 mb-6">
                    <div className="w-24 h-24 bg-primary text-white flex items-center justify-center rounded-lg text-4xl font-bold flex-shrink-0">
                        {company.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-grow">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h2 id="company-name" className="text-3xl font-bold text-primary">{company.name}</h2>
                            {company.verified && (
                            <div className="flex items-center gap-1 bg-blue-100 text-primary font-bold px-2.5 py-1 rounded-full text-xs" title="Empresa Verificada">
                                <VerifiedIcon className="w-4 h-4" />
                                <span>Verificada</span>
                            </div>
                            )}
                        </div>
                        <p className="text-lg text-gray-600 italic">"{company.tagline}"</p>
                        <a href={company.website} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-primary hover:underline font-semibold">
                            Visitar site <ExternalLinkIcon className="w-4 h-4" />
                        </a>
                    </div>
                </header>

                <div className="space-y-6">
                    <section>
                        <h3 className="text-xl font-bold text-text-main mb-2 border-b-2 border-primary/20 pb-1">Sobre Nós</h3>
                        <p className="text-text-main whitespace-pre-wrap">{company.about}</p>
                    </section>

                    <section className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-xl font-bold text-text-main mb-2">Nosso Compromisso com Acessibilidade</h3>
                        <p className="text-text-main whitespace-pre-wrap">{company.commitmentToAccessibility}</p>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold text-text-main mb-4">Vagas Abertas ({jobs.length})</h3>
                        {jobs.length > 0 ? (
                            <ul className="space-y-3">
                                {jobs.map(job => (
                                    <li key={job.id} className="bg-white p-4 rounded-md shadow-sm border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div>
                                            <h4 className="font-bold text-primary">{job.title}</h4>
                                            <p className="text-sm text-gray-600">{job.location} - {job.modality}</p>
                                        </div>
                                        <button
                                            onClick={() => onViewJobDetails(job)}
                                            className="bg-primary text-text-interactive font-semibold py-1.5 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-opacity text-sm whitespace-nowrap mt-2 sm:mt-0"
                                        >
                                            Ver Detalhes
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 bg-white p-4 rounded-md border text-center">Não há vagas abertas nesta empresa no momento.</p>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};