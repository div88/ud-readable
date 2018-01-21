import React, {Component} from 'react';
import upvote from './upvote.png'
import downvote from './downvote.png'
import { Link } from 'react-router-dom';

class Post extends Component {
  timeConversion = (timeStamp) => {
    // var times = new Date(timeStamp).toISOString();
    var times = new Date(timeStamp).toString().slice(4,25);
    // var times = new Date(timeStamp).toISOString().slice(0,10);
    return times;
  }
  render() {
    var posts = this.props.posts;
    var categories = window.location.pathname.split("/");
    var category = categories[categories.length - 1];
    console.log(posts);

    posts = category !== "" && posts instanceof Array ? posts.filter(x=>x.category === category): posts;



    return(
      <div>
        {posts.map((post) =>(
          <div key={post.id} className="post-wrapper">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p>{'-'+post.author} <span className="time">{this.timeConversion(post.timestamp)}</span></p>
            <p></p>
            
            <hr/>
                <ul className="post-details">
                  <li>
                    <Link to={{
                        pathname: '/post',
                        state: {post: post}
                    }}> 
                        <span className="btn btn-edit" alt="up-vote" >Edit</span>
                    </Link>  
                    <span className="btn btn-delete" alt="down-vote" onClick={(event) => this.props.deletePost(post.id)}>Delete</span>
                    <button className="btn" onClick={(event) => this.props.vote(true, post.id)}>
                      <img src={upvote}/>
                    </button>
                    <button className="btn" onClick={(event) => this.props.vote(false, post.id)}>
                      <img src={downvote}/>
                    </button>
                  </li>

                  <li>
                    
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
