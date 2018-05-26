import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      clicked: [
        Array(10).fill(false),
        Array(10).fill(false),
        Array(10).fill(false),
        Array(10).fill(false),
        Array(10).fill(false),
        Array(10).fill(false),
        Array(10).fill(false),
        Array(10).fill(false),
        Array(10).fill(false),
        Array(10).fill(false),
      ],

    };
    this.clickHandler = this.clickHandler.bind(this);
  }


  resetBoard() {
    const emptyBoard = this.state.board.map(row => row.map(square => square = 0));
    this.setState({ board: emptyBoard }, () => {
      this.dropMines();
    });
  }


  dropMines() {
    console.log('game start');
    let mineNumber = 0;
    let mineX = 0;
    let minePosition = [mineX, 0];
    const newBoard = this.state.board.map((row) => {
      const randomMines = Math.floor(0 + (Math.random() * 4));
      for (let i = 1; i <= randomMines; i++) {
        const randomIndex = Math.floor(Math.random() * 9);
        if (mineNumber === 10) {
          return row;
        } else if (row[randomIndex] !== -1) {
          row[randomIndex] = -1;
          mineNumber++;
          minePosition = [mineX, randomIndex];
          this.countMines(minePosition);
        }
      }
      mineX++;
      return row;
    });
    this.setState({ board: newBoard });
  }


  countMines(mine) {
    const moBoard = this.state.board;
    const minex = mine[0];
    const miney = mine[1];
    console.log(minex, miney);
    debugger;
    const left = moBoard[minex - 1];
    const right = moBoard[minex + 1];
    const up = moBoard[miney + 1];
    const down = moBoard[miney - 1];
    if (left) {
      moBoard[minex - 1][miney] += 1;
      if (up) {
        moBoard[minex - 1][miney + 1] += 1;
        moBoard[minex][miney + 1] += 1;
      }
      if (down) {
        moBoard[minex - 1][miney - 1] += 1;
        moBoard[minex][miney - 1] += 1;
      }
    } else if (right) {
      if (up) {
        moBoard[minex + 1][miney + 1] += 1;
      }
      if (down) {
        moBoard[minex + 1][miney - 1] += 1;
      }
      moBoard[minex + 1][miney] += 1;
    }

    console.log(moBoard);
  }


  clickHandler(e) {
    console.log(e.target);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" onClick={() => this.resetBoard()} />
          <h1 className="App-title">Mo's MindSweeper</h1>
        </header>
        <table className="pure-table pure-table-bordered">
          <tbody >
            {this.state.board.map((row, index) => <Row key={index} row={row} clickHandler={this.clickHandler} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;


const Row = ({ row, clickHandler }) => (
  <tr>
    {row.map((square, index) => <Square key={index} square={square} clickHandler={clickHandler} />)}
  </tr>
);


const Square = ({ square, clickHandler }) => (
  <td onClick={clickHandler}>{square}</td>
);

