document.getElementById('hamburger-icon').addEventListener('click', function() {
    var navMenu = document.getElementById('nav-menu');
    if (navMenu.style.display === 'none') {
        navMenu.style.display = 'block';
    } else {
        navMenu.style.display = 'none';
    }
});

let games = [];
let cart = [];

// Lees de games.json bestand in
fetch('games.json')
    .then(response => response.json())
    .then(data => {
        games = data;
        displayGames();
        populateGenreFilter();
    })
    .catch(error => console.error('Error:', error));

// Functie om de genre filter te vullen
function populateGenreFilter() {
    let genreFilter = document.getElementById('genre-filter');
    let uniqueGenres = [...new Set(games.map(game => game.genre))];
    genreFilter.innerHTML = '<option value="">Selecteer een genre</option>';
    uniqueGenres.forEach(genre => {
        let option = document.createElement('option');
        option.value = genre;
        option.innerText = genre;
        genreFilter.appendChild(option);
    });
}

// Voeg een knop toe om een spel aan het winkelmandje toe te voegen
function displayGames(gamesToDisplay = games) {
    let gamesContainer = document.getElementById('games-container');
    gamesContainer.innerHTML = '';
    gamesToDisplay.forEach(game => {
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

// Toon een bevestigingsbericht wanneer een spel aan het winkelmandje is toegevoegd
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('add-to-cart')) {
        let gameTitle = e.target.getAttribute('data-title');
        let game = games.find(game => game.title === gameTitle);
        cart.push(game);
        displayCart();
        alert(gameTitle + ' is toegevoegd aan het winkelmandje');
    }
});

// Voeg filters toe
// Voeg filters toe
function filterGames() {
    let priceFilter = document.getElementById('price-filter').value;
    let genreFilter = document.getElementById('genre-filter').value;
    let ratingFilter = document.getElementById('rating-filter').value;

    let filteredGames = games.filter(game => {
        let matchesPrice = priceFilter ? game.price <= priceFilter : true;
        let matchesGenre = genreFilter ? game.genre === genreFilter : true;
        let matchesRating = ratingFilter ? game.rating <= ratingFilter : true;
        return matchesPrice && matchesGenre && matchesRating;
    });

    displayGames(filteredGames);
}

function displayCart() {
    let cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';
    cart.forEach(game => {
        let gameElement = document.createElement('div');
        gameElement.innerHTML = `
            <h2>${game.title}</h2>
            <p>Prijs: ${game.price}</p>
            <button class="remove-from-cart" data-title="${game.title}">Verwijder uit mandje</button>
        `;
        cartContainer.appendChild(gameElement);
    });
    document.getElementById('calculate-price').style.display = 'block';
    document.getElementById('total-price').style.display = 'block';
}

// Voeg een knop "Bereken prijs" toe
function calculatePrice() {
    let totalPrice = cart.reduce((total, game) => total + game.price, 0);
    document.getElementById('total-price').innerText = 'Totaalprijs: ' + totalPrice;
}

// Voeg de mogelijkheid toe om een spel uit het winkelmandje te verwijderen
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('remove-from-cart')) {
        let gameTitle = e.target.getAttribute('data-title');
        let gameIndex = cart.findIndex(game => game.title === gameTitle);
        cart.splice(gameIndex, 1);
        displayCart();
        calculatePrice();
    }
});


document.getElementById('view-cart').addEventListener('click', function() {
    document.getElementById('games-container').style.display = 'none';
    document.getElementById('cart-container').style.display = 'block';
    document.getElementById('calculate-price').style.display = 'block';
    document.getElementById('total-price').style.display = 'block';
});

document.getElementById('view-games').addEventListener('click', function() {
    document.getElementById('games-container').style.display = 'block';
    document.getElementById('cart-container').style.display = 'none';
    document.getElementById('calculate-price').style.display = 'none';
    document.getElementById('total-price').style.display = 'none';
});

window.onload = function() {
    displayGames();
    displayCart();
};
