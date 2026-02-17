//You can edit ALL of the code here
const root = document.getElementById("root");

// State
let allEpisodes = [];
let filteredEpisodes = [];

// Init
function setup() {
  allEpisodes = getAllEpisodes();
  filteredEpisodes = allEpisodes;

  createLayout();
  renderEpisodes(filteredEpisodes);
}

function createLayout() {
  root.innerHTML = "";

  // Create page title
  const title = document.createElement("h1");
  title.textContent = "TV Show Episodes";
  root.appendChild(title);

  // Container for episodes
  const episodesContainer = document.createElement("section");
  episodesContainer.id = "episodes";
  root.appendChild(episodesContainer);

  // Footer attribution (TVMaze licensing requirement)
  const footer = document.createElement("footer");
  footer.innerHTML = `
    <p>
      Data originally from
      <a href="https://www.tvmaze.com" target="_blank" rel="noopener">
        TVMaze.com
      </a>
    </p>
  `;
  root.appendChild(footer);
}

function renderEpisodes(episodeList) {
  const episodesContainer = document.getElementById("episodes");
  episodesContainer.innerHTML = "";

  episodeList.forEach((episode) => {
    const card = createEpisodeCard(episode);
    episodesContainer.appendChild(card);
  });
}

function createEpisodeCard(episode) {
  const episodeCode = formatEpisodeCode(episode.season, episode.number);

  const card = document.createElement("article");
  card.className = "episode-card";
  card.id = `episode-${episode.id}`;

  card.innerHTML = `
    <h2>${episode.name}</h2>
    <p><strong>${episodeCode}</strong></p>

    ${
      episode.image
        ? `<img src="${episode.image.medium}" alt="${episode.name}">`
        : `<p>No image available</p>`
    }

    <div class="summary">
      ${episode.summary || "No summary available."}
    </div>

    <p>
      <a href="${episode.url}" target="_blank" rel="noopener">
        View on TVMaze
      </a>
    </p>
  `;

  return card;
}

// Utility: zero-padded episode code
function formatEpisodeCode(season, number) {
  const s = String(season).padStart(2, "0");
  const e = String(number).padStart(2, "0");
  return `S${s}E${e}`;
}

window.onload = setup;
