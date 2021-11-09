// Function which displays loading till the page gets load
window.addEventListener("load", function(){
	var load_screen = document.getElementById("load_screen");
	document.body.removeChild(load_screen);
});

// Async function which fetches information regarding roadster from given API
async function roadster() {
    const response = await fetch("https://api.spacexdata.com/v4/roadster", { method: 'GET' })
    const data = await response.json()

    document.querySelector(".container").innerHTML += `
        <h1>${data.name}</h1>
        <h4>Launched: ${data.launch_date_utc.substr(0, 10)} ${data.launch_date_utc.substr(12, 4)} am</h4>
        <h5>${data.details}</h5>
        <div class="wiki">
            <div class="inner">
            <a href="${data.wikipedia}"><img src="./wiki.svg"></a>
            <p>Wikipedia</p>
            </div>
        </div>
        <div class="container-small pb-5">
            <p>Stats</p>
            <div class="info">
                <span>Speed</span>
                <span>${Math.floor(data.speed_kph)} kmph</span>
            </div>
            <div class="info">
                <span>Distance from Earth</span>
                <span>${Math.ceil(data.earth_distance_km)} km</span>
            </div>
            <div class="info">
                <span>Distance from Mars</span>
                <span>${Math.ceil(data.mars_distance_km)} km</span>
            </div>
            <div class="info">
                <span>Period</span>
                <span>${Math.ceil(data.period_days)} days</span>
            </div>
            <div class="info">
                <span>Mass</span>
                <span>${data.launch_mass_kg} kg</span>
            </div>
            <div class="info">
                <span>Orbit Type</span>
                <span>${data.orbit_type}</span>
            </div>
            <div class="info">
                <span>Longitude</span>
                <span>${data.longitude.toFixed(4)}</span>

            </div>
            <div class="info">
                <span>Apoapsis</span>
                <span>${data.apoapsis_au.toFixed(4)} AU</span>
            </div>
            <div class="info">
                <span>Periapsis</span>
                <span>${data.periapsis_au.toFixed(4)} AU</span>
            </div>
            <div class="info">
                <span>Semi Major Axis</span>
                <span>${data.semi_major_axis_au.toFixed(4)} AU</span>
            </div>
            <div class="info">
                <span>Eccentricity</span>
                <span>${data.eccentricity.toFixed(6)}</span>
            </div>
            <div class="info">
                <span>Inclination</span>
                <span>${data.inclination.toFixed(6)}</span>
            </div>
            <div class="info">
                <span>Argument of Periapsis</span>
                <span>${data.periapsis_arg.toFixed(4)}</span>
            </div>
        </div>
        <div class="ratio ratio-16x9 py-3">
            <iframe src=https://www.youtube.com/embed/wbSwFU6tY1c?rel=0" title="YouTube video" allowfullscreen></iframe>
        </div>
    `
}

roadster()