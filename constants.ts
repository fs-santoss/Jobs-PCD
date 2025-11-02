
import { Job } from './types';

export const ALL_MODALITIES = ['Home Office', 'Híbrido', 'Presencial'];
export const ALL_JOB_TYPES = ['Vaga Afirmativa (PCD)', 'Banco de Talentos', 'Jovem Aprendiz (PCD)'];
export const ALL_ADAPTATIONS = [
  'Intérprete de LIBRAS', 
  'Softwares de Leitura', 
  'Horários Flexíveis', 
  'Comunicação Adaptada',
  'Mobiliário Adaptado',
  'Tempo Adicional para Testes'
];

export const MOCK_JOBS: Job[] = [
  {
    id: 1,
    title: 'Analista de Dados Jr',
    company: 'InovaTech',
    location: 'São Paulo, SP',
    modality: 'Híbrido',
    jobType: 'Vaga Afirmativa (PCD)',
    description: 'Buscamos um Analista de Dados júnior para se juntar à nossa equipe. O candidato ideal terá paixão por dados e vontade de aprender.',
    salary: 4500,
    adaptations: ['Horários Flexíveis', 'Softwares de Leitura', 'Mobiliário Adaptado'],
    fullPhysicalAccess: true,
  },
  {
    id: 2,
    title: 'Desenvolvedor(a) Frontend Pleno',
    company: 'FutureSystems',
    location: 'Remoto',
    modality: 'Home Office',
    jobType: 'Vaga Afirmativa (PCD)',
    description: 'Desenvolvimento e manutenção de interfaces web com React e TypeScript. É necessário experiência com design responsivo e acessibilidade.',
    salary: 7000,
    adaptations: ['Horários Flexíveis', 'Comunicação Adaptada'],
    fullPhysicalAccess: false,
  },
  {
    id: 3,
    title: 'Assistente Administrativo',
    company: 'Soluções Eficientes',
    location: 'Rio de Janeiro, RJ',
    modality: 'Presencial',
    jobType: 'Jovem Aprendiz (PCD)',
    description: 'Oportunidade para jovens que buscam o primeiro emprego. Atividades de suporte administrativo, organização de documentos e atendimento.',
    adaptations: ['Intérprete de LIBRAS', 'Mobiliário Adaptado'],
    fullPhysicalAccess: true,
  },
  {
    id: 4,
    title: 'Engenheiro(a) de Software Sênior',
    company: 'CodeMasters',
    location: 'Remoto',
    modality: 'Home Office',
    jobType: 'Banco de Talentos',
    description: 'Estamos montando um banco de talentos para futuras posições de Engenharia de Software. Experiência com arquiteturas de microsserviços é um diferencial.',
    adaptations: ['Horários Flexíveis'],
    fullPhysicalAccess: false,
  },
  {
    id: 5,
    title: 'Designer UX/UI',
    company: 'CriaVisão',
    location: 'Curitiba, PR',
    modality: 'Híbrido',
    jobType: 'Vaga Afirmativa (PCD)',
    description: 'Criação de interfaces intuitivas e acessíveis para nossos produtos digitais. Experiência com Figma e WCAG é essencial.',
    salary: 6500,
    adaptations: ['Softwares de Leitura', 'Comunicação Adaptada', 'Tempo Adicional para Testes'],
    fullPhysicalAccess: true,
  },
];
