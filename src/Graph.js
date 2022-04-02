import React , {useState , useEffect} from 'react'
import { Line } from 'react-chartjs-2';
import {Card} from '@material-ui/core'
import numeral from 'numeral'
import './Graph.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    } from 'chart.js';
    
    ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
    );

function Graph() {

    const options = {
        legend: {
          display: false,
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        maintainAspectRatio: false,
        tooltips: {
          mode: "index",
          intersect: false,
          callbacks: {
            label: function (tooltipItem, data) {
              return numeral(tooltipItem.value).format("+0,0");
            },
          },
        },
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                format: "MM/DD/YY",
                tooltipFormat: "ll",
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                // Include a dollar sign in the ticks
                callback: function (value, index, values) {
                  return numeral(value).format("0a");
                },
              },
            },
          ],
        },
      };

    const [ historyData , setHistoryData ] = useState([])   // store {date and point} of 120 days

    const url = "http://disease.sh/v3/covid-19/historical/all?lastdays=120"

    const buildGraph = (data) => {  // returns a list of {date and cases}
        const graph = [] ; 
        for(let date in data.cases) {
            const point = {
                x:date,
                y:data.cases[date]
            }
            graph.push(point)
        }
        return graph
    }

    useEffect(()=>{
        const getHistoryData = async () => {
            await fetch(url)
            .then(response => response.json())
            .then(data => {
                const graph = buildGraph(data)
                setHistoryData(graph)
            })
        }
        getHistoryData();
    },[])

    

  return (
    <Card className="graph">
         
         {historyData?.length > 0 && (
            <Line className="graph__chart"
                data={{
                    datasets: [
                    {
                        label: 'Worldwide Active Cases',
                        backgroundColor: "rgba(204, 16, 52, 0.5)",
                        borderColor: "#CC1034",
                        data: historyData,
                    },
                    ],
                }}
                options={options}
            />
      )}
    </Card>
       
  )
}

export default Graph


