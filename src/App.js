import React from 'react';
import { Component } from 'react'
import './App.css';

const Album = ({details}) => (
  <div>
    <p>{details.name}</p>
    <p>{details.artist}</p>
    <p>{details.release_year}</p>
  </div>
)

const AlbumLoading = () => (
  <p>Loading!</p>
)

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: '',
      album: {
        name: '?',
        artist: '?',
        release_year: '?',
      },
      isFetching: false,
      isLoaded: false,
    }

    this.predictRecord = this.predictRecord.bind(this)
    this.type = this.type.bind(this)
  }

  async predictRecord(text) {
    this.setState(state => ({
      ...state,
      isFetching: true,
    }));

    const prediction = await fetch('https://tidymodels.org/start/models/urchins.csv', {
      mode: 'no-cors'
    })

    let json = await prediction.text()

    console.log(json)
    json = 'test1'

    this.setState(state => ({
      ...state,
      isFetching: false,
      isLoaded: true,
      album: {
        name: json,
        artist: 'test2',
        release_year: 2020,
      }
    }));
  }

  type(e) {
    let t = e.target.value

    this.setState(state => ({
      ...state,
      text: t,
    }));
  }

  render() {
    const text = this.state.text

    const album = this.state.album

    const { isFetching, isLoaded } = this.state

    return (
      <div className="App">
        <div className="body">
          <div>
            <h1 className="title">Waders</h1>
            <p>
              to get you through the tides
            </p>
          </div>
          <div className="album">
            { isFetching ? <AlbumLoading /> : <Album details={album}/>}
          </div>
          <div className="input">
            <textarea onChange={this.type}>
            </textarea>
          </div>
          <div className="predict-btn" onClick={() => this.predictRecord(text)}>
            Predict
          </div>
        </div>
      </div>
    );
  }
}

export default App;
