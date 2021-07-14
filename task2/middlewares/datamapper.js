const newsMapper = async (response)=>{
    let temp = {
        headline: '',
        link:''
    }
    let results = {
        count: response.totalResults,
        data: []
    }
    for(let x of response.articles){
        temp.headline = x.title;
        temp.link = x.url

        results.data.push(temp)
    }

    return results
}


const weatherMapper = async (response)=>{
    let temp = {
        date: '',
        main:'',
        temp:0
    }
    let results = {
        count: response.daily.length,
        unit:'metric',
        location: 'Bangalore',
        data: []
    }
    for(let x of response.daily){
        temp.date = new Date(x.dt);
        temp.main = x.weather[0].main;
        temp.temp = x.temp.day

        results.data.push(temp)
    }

    return results
}

module.exports ={
    newsMapper,
    weatherMapper
}