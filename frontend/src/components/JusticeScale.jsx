import React, { useEffect, useState } from "react";
import "./JusticeScale.css";
import { FaSearch } from "react-icons/fa";
import { gql, useLazyQuery } from "@apollo/client";

// Query GraphQL para buscar sugestões baseadas no termo digitado
const GET_SUGGESTIONS_QUERY = gql`
  query GetSuggestions($term: String!) {
    getSuggestions(term: $term)
  }
`;

// Cabeçalho da página com logo, título, slogan e barra de busca com sugestões
export const JusticeHeader = ({ searchValue, onSearchChange }) => {

  // Hook para buscar sugestões via Apollo quando o termo mudar
  const [getSuggestions, { data }] = useLazyQuery(GET_SUGGESTIONS_QUERY);

  // Estado para controlar índice ativo na lista de sugestões (setas)
  const [activeIndex, setActiveIndex] = useState(-1);

  // Estado que controla se a lista de sugestões está visível
  const [showDropdown, setShowDropdown] = useState(false);

  // Lista de sugestões atuais
  const [suggestions, setSuggestions] = useState([]);

  // Atualiza sugestões e visibilidade sempre que recebemos novos dados
  useEffect(() => {
    if (data && data.getSuggestions) {
      setSuggestions(data.getSuggestions);
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, [data]);

  // Lida com mudanças no campo de busca
  const handleChange = (value) => {
    onSearchChange(value);
    setActiveIndex(-1); 
    if (value.length >= 4) {
      getSuggestions({ variables: { term: value } }); 
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  return (
    <header className="justice-header">
      {/* Logo com animação e label para acessibilidade */}
      <div className="justice-logo-block" role="img" aria-label="Balança da Justiça">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="justice-scale-svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75
               M12 20.25c1.472 0 2.882.265 4.185.75
               M18.75 4.97A48.416 48.416 0 0 0 12 4.5
               c-2.291 0-4.545.16-6.75.47m13.5 0
               c1.01.143 2.01.317 3 .52m-3-.52
               2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352
               5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Z
               m-16.5.52c.99-.203 1.99-.377 3-.52m0 0
               2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352
               5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z"
          />
        </svg>
      </div>

      {/* Conteúdo central: título, slogan e barra de busca */}
      <div className="justice-center-content">
        <h1 className="justice-title">Consulta Jurídica</h1>
        <p className="justice-slogan">
          Pesquise termos, conceitos e referências jurídicas com rapidez e precisão.
        </p>

        {/* Wrapper da busca e sugestões */}
        <div className="justice-search-wrapper">
          <div className="justice-search">
            <input
              className="search-input"
              type="text"
              placeholder="Digite sua consulta..."
              value={searchValue}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)} 
              onFocus={() => {
                if (suggestions.length > 0) setShowDropdown(true); 
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1)); 
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  setActiveIndex((prev) => Math.max(prev - 1, 0)); 
                } else if (e.key === 'Enter' && activeIndex >= 0) {
                  handleChange(suggestions[activeIndex]);
                  setShowDropdown(false);
                } else if (e.key === 'Escape') {
                  setShowDropdown(false); 
                }
              }}
            />

            {/* Ícone da lupa */}
            <FaSearch className="search-icon" />
          </div>

          {/* Lista de sugestões visível quando showDropdown é true */}
          {showDropdown && (
            <ul className="suggestions-dropdown">
              {suggestions.map((item, index) => {
                // Destaca a parte que corresponde ao termo buscado
                const lowerItem = item.toLowerCase();
                const lowerSearch = searchValue.toLowerCase();
                const matchIndex = lowerItem.indexOf(lowerSearch);

                let highlighted;
                if (matchIndex !== -1 && searchValue !== '') {
                  const before = item.slice(0, matchIndex);
                  const match = item.slice(matchIndex, matchIndex + searchValue.length);
                  const after = item.slice(matchIndex + searchValue.length);

                  highlighted = (
                    <>
                      {before}
                      <strong>{match}</strong>
                      {after}
                    </>
                  );
                } else {
                  highlighted = item;
                }

                return (
                  <li
                    key={index}
                    className={`suggestion-item ${activeIndex === index ? 'active' : ''}`}
                    onMouseDown={() => handleChange(item)}
                  >
                    {highlighted}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};
