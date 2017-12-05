import React, {Component} from 'react';
import upvote from '../public/upvote.png'
import downvote from '../public/downvote.png'

class Post extends Component {
  timeConversion = (timeStamp) => {
    // var times = new Date(timeStamp).toISOString();
    var times = new Date(timeStamp).toString().slice(4,25);
    // var times = new Date(timeStamp).toISOString().slice(0,10);
    return times;
  }
  render() {
    var posts = this.props.posts;
    var categories = location.pathname.split("/");
    var category = categories[categories.length - 1];
    console.log(posts);

    posts = category !== "" && posts instanceof Array ? posts.filter(x=>x.category === category): posts;



    return(
      <div>
        {posts.map((post) =>(
          <div key={post.id} className="post-wrapper">
            <h1>{post.title}</h1>
            <p>{post.body}</p>
                <ul className="post-details">
                  <li>{this.timeConversion(post.timestamp)}
                  </li>
                  <li>{'-'+post.author}</li>

                  <li>
                    <span className="btn" alt="up-vote">Edit</span>
                    <span className="btn" alt="down-vote">Delete</span>
                  </li>

                  <li>
                    <button className="btn" onClick={(event) => this.props.vote(true, post.id)}>
                      <img src={upvote}/>
                    </button>
                    <button className="btn" onClick={(event) => this.props.vote(false, post.id)}>
                      <img src={downvote}/>
                    </button>
                  </li>
                  <li>
                    {post.voteScore}
                  </li>
                </ul>
          </div>
        ))}
      </div>
    )
  }
}

export default Post;
