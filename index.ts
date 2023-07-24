const star_svg = `<svg aria-label="star" role="img" height="16" viewBox="0 0 16 12" version="1.1" width="16" data-view-component="true"><path fill="white" fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z" /></svg>`;

const repos = [
	"Jokenpo",
	"Eval.cs",
	"nelua-cellular-automata",
	"sgrade",
	"Exercicios-CSharp-OOP",
	"SingleComment.nvim",
];

const repolist = document.getElementById("repolist");

type GHResponse = {
	homepage: string;
	name: string;
	html_url: string;
	description: string;
	topics: string[];
	language: string;
	stargazers_count: number;
};

function httpGet(url: string, callback: Function) {
	var xhr = new XMLHttpRequest();

	xhr.open("GET", url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    var response = JSON.parse(xhr.responseText);
                    callback(response);
                } catch (error) {
                    console.error("Failed to parse server response as JSON.");
                }
            } else {
                console.error(`HTTP request for ${url} failed with status code: ${xhr.status}`);
            }
        }
    };

	xhr.send();
}

if (repolist) {
	for (let i = 0; i < repos.length; i++) {
		httpGet(
			`https://api.github.com/repos/LucasTavaresA/${repos[i]}`,
			function(response: GHResponse) {
				let homepage = "";
				let name = "";
				let topics = "";

				response.homepage = response.homepage ?? "";

				if (response.homepage !== "") {
					homepage = response.homepage;
					name = `<p>${response.name} 🌎</p>`;
				} else {
					homepage = response.html_url;
					name = response.name;
				}

				for (let i = 0; i < topics.length; i++) {
					topics += `<li><a href="https://github.com/topics/${topics[i]}">${topics[i]}</a></li>`;
				}

				const spinner = document.getElementById("spinner");

				if (spinner) {
					spinner.remove();
				}

				repolist.innerHTML += `
<li>
	<a href="${homepage}">${name}</a>
	<p>${response.description}</p>
	<ul class="topics">${topics}</ul>
	<div class="info">
		<div id="${response.language}" class="language"></div>
		<p>${response.language}</p>
		<a id="stars" href="${response.html_url}/stargazers">${star_svg}</a>
		<a id="stars" href="${response.html_url}/stargazers">
			<p>${response.stargazers_count}</p>
		</a>
	</div>
</li>
`;
			},
		);
	}
}
