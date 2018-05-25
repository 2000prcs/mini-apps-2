import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class Form3 extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      creditCard: 1111,
      expirationDate: '',
      cvv: 1234,
      billingZip: 11111,
      showForm: true,
    };
  }

  componentWillMount() {
    this.setState({ name: this.props.location.state.name });
  }


  handleChange(e, type) {
    switch (type) {
      case 'creditCard':
        this.setState({ creditCard: e.target.value });
        break;
      case 'expirationDate':
        this.setState({ expirationDate: e.target.value });
        break;
      case 'cvv':
        this.setState({ cvv: e.target.value });
        break;
      case 'billingZip':
        this.setState({ billingZip: e.target.value });
        break;
      default:
        break;
    }
  }


  handleClick() {
    const data = {
      creditCard: this.state.creditCard,
      expirationDate: this.state.expirationDate,
      cvv: this.state.cvv,
      billingZip: this.state.billingZip,
    };

    this.setState({ showForm: false });
    this.props.sendUserInfo(this.props.location.state.name, data);
    this.props.history.push('/confirm', this.state);
  }

  render() {
    return (

      <div>
        {this.state.showForm === true ?
          <div>
            <div>
              <div>
                <span>Billing Info</span>
              </div>
              <div>
                <label htmlFor="creditCard">Credit Card Number: </label>
                <input type="text" id="creditCard" onChange={e => this.handleChange(e, 'creditCard')} placeholder="Enter your card number" />
              </div>
              <div>
                <label htmlFor="expiration">Card Expiration Date: </label>
                <input type="text" id="expiration" onChange={e => this.handleChange(e, 'expiration')} placeholder="Enter expiration date" />
              </div>
              <div>
                <label htmlFor="cvv">CVV: </label>
                <input type="text" id="cvv" onChange={e => this.handleChange(e, 'cvv')} placeholder="Enter CVV number" />
              </div>
              <div>
                <label htmlFor="billingZip">Billing Zip Code: </label>
                <input type="text" id="billingZip" onChange={e => this.handleChange(e, 'billingZip')} placeholder="Enter state" />
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

