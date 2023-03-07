import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";

const octokit = new Octokit();

async function getStarCount(repo, element) {
    const stars = element.querySelectorAll("#stars");
    const count = element.querySelector("#stars p");

    return octokit.rest.repos
        .get({
            owner: "LucasTavaresA",
            repo: repo,
        })
        .then(({ data }) => {
            stars[0].setAttribute("href", data.html_url + "/stargazers");
            stars[1].setAttribute("href", data.html_url + "/stargazers");
            count.textContent = data.stargazers_count;
        })
        .catch(() => {
            count.textContent = "0";
        });
}

const projects = document.querySelectorAll("#projects li");

projects.forEach((project) => {
    const href = project.querySelector("a").getAttribute("href");
    const regex = /\/([a-z-]+)\/?$/gim;
    const matches = regex.exec(href);

    if (matches) {
        getStarCount(matches[1], project);
    } else {
        getStarCount("", project);
    }
});
