// MY CUSTOM JAVASCRIPT
const cardsSection = document.getElementById('cards-section');

fetch('https://developer.nps.gov/api/v1/parks?stateCode=CA&limit=12&api_key=nEPrc69f5PVslaxsp5uroi9c7jJMdAUTBt6SxGbA')
    .then(res => {
        if (!res.ok){
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {

        for (let i = 0; i < data.limit; i++){

            let activitiesArray = data.data[i].activities.slice(0,3);

            cardsSection.innerHTML += `

                <div class="col">
                    <div class="card h-100" style="width: 25rem;">
                        <img src="${data.data[i].images[0].url}" class="card-img-top" alt="National Park main image">
                        <div class="card-body">
                            <h5 class="card-title">${data.data[i].fullName}</h5>
                            <p class="card-text">${data.data[i].description}</p>
                            <p class="card-text"><strong>GPS coordinates</strong>: ${data.data[i].latitude} N ${data.data[i].longitude} W</p>
                            <p class="card-text"><strong>Activities</strong>: ${activitiesArray.map(function(activity){
                                return ` ${activity.name}`})} </p>
                            <button type="button" href="${data.data[i].url}" class="btn btn-primary" target="_new">Go to NPS page</button>
                        </div>
                     </div>
                </div>
            `
        }
    })
    .catch(err => console.log(err));


    // col-lg-4 col-md-6