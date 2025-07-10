import React from "react";

export const SearchResult = ({ result, searchTerm }) => {
  if (!searchTerm) {
    return <div className="search-result">{result}</div>;
  }

  const regex = new RegExp(`(${searchTerm})`, "i");
  const parts = result.split(regex);

  return (
    <div className="search-result">
      {parts.map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <strong key={index} style={{ fontWeight: "bold", textDecoration: "underline" }}>
            {part}
          </strong>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </div>
  );
};
