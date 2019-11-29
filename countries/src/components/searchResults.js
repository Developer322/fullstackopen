import React from 'react'

const SearchResults = ({countries, showCountry}) => 
{
    if(countries.length>10){
        return(<div>Too mach matches, specify another filter</div>)
    }
    if(countries.length == 1){
        return(<CountryDetail name={countries[0].name} capital={countries[0].capital} population={countries[0].population} languages={countries[0].languages} flagLink={countries[0].flag} />)
    }
    return(countries.map( country => <div key={country.name}>{country.name} <button onClick={() => showCountry(country.name)}>show</button></div>))
}
    
const CountryDetail = ({name, capital, population, languages, flagLink}) => <div>
    <h1>{name}</h1>
    <div>capital {capital}</div>
    <div>population {population}</div>
    <h2>languages</h2>
    <ul>
        {languages.map( lang => <li key={lang.name}>{lang.name}</li>)}
    </ul>
    <div>
        <img src={flagLink} style={flagImageStyle} />
    </div>
</div>

const flagImageStyle = {
    maxWidth:200
}

export default SearchResults