// Function which displays loading till the page gets load
window.addEventListener("load", function(){
	var load_screen = document.getElementById("load_screen");
	document.body.removeChild(load_screen);
});

// Async function which fetches all the rockets data from given API and add that to given Modal
async function AllLaunches(){
    const rocketsResponse = await fetch(`https://api.spacexdata.com/v4/rockets`, {method: 'GET'})
    const rockets = await rocketsResponse.json()
    
    for(let i=1; i<rockets.length; i++){
        let status
        rockets[i].active ? status="Active" : status="Inactive"

        document.querySelector(".container").innerHTML += `
            <div class="row">
                <div class="col-12 col-md-3">
                    <img src=${rockets[i].flickr_images[0]} alt=${rockets[i].name}>
                </div>
                <div class="col-12 col-md-6">
                    <p class="name">${rockets[i].name}</p>
                    <p class="description">${rockets[i].description}</p>
                    <div class="status-row row">
                        <div class="col-3">
                            <p>Status: <span class="status-color color-${i}">${status}</span></p>
                        </div>
                        <div class="wiki col-9">
                            
                            <a href="${rockets[i].wikipedia}"><img src="./wiki.svg"></a>
                            <p>Wikipedia</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-3 extra py-5">
                    <p>First Flight: <span>${rockets[i].first_flight}</span></p>
                    <p>Stages: <span>${rockets[i].stages}</span></p>
                    <p>Boosters: <span>${rockets[i].boosters}</span></p>
                    <p>Cost Per Launch: <span>${rockets[i].cost_per_launch}</span></p>
                    <p>Success Rate: <span>${rockets[i].success_rate_pct}%</span></p>
                </div>
            </div>
        `
        rockets[i].active ? document.querySelector(`.color-${i}`).style.color= "green" : document.querySelector(`.color-${i}`).style.color= "red"
    }
}
AllLaunches()


