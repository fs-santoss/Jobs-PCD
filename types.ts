
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
  verified?: boolean;
}

export interface Company {
  name: string;
  tagline: string;
  about: string;
  commitmentToAccessibility: string;
  website: string;
  verified: boolean;
}

export interface Filters {
  searchTerm: string;
  location:string;
  modalities: string[];
  jobTypes: string[];
  fullPhysicalAccess: boolean;
  adaptations: string[];
  verifiedOnly: boolean;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  jobs?: Job[];
}