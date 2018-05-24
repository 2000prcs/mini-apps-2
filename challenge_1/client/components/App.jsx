import React, { Component } from 'react';
import axios from 'axios';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Chart from './Chart.jsx';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      disclaimer: '',
      chartData: {},
      labels: [],
      bpiData: []      
    }

    this.getBPIdata = this.getBPIdata.bind(this);
  }

  componentDidMount(){
    this.getBPIdata();
  }

  // componentWillMount(){
  //   this.getChart();
  // }

  getBPIdata(){
    const url = 'https://api.coindesk.com/v1/bpi/historical/close.json';

    axios.get(url)
      .then((response) => {
        console.log('Data received', response);
        this.setState({ disclaimer: response.data.disclaimer });
        // this.setState({ chartData: response.data.bpi });

        this.setState({ labels: Object.keys(response.data.bpi) });
        this.setState({ bpiData: Object.values(response.data.bpi) })

        this.setState({
          // type: 'bar',
          chartData: {
              labels: this.state.labels,
              datasets: [{
                  label: 'BPI Data For Last 31 Days',
                  data: this.state.bpiData,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255,99,132,1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true
                      }
                  }]
              }
          }
      });


      })
      .catch((error) => {
        console.log('Error occured while fetching data', error);
      });
  }


  render(){
    return(
      <div>
        {/* <Bar data={this.state.chartData} /> */}
        <Chart chartData={this.state.chartData} />

        <div>
          <span>{this.state.disclaimer}</span>
        </div>
      </div>
    );
  };
}
