import React, { Component } from 'react';
import axios from 'axios';

export default class Form1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      showForm: true,
    };
  }

  handleChange(e, type) {
    switch (type) {
      case 'name':
        this.setState({ name: e.target.value });
        break;
      case 'email':
        this.setState({ email: e.target.value });
        break;
      case 'password':
        this.setState({ password: e.target.value });
        break;
      default:
        break;
    }
  }


  handleClick() {
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    this.setState({ showForm: false });
    this.props.sendUserInfo(this.state.name, data);
    this.props.history.push('/form2', this.state);
  }


  render() {
    return (
      <div>
        { this.state.showForm === true ?
          <div>
            <div>
              <div>
                <span>Basic Info</span>
              </div>
              <div>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" onChange={e => this.handleChange(e, 'name')} placeholder="Enter your name" />
              </div>
              <div>
                <label htmlFor="email">Email: </label>
                <input type="text" id="email" onChange={e => this.handleChange(e, 'email')} placeholder="Enter your email" />
              </div>
              <div>
                <label htmlFor="password">Password: </label>
                <input type="text" id="password" onChange={e => this.handleChange(e, 'password')} placeholder="Enter your password" />
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

