import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import ReporteRam from './ReporteRam';
import ReporteRam2 from './ReporteRam2';

const divStyle = {
    margin: '2%'
};

class Vista extends React.Component{

  constructor(props) {
    super(props);
  }

  componentDidMount() {
}

  render() {
     return(
        <div>
            <br></br>
            <br></br>
            <br></br>
            <div class="card" style={divStyle}>
            <div class="card-body">
                <h3>Géneros de los vacunados por país</h3>
                <ReporteRam />
            </div>
            </div>
            <hr></hr>
            <div class="card" style={divStyle}>
            <div class="card-body">
                <h3>Rango de edades por cada país</h3>
                <ReporteRam2/>
            </div>
            </div>
            <hr></hr>
        </div>
      );
    }
}

export {Vista};
