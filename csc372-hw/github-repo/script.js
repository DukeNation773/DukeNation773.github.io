const repoList = document.getElementById("repo-list");
const searchBtn = document.getElementById("search-btn");
const usernameInput = document.getElementById("username");
const template = document.getElementById("repo-template");

const GITHUB_TOKEN = "";

searchBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  if (username) {
    fetchRepositories(username);
  }
});

async function fetchRepositories(username) {
  repoList.innerHTML = "";

  try {
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(GITHUB_TOKEN && { Authorization: `token ${GITHUB_TOKEN}` }),
        },
      }
    );

    if (!reposRes.ok) {
      throw new Error("User not found or API error.");
    }

    const repos = await reposRes.json();
    const maxRepos = 20;
    const limitedRepos = repos.slice(0, maxRepos);

    for (const repo of limitedRepos) {
      const card = template.content.cloneNode(true);

      card.querySelector(".repo-name").textContent = repo.name;
      card.querySelector(".repo-name").href = repo.html_url;
      card.querySelector(".repo-description").textContent =
        repo.description || "No description.";
      card.querySelector(".repo-created").textContent = new Date(
        repo.created_at
      ).toLocaleDateString();
      card.querySelector(".repo-updated").textContent = new Date(
        repo.updated_at
      ).toLocaleDateString();
      card.querySelector(".repo-watchers").textContent = repo.watchers_count;

      try {
        const langRes = await fetch(repo.languages_url, {
          headers: { Accept: "application/vnd.github+json" },
        });
        const langs = await langRes.json();
        card.querySelector(".repo-languages").textContent =
          Object.keys(langs).join(", ") || "N/A";
      } catch {
        card.querySelector(".repo-languages").textContent =
          "Error loading languages";
      }

      try {
        const commitRes = await fetch(repo.commits_url.replace("{/sha}", ""), {
          headers: { Accept: "application/vnd.github+json" },
        });
        const commits = await commitRes.json();
        card.querySelector(".repo-commits").textContent = Array.isArray(commits)
          ? commits.length
          : "N/A";
      } catch {
        card.querySelector(".repo-commits").textContent =
          "Error loading commits";
      }

      repoList.appendChild(card);
    }

    if (repos.length === 0) {
      const msg = document.createElement("p");
      msg.textContent = "This user has no public repositories.";
      repoList.appendChild(msg);
    }
  } catch (err) {
    const errorMsg = document.createElement("p");
    errorMsg.textContent = err.message;
    repoList.appendChild(errorMsg);
  }
}
