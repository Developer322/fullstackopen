import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import SearchForm from './components/searchForm.js'
import SearchResults from './components/searchResults.js'
import Weather from './components/weather.js'

///////////////
///////////////INSERT HERE YOUR WEATHERSTACK API KEY
///////////////
const apiKey = ''
///////////////
///////////////
///////////////

const App = () => {
    const [searchText, setSearchText] = useState('')
    const [countries, setCountries] = useState([])
    const [weather, setWeather] = useState({})
    //TODO: loading hook
    let countriesFiltered = countries.filter( country => (new RegExp(searchText, 'gi')).test(country.name))
    
    useEffect(() => {
        axios
          .get('https://restcountries.eu/rest/v2/all')
          .then(response => {
            setCountries(response.data)
            countriesFiltered = response.data
          })
      }, [])

    const setSearchTextToValue = value => setSearchText(value)

    const filterCountries = e => setSearchText(e.target.value)

    if(countriesFiltered.length == 1 && Object.entries(weather).length == 0){
        axios
          .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(countriesFiltered[0].capital)}`)
          .then(response => {
            setWeather(response.data)
          })
    }else{
        countriesFiltered.length != 1 && Object.entries(weather).length && setWeather({})
    }

    return(
        <>
            <SearchForm text='find countries' onSearch={filterCountries} searchValue={searchText} />
            <SearchResults countries={countriesFiltered} showCountry={setSearchTextToValue} />
            {Object.entries(weather).length>0 && <Weather capital={countriesFiltered[0].capital} temperature={weather.current.temperature} icon={weather.current.weather_icons[0]} windSpeed={weather.current.wind_speed} windDirection={weather.current.wind_dir} />}
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
