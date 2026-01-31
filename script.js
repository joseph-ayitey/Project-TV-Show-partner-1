//You can edit ALL of the code here
const root = document.getElementById("root");

// Get all episodes from provided file
const episodes = getAllEpisodes();

// Create page title
const title = document.createElement("h1");
title.textContent = "TV Show Episodes";
root.appendChild(title);

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;
