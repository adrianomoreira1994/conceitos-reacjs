import React, { useEffect, useState } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await api.get("/repositories");

      setRepositories(response.data);
    })();
  }, [repositories]);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: "Desafio React Native " + Date.now().toString(),
      url: "http://github.com/adrianomoreira1994",
      techs: ["React Native"],
      likes: 0,
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );

    const repos = repositories.slice(repositoryIndex, 1);

    setRepositories(repos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
