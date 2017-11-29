import React, { Component } from 'react';

class Category extends Component {
  render() {
    var categories = this.props.categories

    return(
      <div>
        {this.props.categories.map((category) => (
          <li key={category.name}>
            {category.name}
          </li>
        ))}
      </div>
    )
  }
}

export default Category;
