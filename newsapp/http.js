// class for making api request
class ApiRequest{
    constructor(){
        this.weatherApi = '30356a9ae77c4a36924212421230308',
        this.newsApi = '066ae97a6dd84891bd5dd51cc0b20f50'
        this.geoIPApi = '918feb74461c5006420721a5ccdb7801400095e8'
    }

    // make IP api call request with call backs
    getIP(callbck){
        const xhr = new XMLHttpRequest()

        xhr.open('GET','https://api.ipify.org/?format=json', true)

        xhr.onload = function(){
            if(this.status === 200){
                callbck(null, this.responseText)
            } else{
                callbck('Error status of' + this.status)
            }
        }

        xhr.send()
    }

    // make geo api request
    async geoIP(){
        const response = await fetch(`https://api.getgeoapi.com/v2/ip/check?api_key=${this.geoIPApi}&format=json`);
        const data = await response.json()
        return data
    }

    // make weather api call request with async and fetch
    async getweather(location){
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${this.weatherApi}&q=${location}`)
        const data = await response.json()
        return data
    }

    // make a get news api request
    async getNews(url){
        const response = await fetch(url) 
        const data = await response.json()

        return data
    }
}