import React, { useState, useEffect } from "react";
import { Pie } from '@reactchartjs/react-chart.js';
import axios from "axios";

let totalRam = '';
let state = {
  name : "Guatemala"
};
let empFilter = [];

axios
  .post("http://35.192.47.92/genero")
  .then(res => {
    res.data.forEach(element => {
      empFilter.push(element[0]);
    });
  })
.catch(err => {
  console.log(err);
});
const ReporteRam = () => {


  const handleSelectChange = (event) => {
    state = {
      name: event.target.value
    };
  }

  const [chartData, setChartData] = useState({});
  const chart = () => {
    let empSal = [];
    axios
      .post("http://35.192.47.92/genero")
      .then(res => {
        res.data.forEach(element => {
          if (element[0] === state.name){
            totalRam =  element[0];
            empSal.push(element[2]);
            empSal.push(element[1]);
          }
        });
        setChartData({
          labels: ["Femenino","Maculino"],
          datasets: [
            {
              label: "level of thiccness",
              data: empSal,
              backgroundColor: ['rgba(255, 99, 132, 0.2)',"rgba(75, 192, 192, 0.6)",
              'rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)',
              'rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)'],
              borderColor: [
                'rgba(0,0,0, 1)','rgba(0,0,0, 1)','rgba(0,0,0, 1)',
                'rgba(0,0,0, 1)','rgba(0,0,0, 1)','rgba(0,0,0, 1)',
                'rgba(0,0,0, 1)','rgba(0,0,0, 1)','rgba(0,0,0, 1)'
              ],
              borderWidth: 1
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    setInterval(() => {
      chart();
    }, 5000);
  }, []);
  return (
    <div className="App">
      <select name="cars" onClick={handleSelectChange} id="cars">
          <option value="Guatemala">Guatemala</option>
          {
            empFilter.map(el =>
              <option value={el}>{el}</option>
              )
          }
      </select>
      <div>
        <h2>Pais: {totalRam} </h2>
        <Pie data={chartData}/>
      </div>
    </div>
  );
};

export default ReporteRam;