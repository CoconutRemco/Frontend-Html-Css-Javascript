document.getElementById('hamburger-icon').addEventListener('click', function() {
    var navMenu = document.getElementById('nav-menu');
    if (navMenu.style.display === 'none') {
        navMenu.style.display = 'block';
    } else {
        navMenu.style.display = 'none';
    }
});

var apiEndpoints = {
    'rust': 'api_endpoint_for_rust',
    'csgo': 'api_endpoint_for_csgo',
    'ark2': 'api_endpoint_for_ark2'
};

var game = window.location.pathname.split('/')[1].split('.')[0]; // Get the game name from the URL

fetch(apiEndpoints[game])
    .then(response => response.json())
    .then(data => {
        // 'data' is the parsed response from the API
        // The structure of 'data' depends on the API
        // This is just an example, replace 'data.reviews' with the actual path to the reviews in the response
        const reviews = data.reviews;
        const reviewsContainer = document.getElementById('reviews');
        reviews.forEach(review => {
            const reviewElement = document.createElement('p');
            reviewElement.textContent = review;
            reviewsContainer.appendChild(reviewElement);
        });
    })
    .catch(error => console.error('Error:', error));
