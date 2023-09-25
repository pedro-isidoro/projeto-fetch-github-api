import { getUser } from "./services/user.js";
import { getRepositories } from "./services/repositories.js";
import { getEvents } from "./services/events.js";
import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";

document.getElementById("btn-search").addEventListener("click", () => {
  const userName = document.getElementById("input-search").value;
  if (validateEmptyInput(userName)) return;
  getUserData(userName);
});

document.getElementById("input-search").addEventListener("keyup", (e) => {
  const userName = e.target.value; //Para pegar o valor dentro do input
  const key = e.which || e.keyCode; // Para pegar o código da chave(para a tecla)
  const isEnterKeyPressed = key === 13; // Para pegar a tecla Enter
  if (isEnterKeyPressed) {
    if (validateEmptyInput(userName)) return;
    getUserData(userName);
  }
});

// Usamos ele para verificar se o usuário preencheu a barra de pesquisa
function validateEmptyInput(userName) {
  if (userName.length === 0) {
    alert("Preencha o campo com o nome do usuário do GitHub");
    return true;
  }
}

async function getUserData(userName) {
  //Busca as informações do usuário
  const userResponse = await getUser(userName);
  //verifica se o usuário existe, e se não ele para e não mostra mensagem de erro
  if (userResponse.message === "Not Found") {
    screen.renderNotFound();
    return;
  }
  const repositoriesResponse = await getRepositories(userName);
  const eventsResponse = await getEvents(userName);
  console.log('Aqui', eventsResponse)

  user.setInfo(userResponse);
  user.setRepositories(repositoriesResponse);
  user.setEvents(eventsResponse);
  console.log(user.events)

  screen.renderUser(user);
}
