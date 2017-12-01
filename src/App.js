import React, { Component } from 'react';
import * as ReadableAPI from './ReadableAPI.js'
import { Route } from 'react-router-dom'
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
  vote = (isUpVote, postid) => {
    console.log(isUpVote);
    console.log(postid);

    var voteStatus;
    if(isUpVote === true){
      voteStatus = "upvote";
    } else {
      voteStatus = "downvote";
    }
    console.log(postid);
    console.log(voteStatus);
    ReadableAPI.votePost(voteStatus, postid).then((posts) => {
      this.setState(state => ({ posts: posts }))
    })
  }

  render() {
    return (
      <div>
          <header>
            <h1>Readable App</h1>
          </header>
          <div className="content-wrapper">
            <div className="side-bar">
              <Category categories={this.state.categories}></Category>
            </div>
            <div className="main-content">
              <Route path="/" render={() => (
                <Post posts={this.state.posts} vote={this.vote}></Post>
              )}/>
              <Route path="/category/:category" render={() => (
                <Post posts={this.state.posts} vote={this.vote}></Post>
              )}/>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
