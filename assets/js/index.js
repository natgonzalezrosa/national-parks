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

        console.log(data.data)

        for (let i = 0; i < data.limit; i++){
            console.log(data.data[i].fullName)
            console.log(data.data[i].description)
            console.log(data.data[i].images[0].url)
            console.log(data.data[i].latitude)
            console.log(data.data[i].longitude)
            console.log(data.data[i].url)
            console.log(data.data[i].activities)

            let activitiesArray = data.data[i].activities.slice(0,3);

            cardsSection.innerHTML += `

                <div class="col-lg-4 col-md-6">
                    <div class="card" style="width: 25rem;">
                        <img src="${data.data[i].images[0].url}" class="card-img-top" alt="National Park main image">
                        <div class="card-body">
                            <h5 class="card-title">${data.data[i].fullName}</h5>
                            <p class="card-text">${data.data[i].description}</p>
                            <p class="card-text"><strong>Activities</strong>: ${activitiesArray.map(function(activity){
                                return ` ${activity.name}`})} </p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                     </div>
                </div>
            `
        }
    })
    .catch(err => console.log(err));