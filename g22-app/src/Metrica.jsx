import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const tbodyStyle =  {
    height: '500px',     
    overflow : 'auto'
}

const divStyle = {
    margin: '2%'
};
class Metrica extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
          Reporte1: [],
          Reporte2: [],
          Reporte3: [],
          name : "Todos"
        };

        this.config = {
            type: 'funnel',
            data: {
                datasets: [{
                    data: [10, 35, 90, 123, 148],
                    backgroundColor: [
                        "#FF3333",
                        "#FFF833",
                        "#6FFF33",
                        "#33FFC9",
                        "#33AAFF",
                        "#3433FF",
                        "#FF33B4"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#36A2EB",
                        "#FFCE56", 
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }],
                labels: [
                    "Red",
                    "Blue",
                    "Yellow",
                    "Red",
                    "Blue"
                ]
            },
            options: {
                responsive: true,
                sort: 'desc',
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Click para ver grafica'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        };

      }

      handleSelectChange = (event) => {
        this.setState({
          name: event.target.value
        })
      }

    componentDidMount() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        };
        Promise.all([
            fetch("http://35.192.47.92/find",requestOptions),
            fetch("http://35.192.47.92/ultimos",requestOptions),
            fetch("https://us-central1-pure-advantage-305004.cloudfunctions.net/function-1/")
          ]).then(allResponses => {
            allResponses[0].json().then(data => this.setState({ Reporte1: data }))
            allResponses[1].json().then(data => this.setState({ Reporte2: data }))
            allResponses[2].json().then(data => this.setState({ Reporte3: data.datos }))
          });
    }

    render() {
        const { Reporte1,Reporte2,Reporte3,name } = this.state;
        const Lugares = [];
        const LugaresCont = [];
        var items = [
        ];
        Reporte1.forEach(element => {
            if (!Lugares.includes(element.location)) {
                Lugares.push(element.location);
            }
        });
        Lugares.forEach(elementL => {
            let cont = 0;
            Reporte1.forEach(element => {
                if(element.location === elementL){
                    cont += 1;
                }
            });
            items.push({
                name: elementL,
                value: cont
            });
            LugaresCont.push(cont);
        });
        items.sort(function (a, b) {
            if (a.value < b.value) {
              return 1;
            }
            if (a.value > b.value) {
              return -1;
            }
            // a must be equal to b
            return 0;
        });
        console.log(items);
    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <div class="card" style={divStyle}>
            <div class="card-body">
            <div class="scrollit" style={tbodyStyle}>
                <h3>Tabla de datos almacenados
                <select name="cars"  onClick={this.handleSelectChange} id="cars">
                    <option value="Todos">Todos</option>
                    <option value="REDIS">REDIS</option>
                    <option value="GRPC">GRPC</option>
                </select>
                </h3>
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Location</th>
                    <th scope="col">Age</th>
                    <th scope="col">VaccineType</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Path</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    Reporte1.filter(number => (number.path === name) || (name === 'Todos') ).map(el =>
                      <tr>
                      <th scope="row"> {el.name} </th>
                      <td>{el.location}</td>
                      <td>{el.age}</td>
                      <td>{el.vaccine_type}</td>
                      <td>{el.gender}</td>
                      <td>{el.path}</td>
                      </tr>
                    )
                  }
                </tbody>
                </table>
            </div>
            </div>
            </div>
            <hr></hr>
            <div class="card" style={divStyle}>
            <div class="card-body">
                <h3>Los últimos cinco vacunados almacenados por país</h3>
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Location</th>
                    <th scope="col">Age</th>
                    <th scope="col">VaccineType</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Path</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Reporte2.slice(0,5).map(el =>
                        <tr>
                        <th scope="row"> {el.name} </th>
                        <td>{el.location}</td>
                        <td>{el.age}</td>
                        <td>{el.vaccine_type}</td>
                        <td>{el.gender}</td>
                        <td>{el.path}</td>
                        </tr>
                        )
                    }
                </tbody>
                </table>
            </div>
            </div>
            <hr></hr>
            <div class="card" style={divStyle}>
            <div class="card-body">
                <h3>Los diez países con más vacunados</h3>
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.slice(0,10).map(el =>
                            <tr>
                            <th scope="row"> {el.name} </th>
                            <td>{el.value}</td>
                            </tr>
                        )
                    }
                </tbody>
                </table>
            </div>
            </div>
            <hr></hr>
            <div class="card" style={divStyle}>
            <div class="card-body">
            <div class="scrollit" style={tbodyStyle}>
                <h3>Personas vacunadas por cada país</h3>
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map(el =>
                            <tr>
                            <th scope="row"> {el.name} </th>
                            <td>{el.value}</td>
                            </tr>
                        )
                    }
                </tbody>
                </table>
            </div>
            </div>
            </div>
        </div>
      );
    }
}

export {Metrica};
