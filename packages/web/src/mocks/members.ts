import type { Member } from '../types/member';

// Dados demonstrativos até a integração com as rotas de membros e sessão.
const memberNames = [
    'Marina Costa',
    'João Pedro',
    'Ana Lima',
    'Carlos Nunes',
    'Beatriz Rocha',
    'Lucas Freire',
    'Fernanda Melo',
    'Rafael Gomes',
    'Camila Alves',
    'Pedro Martins',
    'Larissa Moraes',
    'Bruno Dias',
    'Isabela Cruz',
    'Thiago Ribeiro',
    'Nathalia Souza',
    'Felipe Araujo',
    'Julia Ferreira',
    'Gustavo Barros',
    'Amanda Lopes',
    'Vinicius Reis',
    'Bianca Tavares',
    'Daniel Mendes',
    'Leticia Prado',
    'Murilo Xavier',
    'Sofia Castro',
    'Henrique Maia',
    'Luana Pires',
    'Eduardo Ramos',
    'Clara Moura',
    'Matheus Luz',
    'Manuela Reis',
    'Caio Monteiro',
    'Helena Farias',
    'Igor Teixeira',
    'Alice Neves',
    'Rodrigo Cunha',
    'Paula Abreu',
    'Diego Vieira',
    'Gabriela Mattos',
    'Renan Duarte',
    'Laura Cardoso',
    'Samuel Pinto',
];

export const currentMember: Member = {
    id: 'demo-current-member',
    name: 'Arthur Reis',
    number: 43,
    joinedAt: '2026-09-17T12:00:00Z',
};

export const members: Member[] = [
    ...memberNames.map((name, index) => ({
        id: `demo-member-${index + 1}`,
        name,
        number: index + 1,
        joinedAt: new Date(Date.UTC(2026, 7, 28 + Math.floor(index / 2), 12)).toISOString(),
    })),
    currentMember,
];
