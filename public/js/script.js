let test = document.getElementById('title');

function getApi() {
    
    // This fetches all of the data in the API for video games
    // rememeber it needs a key
    var requestUrl = 'https://api.rawg.io/api/games/super-mario-world?key=420704174099428b9d66cfa71b8d4c9b';

    fetch(requestUrl) 
    
    .then(function (response) {
        return response.json();
    })

    .then(function (data) {
        console.log("hi");
        console.log(data);
        console.log("bye");

        // The code beneath should be able find a specific data
        // it could be images or even links to stores incase they want to buy
        // a more recent

    });
}

test.addEventListener('click', getApi);