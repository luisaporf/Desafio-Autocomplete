import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';
import { gql, useLazyQuery } from '@apollo/client';

// Consulta GraphQL
const GET_SUGGESTIONS_QUERY = gql`
  query GetSuggestions($term: String!) {
    getSuggestions(term: $term)
  }
`;

export const SearchBar = ({ setResults, onInputChange }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const [getSuggestions, { loading, error, data }] = useLazyQuery(GET_SUGGESTIONS_QUERY);

  useEffect(() => {
    if (data && data.getSuggestions) {
      setSuggestions(data.getSuggestions);
      setResults(data.getSuggestions); // ainda atualiza o App
    } else {
      setSuggestions([]);
      setResults([]);
    }
  }, [data, setResults]);

  useEffect(() => {
    if (error) {
      console.error('ERRO NA QUERY GRAPHQL:', error);
    }
  }, [error]);

  const handleChange = (value) => {
    setInput(value);
    if (onInputChange) onInputChange(value);

    if (value.length >= 4) {
      getSuggestions({ variables: { term: value } });
    } else {
      setSuggestions([]);
      setResults([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]);
    setResults([]); // limpa sugestões
    if (onInputChange) onInputChange(suggestion);
  };

  // Função que retorna o texto com highlight (negrito + sublinhado)
  const highlightMatch = (text, term) => {
    if (!term) return text;
  
    const index = text.toLowerCase().indexOf(term.toLowerCase());
    if (index === -1) return text;
  
    const before = text.slice(0, index);
    const match = text.slice(index, index + term.length);
    const after = text.slice(index + term.length);
  
    return (
      <>
        {before}
        <strong>{match}</strong>
        {after}
      </>
    );
  };
  

  return (
    <div className="search-container">
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          placeholder="Digite o que você procura..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>

      {suggestions.length > 0 && (
        <div className="results-list">
          {suggestions.map((suggestion, id) => (
            <div
              key={`${suggestion}-${id}`}
              className="search-result"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {highlightMatch(suggestion, input)}
            </div>
          ))}

        </div>
      )}
    </div>
  );
};
