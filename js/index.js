// Global values

let userSearchResults = [];
let userReposResults = [];
let hide = true;

// Event Listeners

document.addEventListener('DOMContentLoaded', init)

function init() {
    const searchInput = document.querySelector('#github-form');

    searchInput.addEventListener('submit', (event) => {
        event.preventDefault()
        const input = document.querySelector('input#search')
        getUsers(input.value)
        getRepos(input.value)
    })
}

// Server Functions

function getUsers(name) {
    fetch(`https://api.github.com/search/users?q=${name}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/vnd.github.v3+json'
                }
            })
            .then(res => res.json())
            .then(data => {
                userSearchResults.push(data.items[0].login, data.items[0].html_url, data.items[0].id)
                renderSearchResults(userSearchResults);
            });
}

function getRepos(name) {
    fetch(`https://api.github.com/users/${name}/repos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/vnd.github.v3+json'
            }
        })
        .then(res => res.json())
        .then(data => {
           renderSearchRepos(data)
        })  
}



// DOM Manipulation Functions

function renderSearchResults(results) {
    const reposList = document.querySelector('#repos-list');
    const userList = document.querySelector('#user-list');
    const list = document.createElement('li');
    list.innerHTML = `
        <h3 class='login-name'>Name: ${results[0]}</h3>
        <a href="${results[1]}">Profile Link</a>
        <p>ID: ${results[2]}</p>
    `; 
    userList.appendChild(list);
    const userName = document.querySelector('.login-name')
    userName.style.cursor = 'pointer'
    userName.addEventListener('click', () => {
        hide = !hide;
        if (hide) {
            reposList.style.display = 'block'; 
        } else {
            reposList.style.display = 'none';
        }
    })
}

function renderSearchRepos(results) {
    const reposList = document.querySelector('#repos-list');
    userReposResults = results.forEach(result => {
        const list = document.createElement('li');
        list.innerText = result.name
        list.style.display = 'block'
        reposList.appendChild(list);
    })
}