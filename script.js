// Function which displays loading till the page gets load
window.addEventListener("load", function(){
	var load_screen = document.getElementById("load_screen");
	document.body.removeChild(load_screen);
});

// Function which converts big number to Billion, Million, Kilo
function convertToInternationalCurrencySystem (labelValue) {
    return Math.abs(Number(labelValue)) >= 1.0e+9
    ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
    : Math.abs(Number(labelValue)) >= 1.0e+6
    ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
    : Math.abs(Number(labelValue)) >= 1.0e+3
    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"
    : Math.abs(Number(labelValue));
}

// Async funtion which fetchs company's data from the given API and add that data to body
async function companyInfo(){
    const response = await fetch(`https://api.spacexdata.com/v4/company`, { method: 'GET' })
    const {founder, headquarters, valuation, summary} = await response.json()

    document.querySelector(".row1 img").src = "./w.jpg"
    document.querySelector(".summary").innerHTML = `<p>${summary}</p>`
    document.querySelector(".headquarters").innerHTML = `
        <p>Founder and CEO: ${founder}</p>
        <p>Headquarters: ${headquarters.address}, ${headquarters.city}, ${headquarters.state}</p>
        <p>Valuation: ${convertToInternationalCurrencySystem(valuation)} USD</p>
    `
}
companyInfo()

// Async function which fetchs count of launches from the given API
async function launches(){
    const response = await fetch(`https://api.spacexdata.com/v4/launches`, {method: 'GET'})
    const data = await response.json()

    let count=0
    for(let i=0; i<data.length; i++){
        if(data[i].success==true){
            count++
        }
    }
    document.querySelector(".row2 img").src = "./e.jpg"
    document.querySelector(".launches").innerHTML = `
        <p>Launches</p>
        <p>Total Launches: <span>${data.length}</p>
        <p>Successful Launches: <span>${count}</p>
        <a href="./launches.html"><button onclick="">Explore All Launches</button></a>
    `
}
launches()

async function allRockets(){
    const response = await fetch(`https://api.spacexdata.com/v4/rockets`, {method: 'GET'})
    const data = await response.json()

    document.querySelector(".row3 img").src = "./1st.jpg"
    document.querySelector(".rockets").innerHTML = `
        <p>Rockets</p>
        <p>Rockets are Cool. Theres no getting around that.</p>
        <p>-Elon Musk</p>
        <a href="./rockets.html"><button onclick="">Explore All Rockets</button></a>
    `
}
allRockets()

// Async function which fetchs distance travelled by roadster from given API
async function roadster(){
    const response = await fetch(`https://api.spacexdata.com/v4/roadster`, {method: 'GET'})
    const data = await response.json()

    document.querySelector(".row4 img").src = "./roadster.jpg"
    document.querySelector(".roadster").innerHTML = `
        <p>Roadster</p>
        <p><span>${Math.ceil(data.earth_distance_km)}</span> kms from the Earth and moving away</p>
        <a href="./roadster.html"><button onclick="">Explore Roadster</button></a>
    `
}
roadster()