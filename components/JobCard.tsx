
import React from 'react';
import { Job } from '../types';
import { CheckIcon } from './icons/CheckIcon';

interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails }) => {
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-primary">{job.title}</h3>
        <p className="text-md text-text-main font-semibold mt-1">{job.company}</p>
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
        <button 
            onClick={() => onViewDetails(job)}
            className="bg-primary text-text-interactive font-semibold py-2 px-5 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-opacity"
        >
          Ver Detalhes
        </button>
      </div>
    </div>
  );
};
