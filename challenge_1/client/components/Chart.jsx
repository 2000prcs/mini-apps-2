import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

export default class Chart extends Component {
  constructor(props){
    super(props);
    this.state = {
      chartData: this.props.chartData
    }
  }

  render(){
    return (
      <div>
        <Bar 
          data={this.props.chartData}
          options={{
            title: {
              display: true,
              text: 'BPI Data',
              fontSize: 25
            },
            legend: {
              display: true,
              position: 'right'
            }
          }} 
        />
        <Line 
          data={this.props.chartData} 
          options={{
            title: {
              display: true,
              text: 'Line title',
              fontSize: 25
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />
        <Pie 
          data={this.props.chartData} 
          options={{
            title: {
              display: true,
              text: 'Pie title',
              fontSize: 25
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />
      </div>

    )
  };


}