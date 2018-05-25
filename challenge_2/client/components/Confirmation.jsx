import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import App from './App.jsx';

export default class Form3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        name: '',
        email: '',
        address: {
          line1: '',
          line2: '',
          city: '',
          state: '',
          zip: 11111,
        },
        phone: '',
        creditCard: 1111,
        expirationDate: '',
        cvv: 1234,
        billingZip: 11111,
      },
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    axios.get(`/checkout/${this.props.location.state.name}`)
      .then((results) => {
        console.log(results.data);
        this.setState({ info: results.data });
      })
      .catch((error) => {
        console.log('Error occured', error);
      });
  }


  render() {
    return (
      <div>
        <div>
          <span>Purchase Confirmation</span>
        </div>
        <div>
          <span>Name: {this.state.info.name}</span>
        </div>
        <div>
          <span>Email: {this.state.info.email}</span>
        </div>
        <div>
          <span>Password: *******</span>
        </div>
        <div>
          <span>Phone: {this.state.info.phone}</span>
        </div>
        <div>
          <span>Address Info</span>
        </div>
        <div>
          <span>Line 1: {this.state.info.address.line1}</span>
        </div>
        <div>
          <span>Line 2: {this.state.info.address.line2}</span>
        </div>
        <div>
          <span>City: {this.state.info.address.city}</span>
        </div>
        <div>
          <span>State: {this.state.info.address.state}</span>
        </div>
        <div>
          <span>Zip Code: {this.state.info.address.zip}</span>
        </div>
        <div>
          <span>Billing Info</span>
        </div>
        <div>
          <span>Credit Card Number: {this.state.info.creditCard}</span>
        </div>
        <div>
          <span>Card Expiration Number: {this.state.info.expirationDate}</span>
        </div>
        <div>
          <span>Card CVV Number: {this.state.info.cvv}</span>
        </div>
        <div>
          <span>Billing Zip Code: {this.state.info.billingZip}</span>
        </div>
        <button onClick={() => this.props.history.push('/')}>Purchase</button>
        <Route exact path="/" component={App} />
      </div>
    );
  }
}

