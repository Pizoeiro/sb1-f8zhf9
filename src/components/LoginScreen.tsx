import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Lock, Smile } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { auth, db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import ThemeToggle from './ThemeToggle';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated && auth.currentUser) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const checkUserExists = async (username: string) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim()) {
      setError('Por favor, digite seu nome de usuário');
      return;
    }

    if (!/^\d{4}$/.test(password)) {
      setError('A senha deve conter exatamente 4 números');
      return;
    }

    try {
      const userExists = await checkUserExists(username);

      if (isLogin) {
        // Login flow
        if (!userExists) {
          setError('Usuário não encontrado');
          return;
        }

        // Verify password from Firestore
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', username));
        const snapshot = await getDocs(q);
        const userData = snapshot.docs[0].data();

        if (userData.password !== password) {
          setError('Senha incorreta');
          return;
        }

        await login(username, userData.emoji);
      } else {
        // Register flow
        if (userExists) {
          setError('Este nome de usuário já está em uso');
          return;
        }

        await login(username, selectedEmoji, password);
      }

      navigate('/');
    } catch (error) {
      console.error('Error during authentication:', error);
      setError('Erro ao processar a solicitação. Tente novamente.');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPassword(value);
  };

  const [selectedEmoji, setSelectedEmoji] = useState('🐱');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const ANIMAL_EMOJIS = [
    // Mammals
    '🐱', '🐶', '🦊', '🦁', '🐯', '🐼', '🐨', '🐮', '🐷', '🦄',
    '🐰', '🐭', '🐹', '🐻', '🐸', '🦒', '🦘', '🦬', '🦌', '🐴',
    '🐿️',
    // Birds
    '🦜', '🦅', '🦆', '🦢', '🦉', '🦚', '🦃', '🐔', '🐧', '🦤',
    // Sea Life
    '🐠', '🐡', '🦈', '🐋', '🐳', '🐙', '🦑', '🦐', '🦞', '🦀',
    // Insects & Others
    '🦋', '🐝', '🐞', '🐌', '🦗', '🐢', '🦎', '🐍', '🦕', '🦖'
  ];

  const EMOJI_CATEGORIES = [
    { name: 'Mamíferos', emojis: ANIMAL_EMOJIS.slice(0, 21) },
    { name: 'Aves', emojis: ANIMAL_EMOJIS.slice(21, 31) },
    { name: 'Vida Marinha', emojis: ANIMAL_EMOJIS.slice(31, 41) },
    { name: 'Insetos e Outros', emojis: ANIMAL_EMOJIS.slice(41, 51) }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <ThemeToggle />
      <div className="glass-effect rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://i.imgur.com/BXziuHD.png"
            alt="Mascote da Casa Amarela"
            className="w-32 h-32 mb-4 animate-float"
          />
          <h1 className="text-3xl font-bold mb-2">A Casa Amarela</h1>
          <p className="text-lg mb-2">Biblioteca de Jogos Educativos</p>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-lg transition-colors ${
              isLogin 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
            }`}
          >
            Entrar
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg transition-colors ${
              !isLogin 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
            }`}
          >
            Cadastrar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-xs">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50 pointer-events-none" />
              <input
                type="text"
                placeholder="Nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="auth-input pl-12 text-center"
                maxLength={20}
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-xs">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50 pointer-events-none" />
              <input
                type="password"
                placeholder="Senha (4 números)"
                value={password}
                onChange={handlePasswordChange}
                className="auth-input pl-12 text-center"
                inputMode="numeric"
                pattern="\d{4}"
              />
            </div>
            <p className="text-sm mt-1 opacity-75">Digite uma senha de 4 números</p>
          </div>

          {!isLogin && (
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900 transition-colors"
              >
                <span className="text-2xl">{selectedEmoji}</span>
                <Smile className="w-5 h-5" />
                <span className="text-sm">Escolha seu animal</span>
              </button>

              {showEmojiPicker && (
                <div className="mt-2 p-4 glass-card rounded-lg max-h-64 overflow-y-auto">
                  {EMOJI_CATEGORIES.map((category) => (
                    <div key={category.name} className="mb-4">
                      <h3 className="text-sm font-semibold mb-2">{category.name}</h3>
                      <div className="grid grid-cols-5 gap-2">
                        {category.emojis.map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => {
                              setSelectedEmoji(emoji);
                              setShowEmojiPicker(false);
                            }}
                            className={`text-2xl p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900 transition-colors ${
                              selectedEmoji === emoji ? 'bg-purple-100 dark:bg-purple-800' : ''
                            }`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {error && <p className="error-message text-center">{error}</p>}

          <button type="submit" className="auth-button">
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>

        <p className="text-xs text-center mt-8 opacity-50">
          Esta página está em construção (Beta). Erros podem acontecer.
        </p>
      </div>
    </div>
  );
}