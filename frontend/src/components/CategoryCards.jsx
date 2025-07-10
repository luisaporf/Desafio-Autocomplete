import React from 'react';
import './CategoryCards.css';
import {
  FiShoppingCart,
  FiShield,
  FiBriefcase,
  FiUsers,
  FiBookOpen,
  FiDollarSign,
} from 'react-icons/fi';

// Define os dados das categorias, incluindo nome e o componente do ícone.
const categories = [
  { name: 'Direito do Consumidor', icon: <FiShoppingCart size={32} color="#5a2d82" /> },
  { name: 'Direito Penal', icon: <FiShield size={32} color="#5a2d82" /> },
  { name: 'Direito Trabalhista', icon: <FiBriefcase size={32} color="#5a2d82" /> },
  { name: 'Direito de Família', icon: <FiUsers size={32} color="#5a2d82" /> },
  { name: 'Direito Civil', icon: <FiBookOpen size={32} color="#5a2d82" /> },
  { name: 'Direito Tributário', icon: <FiDollarSign size={32} color="#5a2d82" /> },
];

// Componente para exibir uma grade de cards de categorias clicáveis.
export const CategoryCards = ({ onCategoryClick }) => {
  return (
    <div className="category-section">
      <h3 className="category-title">Explore por área</h3>
      <div className="category-grid">
        {categories.map((category) => (
          <div
            key={category.name}
            className="category-card"
            onClick={() => onCategoryClick(category.name)}
          >
            <div className="category-icon">
              {category.icon}
            </div>
            <p className="category-name">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};