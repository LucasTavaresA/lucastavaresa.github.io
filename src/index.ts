import { Octokit } from '@octokit/rest';

const octokit = new Octokit();

const star_svg: Readonly<string> = `<svg aria-label="star" role="img" height="16" viewBox="0 0 16 12" version="1.1" width="16" data-view-component="true">
  <path fill="white" fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z" />
</svg>`;
const clip_svg: Readonly<string> = `<svg aria-hidden="true" role="img" viewBox="0 0 16 16" width="30" height="16" fill="currentColor" style="display: inline; user-select: none; overflow: visible;">
  <path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z" />
</svg>`;

const repos: ReadonlyArray<string> = [
    "Google",
    "Jokenpo",
    "calculadora-csharp",
    "sgrade",
    "Exercicios-CSharp-OOP",
    "SingleComment.nvim",
];

const repolist = document.getElementById("projects") as HTMLUListElement;

async function GetRepoInfo(repo: string) {
    return octokit.rest.repos
        .get({
            owner: "LucasTavaresA",
            repo: repo,
        })
        .then((response) => {
            const li = document.createElement("li");

            const name = document.createElement("a");
            li.appendChild(name);
            if (response.data.homepage != "") {
                name.setAttribute("href", response.data.homepage!);
                name.innerHTML = `<p>` + response.data.name + clip_svg + `</p>`;
            } else {
                name.setAttribute("href", response.data.html_url);
                name.textContent = response.data.name;
            }

            const description = document.createElement("p");
            li.appendChild(description);
            description.textContent = response.data.description;

            const topics = document.createElement("ul");
            topics.setAttribute("class", "topics");
            li.appendChild(topics);
            response.data.topics!.forEach((topic) => {
                const t = document.createElement("li");
                const a = document.createElement("a");
                t.appendChild(a);
                a.setAttribute("href", "https://github.com/topics/" + topic);
                a.innerText = topic;
                topics.appendChild(t);
            });

            const info = document.createElement("div");
            li.appendChild(info);
            info.setAttribute("class", "info");

            const language = document.createElement("div");
            info.appendChild(language);
            language.setAttribute("id", response.data.language!);
            language.setAttribute("class", "language");

            const lang_text = document.createElement("p");
            info.appendChild(lang_text);
            lang_text.textContent = response.data.language;

            const svg = document.createElement("a");
            info.appendChild(svg);
            svg.setAttribute("id", "stars");
            svg.setAttribute("href", response.data.html_url + "/stargazers");
            svg.innerHTML = star_svg;

            const stars = document.createElement("a");
            info.appendChild(stars);
            stars.setAttribute("id", "stars");
            stars.setAttribute("href", response.data.html_url + "/stargazers");

            const count = document.createElement("p");
            stars.appendChild(count);
            count.textContent = response.data.stargazers_count.toString();

            repolist.prepend(li);
        })
        .catch((error: ErrorEvent) => {
            console.error("ERROR: could not get repo information! \n" + error);
        });
}

repos.forEach((repo) => {
    GetRepoInfo(repo);
});