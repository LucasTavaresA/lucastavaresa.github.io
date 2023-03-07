import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const octokit = new Octokit();
function getStarCount(repo, element) {
    return __awaiter(this, void 0, void 0, function* () {
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
            count.textContent = data.stargazers_count.toString();
        })
            .catch(() => {
            count.textContent = "0";
        });
    });
}
const projects = document.querySelectorAll("#projects li");
projects.forEach((project) => {
    const href = project.querySelector("a").getAttribute("href");
    const regex = /\/([a-z-]+)\/?$/gim;
    const matches = regex.exec(href);
    if (matches) {
        getStarCount(matches[1], project);
    }
    else {
        getStarCount("", project);
    }
});