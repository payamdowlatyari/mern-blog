import _ from 'lodash';
import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts, updatePostLikes } from '../../actions/index';  

class PostList extends Component {

  componentDidMount() {
    this.props.fetchPosts();
  }

  renderTags(tags) {
    return tags.map(tag => {
      return <span className="badge badge-info span-with-margin" key={tag}>{tag}</span>;
    });
  }

  renderPostSummary(post) {
    return (
      <div className='post-links' key={post._id}>
        <h3>
          <Link className="link-without-underline" to={`/posts/${post._id}`}>
            {post.title}
          </Link>
        </h3>
          <span className='post-tags'>{this.renderTags(post.categories)}</span>    
          <span className="span-with-margin text-black">{post.authorName}</span>
          <span className="span-with-margin text-sm-grey">{new Date(post.time).toLocaleString()}</span>
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

function mapStateToProps(state, ownProps) {
  return { posts: state.posts, initialValues: ownProps.post };
}

export default connect(mapStateToProps, { updatePostLikes, fetchPosts })(PostList);