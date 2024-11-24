import { Difficulty, DifficultyConfig, LiteraryWord } from './types';

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  facil: {
    speed: 200,
    scoreMultiplier: 1,
    description: 'Velocidade menor, ideal para iniciantes',
    maxWords: 5
  },
  medio: {
    speed: 150,
    scoreMultiplier: 1.5,
    description: 'Velocidade moderada, para jogadores intermediários',
    maxWords: 8
  },
  dificil: {
    speed: 100,
    scoreMultiplier: 2,
    description: 'Velocidade alta, para jogadores experientes',
    maxWords: 12
  },
  extremo: {
    speed: 80,
    scoreMultiplier: 3,
    description: 'Modo infinito com velocidade extrema',
  }
};

// Updated words list with book URLs, metadata and cover images
export const LITERARY_WORDS: LiteraryWord[] = [
  { 
    word: 'GUARANI', 
    bookUrl: '/livros/o-guarani', 
    type: 'book', 
    author: 'José de Alencar', 
    genre: 'Romance',
    coverUrl: 'https://i.imgur.com/8XL4UKY.png'
  },
  { 
    word: 'ALIENISTA', 
    bookUrl: '/livros/o-alienista', 
    type: 'book', 
    author: 'Machado de Assis', 
    genre: 'Conto',
    coverUrl: 'https://i.imgur.com/pKUfMNI.png'
  },
  { 
    word: 'BRASCUBAS', 
    bookUrl: '/livros/memorias-postumas-de-bras-cubas', 
    type: 'book', 
    author: 'Machado de Assis', 
    genre: 'Romance',
    coverUrl: 'https://i.imgur.com/JQYzxhV.png'
  },
  { 
    word: 'CORTICO', 
    bookUrl: '/livros/o-cortico', 
    type: 'book', 
    author: 'Aluísio Azevedo', 
    genre: 'Romance',
    coverUrl: 'https://i.imgur.com/L2RjDXg.png'
  },
  { 
    word: 'SERTOES', 
    bookUrl: '/livros/os-sertoes', 
    type: 'book', 
    author: 'Euclides da Cunha', 
    genre: 'Relato Histórico',
    coverUrl: 'https://i.imgur.com/YqVQv5M.png'
  },
  { 
    word: 'IRACEMA', 
    bookUrl: '/livros/iracema', 
    type: 'book', 
    author: 'José de Alencar', 
    genre: 'Romance',
    coverUrl: 'https://i.imgur.com/9XZyuVt.png'
  },
  { 
    word: 'SENHORA', 
    bookUrl: '/livros/senhora', 
    type: 'book', 
    author: 'José de Alencar', 
    genre: 'Romance',
    coverUrl: 'https://i.imgur.com/K2ZwFvP.png'
  },
  { 
    word: 'HELENA', 
    bookUrl: '/livros/helena', 
    type: 'book', 
    author: 'Machado de Assis', 
    genre: 'Romance',
    coverUrl: 'https://i.imgur.com/mN3TxZQ.png'
  },
  { 
    word: 'METAMORFOSE', 
    bookUrl: '/livros/a-metamorfose', 
    type: 'book', 
    author: 'Franz Kafka', 
    genre: 'Novela',
    coverUrl: 'https://i.imgur.com/4YZc6Y6.png'
  },
  { 
    word: 'MACBETH', 
    bookUrl: '/livros/macbeth', 
    type: 'book', 
    author: 'William Shakespeare', 
    genre: 'Peça de Teatro',
    coverUrl: 'https://i.imgur.com/UQw3Z7M.png'
  },
  { 
    word: 'HAMLET', 
    bookUrl: '/livros/hamlet', 
    type: 'book', 
    author: 'William Shakespeare', 
    genre: 'Peça de Teatro',
    coverUrl: 'https://i.imgur.com/vH9HrJ8.png'
  },
  { 
    word: 'QUIXOTE', 
    bookUrl: '/livros/dom-quixote', 
    type: 'book', 
    author: 'Miguel de Cervantes', 
    genre: 'Romance',
    coverUrl: 'https://i.imgur.com/ZQH8Yl7.png'
  },
  { 
    word: 'KARENINA', 
    bookUrl: '/livros/anna-karenina', 
    type: 'book', 
    author: 'Leon Tolstoi', 
    genre: 'Romance',
    coverUrl: 'https://i.imgur.com/1XqtcZL.png'
  },
  { 
    word: 'ORGULHO', 
    bookUrl: '/livros/orgulho-e-preconceito', 
    type: 'book', 
    author: 'Jane Austen', 
    genre: 'Romance',
    coverUrl: 'https://i.imgur.com/DwJEuE4.png'
  },
  { 
    word: 'MENSAGEM', 
    bookUrl: '/livros/mensagem', 
    type: 'book', 
    author: 'Fernando Pessoa', 
    genre: 'Poesia',
    coverUrl: 'https://i.imgur.com/XNy0rkZ.png'
  }
];

export const LITERARY_QUOTES: Record<string, string> = {
  'ALIENISTA': '"A ciência é meu emprego único; Itaguaí é meu universo." - O Alienista',
  'BRASCUBAS': '"Não tive filhos, não transmiti a nenhuma criatura o legado de nossa miséria." - Memórias Póstumas',
  'CORTICO': '"A vida é um jogo de sorte ou azar, em que a gente perde ou ganha." - O Cortiço',
  'SERTOES': '"O sertanejo é, antes de tudo, um forte." - Os Sertões',
  'GUARANI': '"O Guarani é o filho das florestas, o guerreiro invencível." - O Guarani',
  'IRACEMA': '"Iracema, a virgem dos lábios de mel." - Iracema',
  'SENHORA': '"O dinheiro não faz a felicidade, mas ajuda a ser feliz." - Senhora',
  'HELENA': '"A verdade é sempre o melhor caminho." - Helena',
  'METAMORFOSE': '"Quando Gregor Samsa acordou uma manhã..." - A Metamorfose',
  'MACBETH': '"A vida é uma história cheia de som e fúria." - Macbeth',
  'HAMLET': '"Ser ou não ser, eis a questão." - Hamlet',
  'QUIXOTE': '"Em um lugar da Mancha..." - Dom Quixote',
  'KARENINA': '"Todas as famílias felizes se parecem." - Anna Karenina',
  'ORGULHO': '"É uma verdade universalmente conhecida..." - Orgulho e Preconceito',
  'MENSAGEM': '"Tudo vale a pena se a alma não é pequena." - Mensagem'
};