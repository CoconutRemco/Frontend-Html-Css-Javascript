document.getElementById('hamburger-icon').addEventListener('click', function() {
    var navMenu = document.getElementById('nav-menu');
    if (navMenu.style.display === 'none') {
        navMenu.style.display = 'block';
    } else {
        navMenu.style.display = 'none';
    }
});

let games = [
    {title: 'ARK 2', price: 50, genre: 'Action-Adventure', rating: 7},
    {title: 'Rust', price: 35, genre: 'Survival', rating: 8},
    {title: 'CSGO', price: 15, genre: 'First-Person Shooter', rating: 9},
    // Voeg hier de rest van de spellen toe
];

let cart = [];

function displayGames() {
    let gamesContainer = document.getElementById('games-container');
    gamesContainer.innerHTML = '';
    games.forEach(game => {
        let gameElement = document.createElement('div');
        gameElement.innerHTML = `
            <h2>${game.title}</h2>
            <p>Prijs: ${game.price}</p>
            <p>Genre: ${game.genre}</p>
            <p>Rating: ${game.rating}</p>
            <button class="add-to-cart" data-title="${game.title}">Voeg toe aan winkelmandje</button>
        `;
        gamesContainer.appendChild(gameElement);
    });
}

document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('add-to-cart')) {
        let gameTitle = e.target.getAttribute('data-title');
        let game = games.find(game => game.title === gameTitle);
        cart.push(game);
        displayCart();
    }
});

function displayCart() {
    let cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';
    cart.forEach(game => {
        let gameElement = document.createElement('div');
        gameElement.innerHTML = `
            <h2>${game.title}</h2>
            <p>Prijs: ${game.price}</p>
            <button class="remove-from-cart" data-title="${game.title}">Verwijder uit winkelmandje</button>
        `;
        cartContainer.appendChild(gameElement);
    });
}

document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('remove-from-cart')) {
        let gameTitle = e.target.getAttribute('data-title');
        let gameIndex = cart.findIndex(game => game.title === gameTitle);
        cart.splice(gameIndex, 1);
        displayCart();
    }
});

document.getElementById('view-cart').addEventListener('click', function() {
    document.getElementById('games-container').style.display = 'none';
    document.getElementById('cart-container').style.display = 'block';
});

document.getElementById('view-games').addEventListener('click', function() {
    document.getElementById('games-container').style.display = 'block';
    document.getElementById('cart-container').style.display = 'none';
});

window.onload = function() {
    displayGames();
    displayCart();
};
