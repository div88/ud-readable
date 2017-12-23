import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'

class CreatePost extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true})
    if(this.props.onCreatePost) {
      this.props.onCreatePost(values)
    }
      
  }
  render() {
    var categories = this.props.categories;
    return (
      <div>
        <Link className="close-create-post" to="/">Close</Link>
        <form onSubmit={(e) => this.handleSubmit(e)} className="create-post-form">
          <div className="create-contact-details">
            <input type="text" name="title" placeholder="Title"/>
            <input type="text" name="body" placeholder="Body"/>
            <input type="text" name="author" placeholder="Author"/>
              {categories.map((category) => (
                <div key={category.name}>
                <input type="radio" name="category" value={category.name}/>{category.name}
                </div>
              ))}
            <button>Add Post</button>
           </div>
        </form>
      </div>
    )
  }
}

// id	String	Unique identifier
// timestamp	Integer	Time created - default data tracks this in Unix time. You can use Date.now() to get this number
//
// category	String	Should be one of the categories provided by the server
// voteScore	Integer	Net votes the post has received (default: 1)
// deleted

export default CreatePost
