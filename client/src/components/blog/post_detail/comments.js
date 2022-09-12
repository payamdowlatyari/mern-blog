import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../../../actions';

class Comments extends Component {

  componentDidMount() {
    this.props.fetchComments(this.props.postId);
  }

  renderComment(comment) {
    return (
      <div key={comment._id}>
        <div className='comment-text-box'>
          <div className='comment-text text-black'>
          <div className="text-justify" dangerouslySetInnerHTML={{ __html: comment.content }} />
          </div>
          
          <div>
            <span className="span-with-margin f6 text-grey">{comment.authorName}</span>
            <span className="span-with-margin f6 text-sm-grey">{new Date(comment.time).toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h5 className="mt-5 mb-4">Comments</h5>
        {_.map(this.props.comments, comment => {
          return this.renderComment(comment);
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { comments: state.comments };
}

export default connect(mapStateToProps, { fetchComments })(Comments);