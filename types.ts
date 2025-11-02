
export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  modality: 'Home Office' | 'Híbrido' | 'Presencial';
  jobType: 'Vaga Afirmativa (PCD)' | 'Banco de Talentos' | 'Jovem Aprendiz (PCD)';
  description: string;
  salary?: number;
  adaptations: string[];
  fullPhysicalAccess: boolean;
}

export interface Filters {
  searchTerm: string;
  location: string;
  modalities: string[];
  jobTypes: string[];
  fullPhysicalAccess: boolean;
  adaptations: string[];
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  jobs?: Job[];
}
