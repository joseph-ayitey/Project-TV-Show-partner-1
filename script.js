// You can edit ALL of the code here
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
  updateEpisodeCount(filteredEpisodes.length);
  populateEpisodeSelect(allEpisodes);

  const searchInput = document.getElementById("searchInput");
  const episodeSelect = document.getElementById("episodeSelect");

  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();

    filteredEpisodes = allEpisodes.filter((ep) => {
      return (
        ep.name.toLowerCase().includes(term) ||
        ep.summary.toLowerCase().includes(term)
      );
    });

    renderEpisodes(filteredEpisodes);
    updateEpisodeCount(filteredEpisodes.length);
  });

  episodeSelect.addEventListener("change", () => {
    const selectedId = episodeSelect.value;
    if (!selectedId) return;

    const el = document.getElementById(`episode-${selectedId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  });
}

function createLayout() {
  root.innerHTML = "";

  // Create page title
  const title = document.createElement("h1");
  title.textContent = "TV Show Episodes";
  root.appendChild(title);

   const controls = document.createElement("div");
  controls.className = "controls";
  
  // Search input
  const searchInput = document.createElement("input");
  searchInput.id = "searchInput";
  searchInput.type = "search";
  searchInput.placeholder = "Search episodes...";
  root.appendChild(searchInput);

  // Episode count
  const episodeCount = document.createElement("p");
  episodeCount.id = "episodeCount";
  root.appendChild(episodeCount);

  // Episode selector
  const episodeSelect = document.createElement("select");
  episodeSelect.id = "episodeSelect";
  root.appendChild(episodeSelect);

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

//ADD A FUNCTION TO TAKE YOU TO THE VIEW PAGE TO WATCH THE MOVIE.
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

function updateEpisodeCount(count) {
  const episodeCount = document.getElementById("episodeCount");
  episodeCount.textContent = `Displaying ${count} / ${allEpisodes.length} episodes`;
}

function populateEpisodeSelect(episodes) {
  const episodeSelect = document.getElementById("episodeSelect");
  episodeSelect.innerHTML = `<option value="">Jump to episode...</option>`;

  episodes.forEach((ep) => {
    const option = document.createElement("option");
    option.value = ep.id;
    option.textContent = `${formatEpisodeCode(ep.season, ep.number)} - ${ep.name}`;
    episodeSelect.appendChild(option);
  });
}

window.onload = setup;
