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

async function getStats() {
    loadingStatsEl.textContent = "Loading Stats...";

    fkdrEl.textContent = "";
    indexEl.textContent = "";
    starsEl.textContent = "";
    finalKillsEl.textContent = "";
    finalDeathsEl.textContent = "";

    const inputVal = inputElement.value;

    if (inputVal.length < 1) {
        loadingEl.textContent = "";
        errorEl.textContent = "Please enter a player!";
        return
    };

    try {
        const apiRaw = await fetch(`https://api.slothpixel.me/api/players/${inputVal}`, {method: "GET"});
        const apiData = await apiRaw.json();

        let stars = 0;
        let finalDeaths = 0;
        let finalKills = 0;
        let fkdr = 0;
        let index = 0

        stars += apiData.stats.BedWars.level;
        finalDeaths += apiData.stats.BedWars.final_deaths;
        finalKills += apiData.stats.BedWars.final_kills;
        fkdr += parseFloat(((finalKills) / (finalDeaths)).toFixed(1));
        index += parseFloat(((stars * fkdr ** 2) / 10).toFixed(1));

        inputVal.textContent = "";
        errorEl.textContent = "";

        fkdrEl.textContent = `FKDR: ${fkdr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
        indexEl.textContent = `Index: ${index.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
        starsEl.textContent = `Stars: ${stars.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
        finalKillsEl.textContent = `Final Kills: ${finalKills.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
        finalDeathsEl.textContent = `Final Deaths: ${finalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
        loadingStatsEl.textContent = "";

    } catch (err) {
        loadingEl.textContent = "";
        errorEl.textContent = "Invalid Player specified!";
    };
};