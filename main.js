const posts = [{
    "id": 1,
    "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    "media": "https://unsplash.it/600/300?image=171",
    "author": {
        "name": "Phil Mangione",
        "image": "https://unsplash.it/300/300?image=15"
    },
    "likes": 80,
    "created": "2021-06-25"
},
{
    "id": 2,
    "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    "media": "https://unsplash.it/600/400?image=112",
    "author": {
        "name": "Sofia Perlari",
        "image": "https://unsplash.it/300/300?image=10"
    },
    "likes": 120,
    "created": "2021-09-03"
},
{
    "id": 3,
    "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    "media": "https://unsplash.it/600/400?image=234",
    "author": {
        "name": "Chiara Passaro",
        "image": ""
    },
    "likes": 78,
    "created": "2021-05-15"
},
{
    "id": 4,
    "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    "media": "https://unsplash.it/600/400?image=24",
    "author": {
        "name": "Luca Formicola molto Bravissimo",
        "image": null
    },
    "likes": 56,
    "created": "2021-04-03"
},
{
    "id": 5,
    "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    "media": "https://unsplash.it/600/400?image=534",
    "author": {
        "name": "Alessandro Sainato",
        "image": "https://unsplash.it/300/300?image=29"
    },
    "likes": 95,
    "created": "2021-03-05"
}
];


/* selezionare il container */
let containerHtml = document.getElementById('container');

/* generare le cards dei post in modo dinamico  */
for (let i = 0; i < posts.length; i++) {

    //a ogni giro di ciclo ottengo un elemento dell'array di oggetti
    let element = posts[i]; // il singolo oggetto dell'array

    let authorImage = `<img class="profile-pic" src="${element.author.image}" alt="${element.author.name}">`;

    if (!element.author.image) {
        authorImage = `<span class="no-profile-pic">${iniziali(element.author.name)}</span>`;
    }

    /*Stampare in container le cards */
    containerHtml.innerHTML +=
        `
    <div class="post">
            <div class="post__header">
                <div class="post-meta">
                    <div class="post-meta__icon">
                        <!-- Immagine per profilo utente -->
                        ${authorImage}
                    </div>
                    <div class="post-meta__data">
                        <!-- Dati utente -->
                        <div class="post-meta__author">${element.author.name}</div>
                        <div class="post-meta__time">${formatISODate(element.created)}</div>
                    </div>
                </div>
            </div>
            <!-- Testo del post -->
            <div class="post__text">${element.content}</div>
            <div class="post__image">
                <!-- Immagine post -->
                <img src="${element.media}" alt="">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <!-- Bottone dei like -->
                        <a class="like-button  js-like-button" href="#" data-postid="${element.id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        <!-- Contatore likes -->
                        Piace a <b id="like-counter-${element.id}" class="js-likes-counter">${element.likes}</b> persone
                    </div>
                </div>
            </div>
        </div>
    `;
}

/* Aggiungere likes */
let likeButtons = document.querySelectorAll('.js-like-button');
let likeCounters = document.querySelectorAll('.js-likes-counter');

console.log(likeCounters);

console.log(likeButtons); //otteniamo un array di elementi

likeButtons.forEach((elem, index) => {

    //è il singolo bottone a ogni giro del ciclo
    const likeButton = elem;


    //Aggiungere funzionalita del click
    likeButton.addEventListener('click', function (event) {
        //annullare le funzionalità di default del tag a
        event.preventDefault();



        //controllare se il bottone è gia stato cliccato e quindi è verde oppure no, se no: aggiungere classe e aumentare contatore se si togliere classe e diminuire contatore

        //usiamo contains: controlla se in un elemento html è presente una classe

        if (likeButton.classList.contains('like-button--liked')) {
            //se presenta la classe tra parentesi di contains eseguo questo codice:
            likeButton.classList.remove('like-button--liked');

            //diminuire il contatore dei likes
            const likeCounter = likeCounters[index];
            console.log(likeCounter.innerHTML);
            likeCounter.innerHTML = parseInt(likeCounter.innerHTML) - 1;

            //diminuire i like dell'oggetto
            const oggettoCLiccato = posts[index];
            oggettoCLiccato.likes--;
            console.log(oggettoCLiccato);
        } else {

            //aggiungere classe di cambio aspetto al bottone "mi piace", like-button--liked
            likeButton.classList.add('like-button--liked');

            //aumentare il contatore dei likes
            const likeCounter = likeCounters[index];
            console.log(likeCounter.innerHTML);
            likeCounter.innerHTML = parseInt(likeCounter.innerHTML) + 1;

            //aumentare i like dell'oggetto
            const oggettoCLiccato = posts[index];
            oggettoCLiccato.likes++;
            console.log(oggettoCLiccato);
        }

    });
});


function formatISODate(date) {
    let pezzi = date.split('-');
    pezzi = pezzi.map((el) => +el);
    return pezzi.reverse().join("-");
}

// deve restituire una stringa che rappresenta le iniziali del'autore
function iniziali(nomeAutore) {
    let words = nomeAutore.split(' ');
    let initials = words.map((word) => word[0]);
    return initials.join('');
}
