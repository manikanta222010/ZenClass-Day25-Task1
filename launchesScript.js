// Function which displays loading till the page gets load
window.addEventListener("load", function () {
    var load_screen = document.getElementById("load_screen");
    document.body.removeChild(load_screen);
});

// Async function which fetches all the launches data from given API and add that to given Modal
async function AllLaunches() {
    const response = await fetch(`https://api.spacexdata.com/v4/launches`, { method: 'GET' })
    const data = await response.json()
    const rocketsResponse = await fetch(`https://api.spacexdata.com/v4/rockets`, { method: 'GET' })
    const rockets = await rocketsResponse.json()
    const launchpadsResponse = await fetch(`https://api.spacexdata.com/v4/launchpads`, { method: 'GET' })
    const launchpads = await launchpadsResponse.json()

    let count = 1
    for (let i = data.length - 1; i >= 0; i--) {
        if (!data[i].upcoming) {
            document.querySelector(".row").innerHTML += `
                <div class="col-lg-2 col-md-3 col-sm-6 col-12 py-2 block">
                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#launchModal${++count}">
                    ${data[i].name}
                    </button>
                </div>

                <!-- Bootstrap Modal to display info of the Launch -->    
                <div class="modal fade" id="launchModal${count}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-centered modal-dark">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">${data[i].name}  #${data[i].flight_number}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="row modal-body">
                                <div class="col-12 col-sm-10 px-4">
                                <p>Launch Time:  <span class="blue">${data[i].date_utc.substr(0, 10)} ${data[i].date_utc.substr(12, 4)}am</span></p>
                                <p>${data[i].details}</p>
                                <p>Rocket: <span class="blue">${rocketMatch(data[i].rocket, rockets)}</span></p>
                                <p>Launchpad: <span class="blue">${launchpadMatch(data[i].launchpad, launchpads)}</span></p> 
                                <p class="status-p">Status </p> 
                                <span class="status status-${i}">${status(data[i].success)}</span>
                                <p class="reason-${i}"></p>
                                </div>  
                                <div class="col-12 col-sm-2">
                                    <img src="./rocket.png" alt=${data[i].name}> 
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
            data[i].success ? document.querySelector(`.status-${i}`).style.color = "green" : document.querySelector(`.status-${i}`).style.color = "red"
            if (!data[i].success) {
                document.querySelector(`.reason-${i}`).innerText = `Reason: ${data[i].failures[0].reason}`
            }
        }
    }
    document.querySelector(".row").innerHTML += "<h1>UPCOMING LAUNCHES</h1>"
    for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].upcoming) {
            document.querySelector(".row").innerHTML += `
            <div class="col-lg-2 col-md-3 col-sm-6 col-12 py-2 block">
                
            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#launchModal${++count}">
            ${data[i].name}
            </button>
        </div>
            
        <!-- Bootstrap Modal to display info of the Launch -->  
        <div class="modal fade" id="launchModal${count}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered ">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">${data[i].name}  #${data[i].flight_number}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="row modal-body">
                <div class="col-12 col-sm-10 px-4">
                <p>Launch Time:  <span class="blue">${data[i].date_utc.substr(0, 10)} ${data[i].date_utc.substr(12, 4)}am</span></p>
                <p>Rocket: <span class="blue">${rocketMatch(data[i].rocket, rockets)}</span></p>
                <p>Launchpad: <span class="blue">${launchpadMatch(data[i].launchpad, launchpads)}</span></p> 
                </div>  
                    <div class="col-12 col-sm-2">
                        <img src="./rocket.png" alt=${data[i].name}> 
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
            `
        }
    }



}
AllLaunches()

// Function which matches Rockets to Launch API
function rocketMatch(id, rockets) {
    for (let i = 0; i < rockets.length; i++) {
        if (rockets[i].id == id) {
            //console.log(rockets[i].name)
            return rockets[i].name
        }
    }
}

// Function which matches Launchpads to Launch API
function launchpadMatch(id, launchpads) {
    for (let i = 0; i < launchpads.length; i++) {
        if (launchpads[i].id == id) {
            //console.log(launchpads[i].name)
            return launchpads[i].name
        }
    }
}

// Function which shows launch is successful or not
function status(value) {
    if (value == true) {
        return `<i class="far fa-check-circle"></i> Success`
    }
    else {
        return `<i class="far fa-times-circle"></i> Fail`
    }
}