
class Film {
    constructor(
        title, 
        genre, 
        country, 
        director = [], 
        scenary,
        producer,
        operator,
        compositor,
        budget,
        worldFees,
        ageRaiting,
        duration,
        date,
        poster
        ) 
        {
        this.title = title;
        this.genre = genre;
        this.country = country;
        this.director = director;
        this.scenary = scenary;
        this.producer = producer;
        this.operator = operator;
        this.compositor = compositor;
        this.budget = budget;
        this.worldFees = worldFees;
        this.ageRaiting = ageRaiting;
        this.duration = duration;
        this.date = date;
        this.poster = poster;
    }
}

let filmsArr = [];

if (localStorage.getItem("savedFilms") != null) {
    let arr = JSON.parse(localStorage.getItem("savedFilms"));
    arr.forEach(element => {
        toShowFilms(element);
    });
    filmsArr = JSON.parse(localStorage.getItem("savedFilms"));    
}

function toShowFilms(film) {
    
    let mainDiv = document.getElementById('filmsZone');
    let div = document.createElement('div');
    div.classList.add('blockOfFilm');
    div.id = "blockOfFilm";

    let closeBtn = document.createElement('button');
    closeBtn.id = "clsBtn";
    closeBtn.classList.add('clsBtn');
    closeBtn.classList.add('btn');
    closeBtn.innerText = 'Удалить';

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("imgContainer");

    let img = document.createElement('img');
    img.src = film.poster;
    img.classList.add('poster');

    let h2 = document.createElement('h2');
    h2.classList.add('title');
    h2.innerHTML = film.title;

    let pGenre = document.createElement('p');
    pGenre.classList.add('info');
    pGenre.textContent = film.genre;

    let hidden = document.createElement('div');
    hidden.classList.add('hiddenBlock');

    let country = document.createElement('p');
    country.classList.add('info');
    country.classList.add('hiddenBlocks');
    country.textContent = 'Страна: ' + film.country;

    let director = document.createElement('p');
    director.classList.add('info');
    director.classList.add('hiddenBlocks');
    director.textContent = 'Режиссер: ' + film.director;

    let scenary = document.createElement('p');
    scenary.classList.add('info');
    scenary.classList.add('hiddenBlocks');
    scenary.textContent = film.scenary;

    let producer = document.createElement('p');
    producer.classList.add('info');
    producer.classList.add('hiddenBlocks');
    producer.textContent = 'Продюсер: ' + film.producer;

    let operator = document.createElement('p');
    operator.classList.add('info');
    operator.classList.add('hiddenBlocks');
    operator.textContent = 'Оператор: ' + film.operator;

    let compositor = document.createElement('p');
    compositor.classList.add('info');
    compositor.classList.add('hiddenBlocks');
    compositor.textContent = 'Композитор: ' + film.compositor;

    let budget = document.createElement('p');
    budget.classList.add('info');
    budget.classList.add('hiddenBlocks');
    budget.textContent = 'Бюджет: ' + film.budget;

    let worldFees = document.createElement('p');
    worldFees.classList.add('info');
    worldFees.classList.add('hiddenBlocks');
    worldFees.textContent = 'Мировые сборы: ' + film.worldFees;

    let ageRaiting = document.createElement('p');
    ageRaiting.classList.add('info');
    ageRaiting.classList.add('rating');
    ageRaiting.textContent = 'Рейтинг: ' + film.ageRaiting;

    let duration = document.createElement('p');
    duration.classList.add('info');
    duration.classList.add('hiddenBlocks');
    duration.textContent = 'Длительность: ' + film.duration;

    let date = document.createElement('p');
    date.classList.add('info');
    date.classList.add('hiddenBlocks');
    date.textContent = 'Дата выхода: ' + film.date;

    mainDiv.appendChild(div);
    div.appendChild(closeBtn);
    div.appendChild(imgContainer);
    
    imgContainer.appendChild(img);
    imgContainer.appendChild(ageRaiting);
    div.appendChild(h2);
    div.appendChild(pGenre);
    div.appendChild(hidden);
    hidden.appendChild(country);
    hidden.appendChild(director);
    hidden.appendChild(scenary);
    hidden.appendChild(producer);
    hidden.appendChild(operator);
    hidden.appendChild(compositor);
    hidden.appendChild(budget);
    hidden.appendChild(worldFees);
    hidden.appendChild(duration);
    hidden.appendChild(date);

    closeBtn.addEventListener("click", (event) => {
        let button = event.target;
        let parentDiv = button.parentNode;
        let title = parentDiv.querySelector("h2.title").innerText;
        let list = JSON.parse(localStorage.getItem("savedFilms"));
        for (let i = 0; i < list.length; i++) {
            if(list[i].title == title) {
                list.splice(i, 1);   
            }
        }
        localStorage.setItem("savedFilms", JSON.stringify(list));
        parentDiv.remove();
    });
}


function toFilter() {
    let devs = document.querySelectorAll(".blockOfFilm");
    devs.forEach(el => el.style.display = 'none');
    
    let genreValue = document.getElementById("genreFilter").value;
    let countryValue = document.getElementById("countryFilter").value;
    let objects = JSON.parse(localStorage.getItem("savedFilms"));
    let newdevs = [];

    if ((genreValue != 'default') && (countryValue != 'default')) newdevs = objects.filter(el => ((el.genre == genreValue) && (el.country == countryValue)));
    else if (genreValue != 'default') newdevs = objects.filter(el => el.genre == genreValue);
    else if (countryValue != 'default') newdevs = objects.filter(el => el.country == countryValue);
    else newdevs = objects;

    newdevs.forEach(el => toShowFilms(el));
}

function toShowFact() {
    let chuckArea = document.querySelector('.chuck_area');
    let url = 'https://api.chucknorris.io/jokes/random';

    fetch(url)
        .then(response => {
            return response.json();
        })

        .then(respDate => {
            chuckArea.innerHTML = respDate.value;
        })
}

function openForm() {
    if (document.getElementById('adding').style.display == 'none') document.getElementById('adding').style.display = 'flex';
    else document.getElementById('adding').style.display = 'none'
    
}



function addFilm() {

    let film = new Film(
        document.getElementById('title').value.trim(),
        document.getElementById('genre').value.trim(),
        document.getElementById('country').value.trim(),
        document.getElementById('director').value,
        document.getElementById('scenary').value,
        document.getElementById('producer').value,
        document.getElementById('operator').value,
        document.getElementById('compositor').value,
        document.getElementById('budget').value,
        document.getElementById('worldFees').value,
        document.getElementById('ageRaiting').value,
        document.getElementById('duration').value,
        document.getElementById('date').value,
        document.getElementById('poster').value
    );

    filmsArr.push(film);
    localStorage.setItem("savedFilms", JSON.stringify(filmsArr));
    toShowFilms(film);

    document.getElementById('title').value = "";
    document.getElementById('genre').value = "";
    document.getElementById('country').value = "";
    document.getElementById('director').value = "";
    document.getElementById('scenary').value = "";
    document.getElementById('producer').value = "";
    document.getElementById('operator').value = "";
    document.getElementById('compositor').value = "";
    document.getElementById('budget').value = "";
    document.getElementById('worldFees').value = "";
    document.getElementById('ageRaiting').value = "";
    document.getElementById('duration').value = "";
    document.getElementById('date').value = "";
    document.getElementById('poster').value = "";
}

