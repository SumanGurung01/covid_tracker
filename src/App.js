import React ,{useState , useEffect} from 'react';
import './App.css';
import Info from './Info'
import Table from './Table'
import Graph from './Graph'
import Map from './Map'
import 'leaflet/dist/leaflet.css';
import {FormControl,MenuItem,Select,Card} from '@material-ui/core'

function App() {

  const [ countries , setCountries ] = useState([]);  // list of countries with code
  const [ selectedCountry , setSelectedCountry ] = useState("WW");   // currently selected country code
  const [ countryStat , setCountryStat ] = useState([])   // currently selected country stats
  const [ mapCenter , setMapCenter ] = useState([20,77])   // map focus on load

  //initially load worldwide data 
  useEffect(()=>{
      const getCountryStat = async () => {
          await fetch("https://disease.sh/v3/covid-19/all")
          .then(response => response.json())
          .then((stat) => (
              setCountryStat(stat)
          ))
      }
      getCountryStat();
  },[])

  // get all countries list and code at initial
  useEffect(()=>{
    const getCountriesName = async () => {
        await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          setCountries(data);  
        })
    }
    getCountriesName();

  },[]);


  // change currently selected country  
  const onCountryChange = async(event) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode)

    const url = countryCode === "WW"? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then((response)=> response.json())
    .then((stat)=>{
      setCountryStat(stat)
    }) 
  }

  return (
    <div className="app grid">

        <Card className="app__header">
          
          <h1>Covid-19 Tracker </h1>
          
          <FormControl className="app__dropdown"> 
              <Select 
                variant="outlined" 
                value={selectedCountry}
                onChange={onCountryChange}
              >
                  <MenuItem value="WW">Worldwide</MenuItem>
                  {countries.map((country)=>(
                    <MenuItem value={country.countryInfo.iso2}>{country.country}</MenuItem>
                  ))}
              </Select>
          </FormControl>
        </Card>
        
        <br></br>
        
        <div className="app__info">  
            <Info 
              title="Corona Cases" 
              total={countryStat.active}
            />

            <Info 
              title="Recovered" 
              total={countryStat.recovered}
            />

            <Info 
              title="Death" 
              total={countryStat.deaths}
            />
        </div>

        <div className="app__table">
              <Table countries={countries}/>
              <Graph />
        </div>

        <div className="app__map">
              <Map 
                center={mapCenter}
                zoom={3} 
                countries={countries}
                className="map"
              />
        </div>

        <div className="app__developer">
            <a href="https://github.com/SumanGurung01" class="fa fa-github" target="_blank"></a>
            <a href="https://www.instagram.com/suman__grg" class="fa fa-instagram" target="_blank"></a>
            <br></br>
            <br></br>
        </div>
             
    </div>
  );
}

export default App;
