// Getting all the elements from the DOM
const inputElement = document.querySelector("#inputEl");
const checkBtn = document.querySelector("#checkBtn");
const fkdrEl = document.querySelector("#fkdr");
const indexEl = document.querySelector("#index");
const starsEl = document.querySelector("#stars");
const finalDeathsEl = document.querySelector("#finalKills");
const finalKillsEl = document.querySelector("#finalDeaths");
const errorEl = document.querySelector("#errorEl");
const loadingEl = document.querySelector("#loadingStatsEl");
checkBtn.addEventListener("click", getStats);

// Main function that handles everything
async function getStats() {
    // Showing "Loading Stats..." to user
    loadingStatsEl.textContent = "Loading Stats...";

    // Clearing any errors the user might have gotten
    errorEl.textContent = "";

    // Clearing up the stats on the user's screen if they already exist
    fkdrEl.textContent = "";
    indexEl.textContent = "";
    starsEl.textContent = "";
    finalKillsEl.textContent = "";
    finalDeathsEl.textContent = "";

    // Getting the username from the input element
    const inputVal = inputElement.value;

    // If the user didn't enter a player name, then we execute this and note the return statement here, 
    // it's very important
    if (inputVal.length < 1) {
        loadingEl.textContent = "";
        errorEl.textContent = "Please enter a player!";
        return
    };

    // Try statement
    try {
        // Fetching the slothpixel API for the given player name
        const apiRaw = await fetch(`https://api.slothpixel.me/api/players/${inputVal}`, {method: "GET"});
        // Turning it into JSON
        const apiData = await apiRaw.json();

        // I did this so that if the player doesn't have a win, it doesnt go to the catch statement, instead,
        // it just adds the stats from the API to 0, which won't raise an error

        const stars = apiData.stats.BedWars.level || 0;
        const finalDeaths = apiData.stats.BedWars.final_deaths || 0;
        const finalKills = apiData.stats.BedWars.final_kills || 0;
        const fkdr = parseFloat(((finalKills) / (finalDeaths)).toFixed(1)) || 0;
        const index = parseFloat(Math.round((stars * fkdr ** 2) / 10)) || 0;

        // Clearing any errors
        errorEl.textContent = "";

        // Putting everything in their respective paragraph tags, by formatting them into comma seperated numbers,
        // using regex
        fkdrEl.textContent = `FKDR: ${fkdr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
        indexEl.textContent = `Index: ${index.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
        starsEl.textContent = `Stars: ✫${stars.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
        finalKillsEl.textContent = `Final Kills: ${finalKills.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
        finalDeathsEl.textContent = `Final Deaths: ${finalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
        
        // Clearing the loading text
        loadingStatsEl.textContent = "";

    } catch (err) {
        loadingEl.textContent = "";
        errorEl.textContent = "Invalid Player specified!";
    };
};

// Enter key down event, which triggers the getStats() function
inputElement.addEventListener("keydown", event => {
    if (event.which == 13) {
        getStats();
    };
});