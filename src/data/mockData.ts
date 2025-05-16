import { Company, Complaint, User } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Maria Silva',
    email: 'maria@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'João Santos',
    email: 'joao@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    createdAt: new Date('2023-02-20')
  },
  {
    id: '3',
    name: 'Ana Oliveira',
    email: 'ana@example.com',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    createdAt: new Date('2023-03-10')
  }
];

// Mock Companies
export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'TechNova',
    category: 'Eletrônicos',
    logo: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg',
    averageRating: 2.1,
    totalComplaints: 32,
    responseRate: 75
  },
  {
    id: '2',
    name: 'SuperCompras',
    category: 'Varejo',
    logo: 'https://images.pexels.com/photos/3277808/pexels-photo-3277808.jpeg',
    averageRating: 3.4,
    totalComplaints: 48,
    responseRate: 62
  },
  {
    id: '3',
    name: 'BancoSeguro',
    category: 'Financeiro',
    logo: 'https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg',
    averageRating: 1.8,
    totalComplaints: 89,
    responseRate: 43
  },
  {
    id: '4',
    name: 'FonoMax',
    category: 'Telecomunicações',
    logo: 'https://images.pexels.com/photos/163007/phone-old-year-built-1955-bakelite-163007.jpeg',
    averageRating: 1.5,
    totalComplaints: 156,
    responseRate: 28
  },
  {
    id: '5',
    name: 'AquaVida',
    category: 'Utilidades',
    logo: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg',
    averageRating: 4.2,
    totalComplaints: 17,
    responseRate: 95
  }
];

// Mock Complaints
export const mockComplaints: Complaint[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Maria Silva',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    companyId: '1',
    companyName: 'TechNova',
    title: 'Produto com defeito e sem assistência',
    description: 'Comprei um notebook que veio com defeito na tela. Ao entrar em contato com a assistência, fui ignorada diversas vezes e já se passaram 3 semanas sem solução.',
    rating: 1,
    status: 'pending',
    weight: 0,
    agrees: 0,
    disagrees: 0,
    createdAt: new Date('2023-05-12'),
    updatedAt: new Date('2023-05-12'),
    responses: [
      {
        id: '101',
        complaintId: '1',
        authorType: 'company',
        authorId: '1',
        authorName: 'TechNova Suporte',
        content: 'Prezada Maria, lamentamos o ocorrido. Estamos verificando seu caso e entraremos em contato em até 24h para resolução.',
        createdAt: new Date('2023-05-14')
      },
      {
        id: '102',
        complaintId: '1',
        authorType: 'user',
        authorId: '1',
        authorName: 'Maria Silva',
        content: 'Já se passaram 48h e não recebi nenhum contato conforme prometido.',
        createdAt: new Date('2023-05-16')
      }
    ]
  },
  {
    id: '2',
    userId: '2',
    userName: 'João Santos',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    companyId: '3',
    companyName: 'BancoSeguro',
    title: 'Cobranças indevidas na fatura do cartão',
    description: 'Estou há 3 meses tentando resolver cobranças que não reconheço na minha fatura. A cada ligação me pedem os mesmos documentos e o problema não é resolvido.',
    rating: 2,
    status: 'in-progress',
    weight: 0,
    agrees: 0,
    disagrees: 0,
    createdAt: new Date('2023-06-05'),
    updatedAt: new Date('2023-06-10'),
    responses: [
      {
        id: '201',
        complaintId: '2',
        authorType: 'company',
        authorId: '3',
        authorName: 'BancoSeguro Atendimento',
        content: 'Sr. João, identificamos seu caso e estamos analisando as transações. Solicitamos 5 dias úteis para resposta definitiva.',
        createdAt: new Date('2023-06-07')
      }
    ]
  },
  {
    id: '3',
    userId: '3',
    userName: 'Ana Oliveira',
    userAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    companyId: '4',
    companyName: 'FonoMax',
    title: 'Cobrança após cancelamento da linha',
    description: 'Cancelei minha linha telefônica há 2 meses e continuo recebendo cobranças. Já liguei diversas vezes e sempre dizem que vai ser resolvido, mas nada acontece.',
    rating: 1,
    status: 'ignored',
    weight: 0,
    agrees: 0,
    disagrees: 0,
    createdAt: new Date('2023-04-15'),
    updatedAt: new Date('2023-04-15'),
    responses: []
  },
  {
    id: '4',
    userId: '1',
    userName: 'Maria Silva',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    companyId: '2',
    companyName: 'SuperCompras',
    title: 'Produto não entregue e sem reembolso',
    description: 'Fiz uma compra online há mais de 30 dias, o produto não foi entregue e ao solicitar reembolso fui informada que precisava aguardar mais 15 dias úteis.',
    rating: 2,
    status: 'resolved',
    weight: 0,
    agrees: 0,
    disagrees: 0,
    createdAt: new Date('2023-03-22'),
    updatedAt: new Date('2023-04-18'),
    responses: [
      {
        id: '401',
        complaintId: '4',
        authorType: 'company',
        authorId: '2',
        authorName: 'SuperCompras Atendimento',
        content: 'Sra. Maria, identificamos o problema na entrega e já processamos o reembolso integral que estará disponível em até 7 dias úteis.',
        createdAt: new Date('2023-04-10')
      },
      {
        id: '402',
        complaintId: '4',
        authorType: 'user',
        authorId: '1',
        authorName: 'Maria Silva',
        content: 'Confirmo que recebi o reembolso. Agradeço a resolução.',
        createdAt: new Date('2023-04-18')
      }
    ]
  },
  {
    id: '5',
    userId: '2',
    userName: 'João Santos',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    companyId: '5',
    companyName: 'AquaVida',
    title: 'Falta de água sem aviso prévio',
    description: 'Fiquei sem água por 2 dias sem nenhum aviso prévio ou previsão de normalização. Tentei contato diversas vezes sem sucesso.',
    rating: 3,
    status: 'resolved',
    weight: 0,
    agrees: 0,
    disagrees: 0,
    createdAt: new Date('2023-05-30'),
    updatedAt: new Date('2023-06-02'),
    responses: [
      {
        id: '501',
        complaintId: '5',
        authorType: 'company',
        authorId: '5',
        authorName: 'AquaVida Relacionamento',
        content: 'Sr. João, houve um rompimento emergencial na rede da sua região. Lamentamos não ter conseguido avisar previamente. O abastecimento já foi normalizado e estamos creditando um desconto na sua próxima fatura.',
        createdAt: new Date('2023-06-01')
      },
      {
        id: '502',
        complaintId: '5',
        authorType: 'user',
        authorId: '2',
        authorName: 'João Santos',
        content: 'Agradeço o retorno e reconhecimento do problema. O fornecimento já foi normalizado.',
        createdAt: new Date('2023-06-02')
      }
    ]
  }
];