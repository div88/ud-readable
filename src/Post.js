import React, {Component} from 'react';
import Timestamp from 'react-timestamp';
import upvote from '../public/upvote.png'
import downvote from '../public/downvote.png'

class Post extends Component {
  render() {
    var posts = this.props.posts
     console.log(posts);
    // console.log(props.match.params);

    const Timestamp = require('react-timestamp');

    return(
      <div>
        {this.props.posts.map((post) =>(
          <div key={post.id} className="post-wrapper">
            <h1>{post.title}</h1>
            <p>{post.body}</p>
                <ul className="post-details">
                  <li>
                    <Timestamp time={post.timestamp} format='date' includeDay />
                  </li>
                  <li>{'-'+post.author}</li>

                  <li>
                    <span className="btn">Edit</span>
                    <span className="btn">Delete</span>
                  </li>

                  <li>
                    <button className="btn" onClick={(event) => this.props.vote(true, post.id)}>
                      <img src={upvote}/>
                    </button>
                    <button className="btn" onClick={(event) => this.props.vote(false, post.id)}>
                      <img src={downvote}/>
                    </button>
                  </li>
                </ul>
          </div>
        ))}
      </div>
    )
  }
}

export default Post;
