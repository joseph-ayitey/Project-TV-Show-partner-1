/*You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = `Got ${episodeList.length} episode(s)`;
}*/

const root = document.getElementById("root");

// Get all episodes from provided file
const episodes = getAllEpisodes();

// Create page title
const title = document.createElement("h1");
title.textContent = "TV Show Episodes";
root.appendChild(title); 

// Container for episodes
const episodesContainer = document.createElement("section");
episodesContainer.id = "episodes";
root.appendChild(episodesContainer);

// Render all episodes
episodes.forEach((episode) => {
  const episodeCode = formatEpisodeCode(
    episode.season,
    episode.number
  );

  const card = document.createElement("article");
  card.className = "episode-card";

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

  episodesContainer.appendChild(card);
});

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

// Utility: zero-padded episode code
function formatEpisodeCode(season, number) {
  const s = String(season).padStart(2, "0");
  const e = String(number).padStart(2, "0");
  return `S${s}E${e}`;
}


window.onload = setup;
