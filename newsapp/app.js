// init api request 
const apirequest = new ApiRequest()

// init ui
const ui = new UI()

// request for both ip and location
const country = []
apirequest.geoIP()
.then(res => {
    country.push(res.country.name)
})
console.log(country)


// request for weather
setTimeout(function(){
    apirequest.getweather(country[0])
    .then(data => {
        console.log(data.location)
        ui.locationInfo(data)
    })
},1000)

// news api key
const newsApi = '066ae97a6dd84891bd5dd51cc0b20f50'

// adding event to the dom to load all news from the news api
document.addEventListener('DOMContentLoaded', function(e){
    // unshow the navigate element
    ui.unShowElements('.navigate')

    // unshow category
    ui.unShowElements('.seecate')

    // make a news everything request
    apirequest.getNews(`https://newsapi.org/v2/everything?q=business&from=2023-08-07&to=2023-08-07&sortBy=popularity&apiKey=${newsApi}`)
    .then(function(res){
        const arrs = []

        res.articles.forEach(function(value,index){
            arrs.push(value)
        })

        arrs.forEach(function(value,index){
            if(value.urlToImage === null){
                arrs.splice(index, 1)
            } else{
                ui.showNews(value, document.querySelector('.news'))
            }
        })
    })

    // remove the weather after some seconds
    ui.timeUnShow('.weather', 'none', 10000)

    e.preventDefault()
})

// selectng the categories element from the dom
const category = document.querySelectorAll('.seecate li')

// adding event listener for every news or element categories
category.forEach((value,index)=>{
    value.addEventListener('click', function(e){
        // removing any current news 
        for(let i = 0; i < 100; i++){
            ui.clearSection()
        }

        apirequest.getNews(`https://newsapi.org/v2/everything?q=${value.innerHTML}&from=2023-08-08&to=2023-08-09&sortBy=popularity&apiKey=${newsApi}`)
        .then(function(res){

            const arrs = []

            res.articles.forEach(function(value,index){
                arrs.push(value)
            })

            arrs.forEach(function(value,index){
                if(value.urlToImage === null){
                    arrs.splice(index, 1)
                } else{
                    ui.unShowElements('.navigate')

                    ui.unShowElements('.seecate')

                    ui.unShowElements('.weather')

                    ui.showNews(value, document.querySelector('.news'))
                }
            })
        })

        e.preventDefault()
    })
})

// event for searching news
document.querySelector('.search').addEventListener('keyup', function(e){
    const searchValue = e.target.value.toLowerCase()

    ui.unShowElements('.news')

    apirequest.getNews(`https://newsapi.org/v2/top-headlines?country=${'ng'}&apiKey=${newsApi}`)
    .then(res => {
        res.articles.forEach((value,index) =>{
            if(value.title.toLowerCase().indexOf(searchValue) != 1){
                ui.showNews(value, document.querySelector('.relatednews'))
            }else{
                alert('no news found')
            }
        })
    })

    e.preventDefault()
})

// event listeners for displaying the navigate element
document.querySelector('.togglemenu').addEventListener('focus', ()=>{ui.showElements('.navigate')})

document.querySelector('#getweather').addEventListener('click', () =>{
    document.querySelector('.weather').style.display = 'flex'

    ui.unShowElements('.navigate')

    ui.timeUnShow('.weather', 'none', 5000)
})

document.querySelector('.newscate').addEventListener('click', () =>{
    ui.showElements('.seecate')
})