import { useState } from 'react';
import './App.css';
import { SearchResultsList } from './components/SearchResultsList';
import { JusticeHeader } from './components/JusticeScale';
import { CategoryCards } from './components/CategoryCards';
import { Footer } from './components/Footer';

// Componente principal que organiza a estrutura da aplicação.
function App() {
  // Gerencia o estado dos resultados e do texto da busca.
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  // Atualiza o texto da busca quando uma categoria é clicada.
  const handleCategoryClick = (categoryName) => {
    setSearchText(categoryName);
  };

  return (
    <div className="app-layout">
      <JusticeHeader
        searchValue={searchText}
        onSearchChange={setSearchText}
        setResults={setResults}
      />
      <main style={{ paddingTop: '200px', width: '100%' }}>
        <CategoryCards onCategoryClick={handleCategoryClick} />
        <div style={{ maxWidth: '600px', margin: 'auto' }}>
          <SearchResultsList results={results} searchTerm={searchText} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;