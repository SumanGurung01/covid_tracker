import React from 'react'
import './Info.css'
import {Card} from '@material-ui/core'

function Info({title , total}) {

  let styles;

  if(title=="Corona Cases"){
      styles = { borderLeft:"9px solid blue"}
  }else if(title=="Recovered"){
      styles = { borderLeft:"9px solid green"}
  }else{
      styles = { borderLeft:"9px solid red"}
  }

  return (
        <Card className="info__card" style={styles}>
            <h3>{title}</h3>
            { title==="Corona Cases" ? <h4>Active : {total}</h4> : <h4>Total : {total}</h4> }
        </Card>
  )
}

export default Info
