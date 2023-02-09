const apiKey = '10a6b82007486126cbbcfb5805fd38c2';
const hash = '921538e4e015f172aec43d8203aa8497';
const ts = '1';

// Marvel official api
let url = `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${apiKey}&hash=${hash}`;

url = "https://akabab.github.io/superhero-api/api/all.json"

// To store the favorited super heros
const favorites = [];

// To toggle between home and favorites
let toShow = "HOME";
const homeBtnEl = document.querySelector(".home-btn");
const favBtnEl = document.querySelector(".favorites-btn");

// Event listener to show favorites
favBtnEl.addEventListener("click",()=>{
    toShow = "FAVORITES";
    document.querySelector(".cards-container").innerHTML = "";
    fetchData();
})

// Event listener to toggle back to home page
homeBtnEl.addEventListener("click",()=>{
    toShow = "HOME";
    document.querySelector(".cards-container").innerHTML = "";
    fetchData();
})

// This function fetches the data from the api and renders it on the dom
const fetchData = async () => {
try {
    // To get the data from the api.
    const response = await fetch(url);
    let data = await response.json();

    // If toShow is FAVORITES then favorites data is rendered on the dom
    if(toShow === "FAVORITES"){
        data = favorites;
    }
    const comics = data;
    
    // Iterate over the data and render one by one
    comics.forEach((comic) => {

        // It creates the card element
        const card = document.createElement('div');
        card.classList.add('card');

        // Image element
        let image = `${comic?.images?.lg}`;
        let img = document.createElement('img');
        img.classList.add("card-img")
        img.src = image;
        img.alt = 'Comic Cover';
        card.appendChild(img);

        // Title element
        const title = document.createElement('div');
        title.classList.add('card-title');
        let name = comic?.biography?.fullName;
        if(!name || name?.length == 0){
            name = comic?.name
        }
        title.textContent = name ;
        
        // Description Element
        const description = document.createElement('div');
        description.classList.add('card-description');
        description.textContent = comic?.work?.occupation;

        // Action buttons
        const actions = document.createElement('div');
        actions.classList.add('card-actions');
        
        // show detail anchor link
        const link = document.createElement('a');
        link.textContent = 'Open URL';
        link.target = '_blank';
        
        // Favorite Button to add to favorites
        const favoriteButton = document.createElement('button');
        if(toShow === "HOME"){
            favoriteButton.textContent = 'Add to Favorites';
            favoriteButton.addEventListener('click', () => {
                favorites.push(comic);
                alert(`Comic "${comic.name}" has been added to your favorites.`);
            });
        } else {
            favoriteButton.textContent = 'Remove From Favorites';
            favoriteButton.addEventListener('click', () => {
                // favorites.push(comic);
                card.remove();
                alert(`Comic "${comic.name}" has been removed from the favorites.`);
            });
        }
        
        actions.appendChild(link);
        actions.appendChild(favoriteButton);
        
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(actions);
        
        // It appends the card to cards container
        document.querySelector('.cards-container').appendChild(card);
    });
} catch (error) {
    console.error(error);
}
};

// fetchDate() will be called for the very first time to render the data
fetchData();
