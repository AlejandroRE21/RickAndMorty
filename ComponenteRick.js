import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RickAndMorty = () => {
  const [characters, setCharacters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character/');
        setCharacters(response.data.results);
      } catch (error) {
        console.error('Error API:', error);
        setCharacters([]);
      }
    };

    fetchCharacters();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % characters.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + characters.length) % characters.length);
  };

  const currentCharacter = characters[currentIndex];

  return (
    <div>
      <h1>Personajes de Rick and Morty</h1>
      {characters.length > 0 ? (
        <div>
          <CharacterTable character={currentCharacter} />
          <div>
            <button className="button" onClick={handlePrev}>Anterior</button>
            <button className="button" onClick={handleNext}>Siguiente</button>
          </div>
        </div>
      ) : (
        <p>Cargando personajes...</p>
      )}
    </div>
  );
};

const CharacterTable = ({ character }) => {
  return (
    <table className="character-table">
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Especie</th>
          <th>Origen</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr key={character.id}>
          <td>
            <img src={character.image} alt={character.name} />
          </td>
          <td>{character.name}</td>
          <td>{character.species}</td>
          <td>{character.origin.name}</td>
          <td>{character.status}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default RickAndMorty;