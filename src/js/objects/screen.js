const screen = {
  // No objeto ja estamos atribuindo seu valor
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    // user é o objeto do usuário
    // ?? - É um operador e coalescência nula, ou seja vai testar para ver se
    // é nulo e se for acrescentará o testo digitado em sequência.							
    this.userProfile.innerHTML = `<div class="info">
                                    <img src="${user.avatarUrl}" alt="Foto do Perfil do usuário"/>
                                    <div class="data">
                                      <h1>${user.name ?? "Não Possui nome cadastrado"}</h1>
                                      <p>${user.bio ?? "Não possui bio cadastrada"}</p>
                                    </div>
                                  </div>`;
    this.userProfile.innerHTML += `<div class="nets">
                                    <div class="followers">
                                      <h2>Seguidores:</h2>
                                      <p>${user.followers}</p>
                                    </div> 
                                    <div class="following">
                                      <h2>Seguidores:</h2>
                                      <p>${user.following}</p>
                                    </div>                                  
                                  </div>`;
    let repositoriesItens = "";
    user.repositories.forEach(
      (repo) =>
        (repositoriesItens += `<li>
                                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                                <div>
                                  <p>🍴${repo.forks}</p>
                                  <p>⭐${repo.stargazers_count}</p>
                                  <p>👀${repo.watchers}</p>
                                  <p>💻${repo.language}</p>
                                  </div>
                              </li>`)
    );
    if (user.repositories.length > 0) {
        this.userProfile.innerHTML += `<div class="repositories section">
                                        <h2>Repositórios</h2>
                                        <Ul>${repositoriesItens}</ul>
                                      </div>`;
    };
    let eventsItens = "";
    user.events.forEach(
      (event) =>
        (eventsItens += `<li>${event.repo.name} - ${event.payload.commits[0].message}</li>`)
    );
    if (user.events.length > 0) {
      this.userProfile.innerHTML += `<div class="events">
                                      <h2>Eventos</h2>
                                      <ul>${eventsItens}</ul>
                                    </div>`;
  };
  },
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
  }
};

export { screen };
