import React, { Component } from 'react';
import * as ReadableAPI from './ReadableAPI.js'
import { Route, Link } from 'react-router-dom'
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

   /*  */
   createPost = (post) => {  
      var D = new Date();
      post.id = D.getTime()+ 'xyz';
      post.timestamp = D.getTime();
    
      ReadableAPI.createPost(post).then((posts) => {
          // this.setState({ posts: posts })
      })
  }

  /*  */
  editPost = (id,title,body) => {
    console.log("Edit post: ----- " + id);
    console.log("Edit post: ----- " + title);
    console.log("Edit post: ----- " + body);
    
    // ReadableAPI.votePost(voteStatus, postid).then((resp) => {
    //   this.setState((state) => ({
    //     posts: state.posts.filter((x) => x.id !== postid),
    //     posts: state.posts.concat([resp]),
    //   }))
    //   var a = resp
    //   console.log(resp)
    // })
  }

  /*  */
  deletePost = (postid) => {
    console.log("Delete post: **** " + postid);
    let posts = this.state.posts.filter((x) => x.id !== postid)
    ReadableAPI.deletePost(postid).then((resp) => {
      let posts = this.state.posts.filter((x) => x.deleted !== true)
      this.setState((state) => ({
        posts: posts.concat([resp])
      }))
      var a = resp
      console.log(resp)
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
      var a = resp
    })
  }

  render() {
    return (
      <div>
          <header>
            <h1>Readable App</h1>
            <div className="open-search">
              <Link to="/post" onClick={() => this.setState({ showCreatePostPage: true })}>Create Post</Link>
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
              <Route path="/create-post" render={() => (
                <CreatePost></CreatePost>
              )}/>
               <Route path="/post" render={({ history }) => (
                  <CreatePost categories={this.state.categories}
                    onCreatePost={(post) => {
                        this.createPost(post)
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
