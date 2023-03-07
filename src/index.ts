// @ts-ignore
const octokit = new Octokit();

interface RepoData {
    html_url: string;
    stargazers_count: number;
}

async function getStarCount(repo: string, element: HTMLLIElement) {
    const stars: NodeListOf<HTMLAnchorElement> =
        element.querySelectorAll("#stars");
    const count: HTMLParagraphElement = element.querySelector("#stars p")!;

    return octokit.rest.repos
        .get({
            owner: "LucasTavaresA",
            repo: repo,
        })
        .then(({ data }: { data: RepoData }) => {
            stars[0].setAttribute("href", data.html_url + "/stargazers");
            stars[1].setAttribute("href", data.html_url + "/stargazers");
            count.textContent = data.stargazers_count.toString();
        })
        .catch(() => {
            count.textContent = "0";
        });
}

const projects: NodeListOf<HTMLLIElement> =
    document.querySelectorAll("#projects li");

projects.forEach((project) => {
    const href: string = project.querySelector("a")!.getAttribute("href")!;
    const regex: RegExp = /\/([a-z-]+)\/?$/gim;
    const matches: RegExpExecArray = regex.exec(href)!;

    if (matches) {
        getStarCount(matches[1], project);
    } else {
        getStarCount("", project);
    }
});
