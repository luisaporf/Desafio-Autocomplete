import React from 'react';
import './SearchResultsList.css';
import { SearchResult } from './SearchResult';

// Renderiza a lista completa de sugestões
export const SearchResultsList = ({ results, searchTerm }) => {
    return (
      <div className="results-list">
        {results.map((result, id) => (
          <SearchResult 
            result={result} 
            searchTerm={searchTerm} 
            key={`${result}-${id}`} 
          />
        ))}
      </div>
    );
  };