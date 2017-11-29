import React, {Component} from 'react';

class Post extends Component {
  render() {
    var posts = this.props.posts
    console.log(posts);

    return(
      <div>
        {this.props.posts.map((post) =>(
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    )
  }
}

export default Post;
