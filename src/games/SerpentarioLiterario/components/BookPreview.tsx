import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

interface BookPreviewProps {
  title: string;
  author: string;
  genre: string;
  bookUrl: string;
  coverUrl?: string;
}

export default function BookPreview({ title, author, genre, bookUrl, coverUrl }: BookPreviewProps) {
  return (
    <div className="glass-card p-4 rounded-lg flex items-start gap-4 animate-fadeIn">
      <div className="relative w-24 h-32 flex-shrink-0 rounded overflow-hidden">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <div className="w-full h-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-purple-500" />
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg truncate">{title}</h3>
          <a
            href={`https://www.acervobca.com${bookUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-full hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors flex-shrink-0"
            title="Ler o livro"
          >
            <ExternalLink className="w-4 h-4 text-purple-500" />
          </a>
        </div>
        <div className="text-sm opacity-75 truncate">{author}</div>
        <div className="text-xs text-purple-500 dark:text-purple-400 mt-1">{genre}</div>
        
        <a
          href={`https://www.acervobca.com${bookUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
        >
          Ler agora →
        </a>
      </div>
    </div>
  );
}