class UI{
    constructor(){
        this.news = document.getElementById('news')
    }

    // method to show or append news element to the news section
    showNews(value, domAppend){
        let output = ''
        output += `
            <div class="foreachnews">
                <img class="newsimg" src="${value.urlToImage}" alt="no image for this news">
                <h3 class="title">${value.title}</h3>
                <div class="newscontent">
                    <a href="${value.url}" target="_blank" style="color: black; text-decoration: none; font-size: 17px;">
                        <p class="content">${value.description}</p>
                    </a>
                </div>
            </div>
        `;
        domAppend.innerHTML += output
    }

    // remove method to remove any news inside the news section
    clearSection(){
        for( let i = 0; i < this.news.children.length; i++ ){
            this.news.children[i].remove()
        }
    }

    // method to show any element
    showElements(className){
        document.querySelector(className).style.display = 'block'
    }

    // method to unshow any element
    unShowElements(className){
        document.querySelector(className).style.display = 'none'
    }

    // weather method
    locationInfo(data){
        let output = ''
        output = `
            <dt class="forlat">Your Latitude</dt>
            <dd class="lat">${data.location.lat}</dd>
            <dt class="forlon">Your Longitude</dt>
            <dd class="lon">${data.location.lon}</dd>
            <dt class="forcountry">Your Country</dt>
            <dd class="country">${data.location.country}</dd>
            <dt class="forregion">Your Region</dt>
            <dd class="region">${data.location.region}</dd>
            <dt class="fortime">Your Local Time</dt>
            <dd class="time">${data.location.localtime}</dd>
         `
        document.querySelector('.locationinfo').innerHTML = output
        
        output = `
            <dt class="fortempc">Temperature In Celsius</dt>
            <dd class="tempc">${data.current.temp_c}</dd>
            <dt class="fortempf">Temperature In Fahrenheit</dt>
            <dd class="tempf">${data.current.temp_f}</dd>
        `
        document.querySelector('.weatherinfotemp').innerHTML = output

        output = `
            <dt class="conditiontext">Partly Cloudy</dt>
            <dd class="conicon">
                <img class="weatherimg" src="${data.current.condition.icon}" alt="">
            </dd>
            <dt class="humidity">humidity</dt>
            <dd class="humnum">${data.current.humidity}</dd>
        `
        document.querySelector('.con').innerHTML = output
    }

    // show any element method
    timeShow(element, showType, time){
        setTimeout(function(){
            document.querySelector(element).style.display = showType
        }, time)
    }

    // unshow any element method
    timeUnShow(element, showType, time){
        setTimeout(function(){
            document.querySelector(element).style.display = showType
        }, time)
    }
}