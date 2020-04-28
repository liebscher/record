import React from 'react';
import { Component } from 'react'
import './App.css';

require('dotenv').config()

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

    console.log(process.env.AWS_KEY);
    console.log(process.env.AWS_C_KEY);

    const prediction = await fetch('https://ko99ti48gb.execute-api.us-east-2.amazonaws.com/production', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': '',
      },
      body: JSON.stringify({
        message: text
      })
    })

    const json = await prediction.json()

    this.setState(state => ({
      ...state,
      isFetching: false,
      isLoaded: true,
      album: {
        name: json['album'],
        artist: json['artist'],
        release_year: json['release_year'],
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
            <h1 className="title">JKBX</h1>
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
