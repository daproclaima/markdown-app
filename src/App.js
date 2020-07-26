import React, { Component } from 'react';
import './App.css';
import { sampleText } from './sampleText'
import marked from 'marked'
import DOMPurify from 'dompurify'
class App extends Component {
  state = {
    text: sampleText
  }
  handleChange = event => {
    const text = event.target.value
    this.setState({ text })
  }

  renderText = text => marked(DOMPurify.sanitize(text))

  componentDidMount () {
    const text = localStorage.getItem('text')
    if (text) {
      this.setState( { text })
    } else {
      this.setState({ text: sampleText })
    }
  }
  componentDidUpdate () {
    const  { text } = this.state
    localStorage.setItem('text', text)
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <textarea onChange={this.handleChange} value={this.state.text} rows="35" className="form-control" />
          </div>
          <div className="col-sm-6">
            <div dangerouslySetInnerHTML={{ __html: this.renderText(this.state.text) }} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
