import React, { Component } from 'react';
import * as ReadableAPI from './ReadableAPI.js'
import { Route, Link } from 'react-router-dom'
import Category from './Categories.js'
import Post from './Post.js'
import CreatePost from './CreatePost.js'
import EditPost from './EditPost.js'
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

   /*  */
   createPost = (post) => {  
      var D = new Date();
      post.id = D.getTime()+ 'xyz';
      post.timestamp = D.getTime();
    
      ReadableAPI.createPost(post).then((post) => {
          let posts = this.state.posts
          this.setState({ posts: posts.concat(post)})
      })
  }

  /*  */
  editPost = (post) => {
    
    ReadableAPI.editPost(post).then((resp) => {
      let posts = this.state.posts.filter((x) => x.id === resp.id)
      this.setState((state) => ({
        posts: posts.concat([resp])
      }))
    })
  }

  /*  */
  deletePost = (postid) => {
    let posts = this.state.posts.filter((x) => x.id !== postid)
    ReadableAPI.deletePost(postid).then((resp) => {
      let posts = this.state.posts.filter((x) => x.deleted !== true)
      this.setState((state) => ({
        posts: posts.concat([resp])
      }))
    })
  }

  /* Vote a post method */
  vote = (isUpVote, postid) => {
    var voteStatus;
    if(isUpVote === true){
      voteStatus = "upVote";
    } else {
      voteStatus = "downVote";
    }
    let posts = this.state.posts.filter((x) => x.id !== postid)
    ReadableAPI.votePost(voteStatus, postid).then((resp) => {     
      this.setState((state) => ({
        posts: posts.concat([resp])
      }))
    })
  }

  render() {
    return (
      <div>
          <header>
            <h1>Readable App</h1>
            <div className="open-search">
              <Link to="/create-post" onClick={() => this.setState({ showCreatePostPage: true })}>Create Post</Link>
            </div>
          </header>
          <div className="content-wrapper">
            <div className="side-bar">
              <Category categories={this.state.categories}></Category>
            </div>
            <div className="main-content">
              <Route exact path="/" render={() => (
                <Post posts={this.state.posts} vote={this.vote} editPost={this.editPost} deletePost={this.deletePost}></Post>
              )}/>
              <Route path="/category/:category" render={() => (
                <Post posts={this.state.posts} vote={this.vote} editPost={this.editPost} deletePost={this.deletePost}></Post>
              )}/>
              
              <Route path="/create-post" render={({ history }) => (
                  <CreatePost categories={this.state.categories}
                    onCreatePost={(post) => {
                        this.createPost(post)
                        history.push('/')
                    }} 
                  />
              )}/>
              <Route path="/post" render={({ history }) => (
                  <EditPost categories={this.state.categories}
                    onEditPost={(post) => {
                        this.editPost(post)
                        history.push('/')
                    }} 
                  />
              )}/>
              
            </div>

          </div>
      </div>
    );
  }
}

export default App;
