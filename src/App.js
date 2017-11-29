import React, { Component } from 'react';
import * as ReadableAPI from './ReadableAPI.js'
import Category from './Categories.js'
import Post from './Post.js'
import './App.css';

class App extends Component {
  state = {
    categories: [],
    posts: []
  }
  componentDidMount(){
    ReadableAPI.getAllCategories().then((categories) => {
      this.setState({ categories: categories })
    })

    ReadableAPI.getAll().then((posts) => {
      this.setState({ posts: posts })
    })
  }
  render() {
    return (
      <div>
        <Category categories={this.state.categories}></Category>
        <Post posts={this.state.posts}></Post>
      </div>
    );
  }
}

export default App;
