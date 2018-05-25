import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import Form1 from './Form1.jsx';
import Form2 from './Form2.jsx';
import Form3 from './Form3.jsx';
import Confirmation from './Confirmation.jsx';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: true,
    };
  }

  sendUserInfo(username, data) {
    axios.post(`/checkout/${username}`, data)
      .then((respone) => {
        console.log('User Info Sent!', data);
      })
      .catch((error) => {
        console.log('Error occured while sending info', error);
      });
  }

  handleClick() {
    this.setState({ showForm: false });
    this.props.history.push('/form1');
  }

  render() {
    return (
      <div>
        <div>
        <span>HOME</span>
        </div>
        { this.state.showForm === true ?
          <button onClick={() => this.handleClick()} >Check Out</button>
          : null
        }
        <Switch>
          <Route path="/form1" render={props => <Form1 {...props} sendUserInfo={this.sendUserInfo} />} />
          <Route path="/form2" render={props => <Form2 {...props} sendUserInfo={this.sendUserInfo} />} />
          <Route path="/form3" render={props => <Form3 {...props} sendUserInfo={this.sendUserInfo} />} />
          <Route path="/confirm" component={Confirmation} />
        </Switch>
      </div>
    );
  }
}


export default withRouter(App);
