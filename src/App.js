import React, { Component } from 'react';
import * as ReadableAPI from './ReadableAPI.js'
import { Route } from 'react-router-dom'
import Category from './Categories.js'
import Post from './Post.js'
import CreatePost from './CreatePost.js'
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


    var voteStatus;
    if(isUpVote === true){
      voteStatus = "upVote";
    } else {
      voteStatus = "downVote";
    }


    ReadableAPI.votePost(voteStatus, postid).then((resp) => {
      //this.stateposts.filter(x => x.id != postid)
      //posts: state.posts.filter((x) => x.id !== postid)
      
      this.setState((state) => ({
        posts: state.posts.filter((x) => x.id !== postid),
        posts: state.posts.concat([resp]),
      }))
      var a = resp
      console.log(resp)
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
              <Route exact path="/" render={() => (
                <Post posts={this.state.posts} vote={this.vote}></Post>
              )}/>
              <Route path="/category/:category" render={() => (
                <Post posts={this.state.posts} vote={this.vote}></Post>
              )}/>
              <Route path="/create-post" render={() => (
                <CreatePost></CreatePost>
              )}/>
            </div>

          </div>
      </div>
    );
  }
}

export default App;
