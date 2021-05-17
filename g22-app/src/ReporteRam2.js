import React, { useState, useEffect } from "react";
import { Bar } from '@reactchartjs/react-chart.js';
import axios from "axios";


let empSal = [];
let empAge = [];
const ReporteRam2 = () => {
  const [chartData, setChartData] = useState({});
  const chart = () => {
    axios
      .post("http://35.192.47.92/find")
      .then(res => {
        empAge = [];
        empSal = [];
        console.log(res.data);
        let cont = 0;
        let cont1 = 0;
        let cont2 = 0;
        let cont3 = 0;
        let cont4 = 0;
        let cont5 = 0;
        let cont6 = 0;
        let cont7 = 0;
        let cont8 = 0;
        let cont9 = 0;
        res.data.forEach(element => {
          if(element.age > 0 && element.age < 11){
            cont += 1;
          }else if(element.age > 10 && element.age < 21){
            cont1 += 1;
          }else if(element.age > 20 && element.age < 31){
            cont2 += 1;
          }else if(element.age > 30 && element.age < 41){
            cont3 += 1;
          }else if(element.age > 40 && element.age < 51){
            cont4 += 1;
          }else if(element.age > 50 && element.age < 61){
            cont5 += 1;
          }else if(element.age > 60 && element.age < 71){
            cont6 += 1;
          }else if(element.age > 70 && element.age < 81){
            cont7 += 1;
          }else if(element.age > 80 && element.age < 91){
            cont8 += 1;
          }else if(element.age > 90 && element.age < 101){
            cont9 += 1;
          }
        });
        empSal.push(cont);
        empSal.push(cont1);
        empSal.push(cont2);
        empSal.push(cont3);
        empSal.push(cont4);
        empSal.push(cont5);
        empSal.push(cont6);
        empSal.push(cont7);
        empSal.push(cont8);
        empSal.push(cont9);
        empAge.push('0-10');
        empAge.push('10-20');
        empAge.push('20-30');
        empAge.push('30-40');
        empAge.push('40-50');
        empAge.push('50-60');
        empAge.push('60-70');
        empAge.push('70-80');
        empAge.push('80-90');
        empAge.push('90-100');
        setChartData({
          labels: empAge,
          datasets: [
            {
              label: "Edades",
              data: empSal,
              backgroundColor: ["rgba(75, 192, 192, 0.6)",'rgba(255, 99, 132, 0.2)',
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
        <Bar data={chartData} options={
          {
            scales: {
              yAxes: [
                {
                  ticks: {
                    min: 0,
                    max: 1000,
                    stepSize: 200
                  },
                },
              ],
            },
          }
        }/>
      </div>
    </div>
  );
};

export default ReporteRam2;