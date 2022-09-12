import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPostsByUserId } from '../../actions/index';

class PostMine extends Component {

  componentDidMount() {
    this.props.fetchPostsByUserId();
  }

  renderTags(tags) {
    return tags.map(tag => {
      return <span className="badge badge-info span-with-margin" key={tag}>{tag}</span>;
    });
  }

  renderPostSummary(post) {
    return (
      <div key={post._id}>
        <div className='post-text'>
             <h3>
               <Link className="link-without-underline" to={`/posts/${post._id}`}>
                      {post.title}
              </Link>
             </h3>
          <div className='post-tags'>{this.renderTags(post.categories)}</div>
          <span className="span-with-margin text-black">{post.authorName}</span>
          <span className="span-with-margin text-sm-grey">{new Date(post.time).toLocaleString()}</span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="post">
        {_.map(this.props.posts, post => {
          return this.renderPostSummary(post);
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPostsByUserId })(PostMine);