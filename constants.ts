
import { Job, Company } from './types';

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
    verified: true,
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
    verified: false,
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
    verified: true,
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
    verified: false,
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
    verified: true,
  },
];

export const MOCK_COMPANIES: Company[] = [
  {
    name: 'InovaTech',
    tagline: 'Inovando o futuro com tecnologia acessível.',
    about: 'A InovaTech é líder em soluções de software, dedicada a criar produtos que não apenas resolvem problemas complexos, mas também são acessíveis a todos. Acreditamos que a diversidade é nossa maior força e impulsiona a inovação.',
    commitmentToAccessibility: 'Nosso compromisso com a acessibilidade é fundamental. Oferecemos um ambiente de trabalho totalmente adaptado, com acesso físico completo, softwares assistivos, intérpretes de LIBRAS sob demanda e uma cultura que valoriza a flexibilidade. Todos os nossos produtos são desenvolvidos seguindo as diretrizes WCAG 2.1 AA.',
    website: '#',
    verified: true,
  },
  {
    name: 'FutureSystems',
    tagline: 'Construindo o amanhã, hoje.',
    about: 'Na FutureSystems, estamos na vanguarda da tecnologia de nuvem e IA. Nossa equipe global trabalha em projetos desafiadores que moldam o futuro da indústria digital.',
    commitmentToAccessibility: 'Somos uma empresa remote-first e nos esforçamos para criar um ambiente digital inclusivo. Oferecemos horários de trabalho flexíveis, apoio para configuração de home office ergonômico e comunicação adaptada para diferentes necessidades.',
    website: '#',
    verified: false,
  },
  {
    name: 'Soluções Eficientes',
    tagline: 'Otimizando processos, capacitando pessoas.',
    about: 'Somos especialistas em consultoria e gestão de processos de negócios. Nossa missão é tornar as empresas mais eficientes e preparadas para o futuro.',
    commitmentToAccessibility: 'Valorizamos cada membro de nossa equipe. Nossos escritórios são equipados com mobiliário adaptado e garantimos acessibilidade física completa. Oferecemos intérpretes de LIBRAS para reuniões e eventos importantes.',
    website: '#',
    verified: true,
  },
  {
    name: 'CodeMasters',
    tagline: 'Excelência em código, paixão por desafios.',
    about: 'Uma boutique de desenvolvimento de software de alta performance. Criamos soluções robustas e escaláveis para startups e grandes corporações.',
    commitmentToAccessibility: 'Como uma empresa que valoriza o trabalho focado, oferecemos horários flexíveis e um ambiente de trabalho assíncrono para acomodar as necessidades individuais de todos os colaboradores.',
    website: '#',
    verified: false,
  },
  {
    name: 'CriaVisão',
    tagline: 'Design centrado no ser humano.',
    about: 'Somos um estúdio de design de produto digital que acredita no poder do design para criar experiências memoráveis e inclusivas.',
    commitmentToAccessibility: 'Acessibilidade está no centro do nosso processo de design. Fornecemos softwares de leitura e contraste, garantimos que os prazos e testes sejam justos para todos e promovemos uma comunicação clara e adaptada em todas as equipes.',
    website: '#',
    verified: true,
  },
];