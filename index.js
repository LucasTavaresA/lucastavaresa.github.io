const star_svg = `<svg aria-label="star" role="img" height="16" viewBox="0 0 16 12" version="1.1" width="16" data-view-component="true"><path fill="white" fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z" /></svg>`;
const github_logo_svg = `<svg id="gh_logo" height="1.5vw" inline="true" fill="white" aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" class="octicon octicon-mark-github v-align-middle color-fg-default"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>`;
const repos = [
    "Jokenpo",
    "Eval.cs",
    "nelua-cellular-automata",
    "sgrade",
    "Calculator",
    "SingleComment.nvim",
];
const repolist = document.getElementById("repolist");
function httpGet(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    var response = JSON.parse(xhr.responseText);
                    callback(response);
                }
                catch (error) {
                    console.error("Failed to parse server response as JSON.");
                }
            }
            else {
                console.error(`HTTP request for ${url} failed with status code: ${xhr.status}`);
            }
        }
    };
    xhr.send();
}
if (repolist) {
    for (let i = 0; i < repos.length; i++) {
        httpGet(`https://api.github.com/repos/LucasTavaresA/${repos[i]}`, function (response) {
            let homepage = "";
            let name = "";
            let topics = "";
            response.homepage = response.homepage ?? "";
            if (response.homepage !== "") {
                homepage = response.homepage;
                name = `<p>${response.name} 🌎</p>`;
            }
            else {
                homepage = response.html_url;
                name = `<p>${response.name} ${github_logo_svg}</p>`;
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
        });
    }
}
