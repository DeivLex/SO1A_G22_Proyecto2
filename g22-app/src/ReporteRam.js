import React, { useState, useEffect } from "react";
import { Pie } from '@reactchartjs/react-chart.js';
import axios from "axios";

let totalRam = '';

const ReporteRam = () => {
  const [chartData, setChartData] = useState({});
  const chart = () => {
    let empSal = [];
    axios
      .post("http://35.192.47.92/genero")
      .then(res => {
        console.log(res.data[0]);
        res.data.forEach(element => {
          totalRam =  element[0];
          empSal.push(element[1]);
          empSal.push(element[2]);
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
      <div>
        <h2>Pais: {totalRam} </h2>
        <Pie data={chartData}/>
      </div>
    </div>
  );
};

export default ReporteRam;