import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Category extends Component {
  render() {
    //var categories = this.props.categories

    return(
      <div>
        {this.props.categories.map((category) => (
          <h3 key={category.name}>
            <Link to={{
              pathname: '/category/' + category.name,
              state: { fromDashboard: true }
            }}>
              {category.name}
            </Link>
          </h3>
        ))}
      </div>
    )
  }
}

export default Category;
