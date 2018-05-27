import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      keyword: '',
      data: [],
      offset: 0,
      pageCount: 10,
      dropdownOpen: false
    }
    this.toggle = this.toggle.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount(){
    this.getEvenets('http://localhost:3000/events?_page=1&_limit=10');
  }

  handleChange(e){
    this.setState({ keyword: e.target.value });
  }

  getEvenets(defaultUrl, field, keyword, pageNumber=1){
    let url = defaultUrl ? defaultUrl :  `http://localhost:3000/events?${field}=${keyword}&_page=${pageNumber}}&_limit=10`; 

    axios.get(url)
      .then((response) => {
        console.log(response);
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  searchEvenet(e){
    e.preventDefault();
    this.getEvenets(null, 'category2', this.state.keyword, this.state.page);
    
  }

  handlePageClick(data){
    let selected = data.selected;
    let offset = Math.ceil(selected * 10);
    console.log(selected);
    this.setState({offset: offset}, () => {
      this.getEvenets(null, 'category2', this.state.keyword, selected + 1);
    });
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render(){
      return(
        <div id="react-paginate">
          <div style={{ margin: 20 }}>
            <h1>Mo's Historical Event Finder</h1>
          </div>
          <Dropdown style={{ margin: 20 }} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              Search Category
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Place</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Topic</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <form style={{ margin: 20 }} className="pure-form">
              <input type="text" className="pure-input-rounded" onChange={(e) => this.handleChange(e)}/>
              <button type="submit" className="pure-button" onClick={(e) => this.searchEvenet(e)} >Search</button>
          </form>
          <table className="pure-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Place/Topic</th>
                <th>Year</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody className="pure-table-odd">
              {this.state.data.map((event, index) => <EventTable key={index} index={index} event={event} />)}
            </tbody>
          </table>
          <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={this.state.pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
        </div>
      )
    }
};


const EventTable = ({ event, index }) => (
  <tr>
    <td>{index + 1}</td>
    <td>{event.category2}</td>
    <td>{event.date[0] === '-' ? 'BC '+ event.date.slice(1) : event.date }</td>
    <td>{event.description}</td>
  </tr>
);