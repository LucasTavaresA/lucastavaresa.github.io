import { Octokit } from "@octokit/rest";

const octokit = new Octokit();

const star_svg: Readonly<string> = `<svg aria-label="star" role="img" height="16" viewBox="0 0 16 12" version="1.1" width="16" data-view-component="true"><path fill="white" fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z" /></svg>`;

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
			let homepage: string = "";
			let name: string = "";
			let topics: string = "";

			if (response.data.homepage != "") {
				homepage = response.data.homepage!;
				name = `<p>` + response.data.name + ` 🌎</p>`;
			} else {
				homepage = response.data.html_url;
				name = response.data.name;
			}

			response.data.topics!.forEach((topic) => {
				topics +=
					`<li><a href="https://github.com/topics/` +
					topic +
					`">` +
					topic +
					`</a></li>`;
			});

			// prettier-ignore
			repolist.innerHTML +=
				`<li>` +
				`<a href="` + homepage + `">` + name + `</a>` +
				`<p>` + response.data.description + `</p>` +
				`<ul class="topics">` + topics + `</ul>` +
				`<div class="info">` +
				`<div id="` + response.data.language + `" class="language"></div>` +
				`<p>` + response.data.language + `</p>` +
				`<a id="stars" href="` + response.data.html_url + `/stargazers">` + star_svg + `</a>` +
				`<a id="stars" href="` + response.data.html_url + `/stargazers">` +
				`<p>` + response.data.stargazers_count.toString() + `</p>` +
				`</a>` +
				`</div>` +
				`</li>`;
		})
		.catch((error: ErrorEvent) => {
			console.error("ERROR: could not get repo information! \n" + error);
		});
}

repos.forEach((repo) => {
	GetRepoInfo(repo);
});
