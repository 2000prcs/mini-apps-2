import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Form3 from './Form3.jsx';

export default class Form2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      line1: '',
      line2: '',
      city: '',
      stateAddress: '',
      zip: 99999,
      phone: '',
      showForm: true,
    };
  }


  componentWillMount() {
    this.setState({ name: this.props.location.state.name });
  } 



  handleChange(e, type) {
    switch (type) {
      case 'line1':
        this.setState({ line1: e.target.value });
        break;
      case 'line2':
        this.setState({ line2: e.target.value });
        break;
      case 'city':
        this.setState({ city: e.target.value });
        break;
      case 'state':
        this.setState({ stateAddress: e.target.value });
        break;
      case 'zip':
        this.setState({ zip: e.target.value });
        break;
      case 'phone':
        this.setState({ phone: e.target.value });
        break;
      default:
        break;
    }
  }

  handleClick() {
    const data = {
      address: {
        line1: this.state.line1,
        line2: this.state.line2,
        city: this.state.city,
        state: this.state.stateAddress,
        zip: this.state.zip,
      },
      phone: this.state.phone,
    };

    this.setState({ showForm: false });
    this.props.sendUserInfo(this.props.location.state.name, data);
    this.props.history.push('/form3', this.state);
  }


  render() {
    return (
      <div>
        { this.state.showForm === true ?
            <div>
              <div>
                <div>
                  <span>Address Info</span>
                </div>
                <div>
                  <label htmlFor="line1">Line1: </label>
                  <input type="text" id="line1" onChange={(e) => this.handleChange(e, 'line1')} placeholder="Address line 1" />
                </div>
                <div>
                  <label htmlFor="line2">Line2: </label>
                  <input type="text" id="line2" onChange={(e) => this.handleChange(e, 'line2')} placeholder="Address line 2" />
                </div>
                <div>
                  <label htmlFor="city">City: </label>
                  <input type="text" id="city" onChange={(e) => this.handleChange(e, 'city')} placeholder="Enter city" />
                </div>
                <div>
                  <label htmlFor="state">State: </label>
                  <input type="text" id="state" onChange={(e) => this.handleChange(e, 'state')} placeholder="Enter state" />
                </div>
                <div>
                  <label htmlFor="zip">Zip Code: </label>
                  <input type="text" id="zip" onChange={(e) => this.handleChange(e, 'zip')} placeholder="Enter zip code" />
                </div>
                <div>
                  <label htmlFor="phone">Phone Number: </label>
                  <input type="text" id="phone" onChange={(e) => this.handleChange(e, 'phone')} placeholder="Enter phone number" />
                </div>
              </div>
                <button onClick={() => this.handleClick()}>Next</button>
            </div>
          : null
          }
      </div>
    );
  }
}
