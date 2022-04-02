import React from 'react'
import './Table.css'
import {Card} from '@material-ui/core'

function Table({countries}) {
  return (
      <Card className="table">
          <div className="table__heading">
            <h3>Live Active Cases by Countries</h3>
           </div>
        
        <div className="table__stat">
            {countries.map((country)=>(
                <tr>
                    <td><img src={country.countryInfo.flag} className="table__flag"></img></td>
                    <td>{country.country}</td>
                    <td>{country.active}</td>
                </tr>
            ))}
        </div>
      </Card>
  )
}

export default Table
