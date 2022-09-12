import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLikes } from '../../../actions';

class Likes extends Component {

  componentDidMount() {
    this.props.fetchLikes(this.props.postId);
  }


  renderLike(like) {
    return (
      <div key={like._id}>
        <div className="text-justify" />
        <div>
          <span className="span-with-margin f6 text-grey">{like.liked}</span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {_.map(this.props.likes, like => {
          return this.renderLike(like);
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { likes: state.likes };
}

export default connect(mapStateToProps, { fetchLikes })(Likes);