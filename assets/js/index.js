// GLOBAL VARIABLES
const cardsSection = document.getElementById('cards-section');

// FETCH DATA FROM THE NPS API
fetch('https://developer.nps.gov/api/v1/parks?stateCode=CA&limit=12&api_key=nEPrc69f5PVslaxsp5uroi9c7jJMdAUTBt6SxGbA')
    .then(res => {
        if (!res.ok){
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {

        for (let i = 0; i < data.limit; i++){

            // SLICING ARRAY OF ACTIVITIES TO ONLY GET FIRST THREE ACTIVITIES
            let activitiesArray = data.data[i].activities.slice(0,3);

            const latitudeCoord = data.data[i].latitude
            let newLatitude = parseFloat(latitudeCoord).toFixed(3)

            const longitudeCoord = Math.abs(data.data[i].longitude)
            let newLongitude = parseFloat(longitudeCoord).toFixed(3)


            // THE HTML AND CSS FOR EACH CARD
            // USING MAP() METHOD ON THE ARRAY TO RETURN EACH ACTIVITY NAME
            cardsSection.innerHTML += `

                <div class="col">
                    <div class="card h-100">
                        <img src="${data.data[i].images[0].url}" class="card-img-top" alt="National Park main image">
                        <div class="card-body">
                            <h5 class="card-title">${data.data[i].fullName}</h5>
                            <p class="card-text">${data.data[i].description}</p>
                            <p class="card-text"><strong>GPS coordinates</strong>: ${newLatitude} N ${newLongitude} W</p>
                            <p class="card-text"><strong>Activities</strong>: ${activitiesArray.map(function(activity){
                                return ` ${activity.name}`})}
                            </p>
                            <a href="${data.data[i].url}" class="btn btn-primary" target="_blank" role="button">Go to NPS page</a>
                        </div>
                     </div>
                </div>
            `
        }
    })
    .catch(err => console.log(err));