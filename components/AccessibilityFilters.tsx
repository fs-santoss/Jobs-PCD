
import React from 'react';
import { Filters } from '../types';
import { ALL_ADAPTATIONS, ALL_JOB_TYPES, ALL_MODALITIES } from '../constants';

interface AccessibilityFiltersProps {
  filters: Filters;
  onFilterChange: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  jobCount: number;
}

const FilterCheckbox: React.FC<{
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ id, label, checked, onChange }) => (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
      />
      <label htmlFor={id} className="ml-2 text-sm text-text-main">
        {label}
      </label>
    </div>
);


export const AccessibilityFilters: React.FC<AccessibilityFiltersProps> = ({ filters, onFilterChange, jobCount }) => {

  const handleCheckboxGroupChange = (key: keyof Filters, value: string, checked: boolean) => {
    const currentValues = (filters[key] as string[]) || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((item) => item !== value);
    onFilterChange(key, newValues as any);
  };
  
  return (
    <aside className="w-full lg:w-1/4 xl:w-1/5 p-6 bg-background-secondary rounded-lg shadow-md h-fit sticky top-8">
      <h2 className="text-xl font-bold text-text-main mb-4">Filtros</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Modalidade</h3>
          <div className="space-y-2">
            {ALL_MODALITIES.map(modality => (
                <FilterCheckbox 
                    key={modality} 
                    id={`mod-${modality}`}
                    label={modality}
                    checked={filters.modalities.includes(modality)}
                    onChange={(checked) => handleCheckboxGroupChange('modalities', modality, checked)}
                />
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Tipo de Vaga</h3>
          <div className="space-y-2">
             {ALL_JOB_TYPES.map(jobType => (
                <FilterCheckbox 
                    key={jobType} 
                    id={`type-${jobType}`}
                    label={jobType}
                    checked={filters.jobTypes.includes(jobType)}
                    onChange={(checked) => handleCheckboxGroupChange('jobTypes', jobType, checked)}
                />
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Acessibilidade do Local</h3>
          <div className="space-y-2">
            <FilterCheckbox 
                id="physical-access"
                label="Acesso Físico Completo"
                checked={filters.fullPhysicalAccess}
                onChange={(checked) => onFilterChange('fullPhysicalAccess', checked)}
            />
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Adaptações Oferecidas</h3>
          <div className="space-y-2">
            {ALL_ADAPTATIONS.map(adaptation => (
                 <FilterCheckbox 
                    key={adaptation} 
                    id={`adapt-${adaptation}`}
                    label={adaptation}
                    checked={filters.adaptations.includes(adaptation)}
                    onChange={(checked) => handleCheckboxGroupChange('adaptations', adaptation, checked)}
                />
            ))}
          </div>
        </div>
      </div>
       <div className="mt-8 border-t pt-4">
        <p className="text-center font-bold text-primary">{jobCount} vagas encontradas</p>
      </div>
    </aside>
  );
};
