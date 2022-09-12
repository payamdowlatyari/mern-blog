import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createLike } from '../../../actions';

class LikeNew extends Component {

  handleLike({ like }) {
    const postId = this.props.postId;

    console.log(postId)
    this.props.createLike({ like, postId }, () => {  // callback 1: clear text editor
    }, (path, state) => {  // callback 2: history replace
      this.props.history.replace(path, state);
    });    
  }

  renderAlert() {

    const { state } = this.props;
    const { action } = this.props;

    if (state && action === 'REPLACE') {
      return (
        <div className="alert alert-danger" role="alert">
          {`[${state.time}] --- `} <strong>Oops!</strong> {state.message}
        </div>
      );
    }
  }

  render() {

    const { handleSubmit } = this.props;

    return (
      <div>
        {handleSubmit(this.handleLike.bind(this))}
        {this.renderAlert()}
      </div>
    );
  }
}

LikeNew = reduxForm({
  form: 'like_new',  // name of the form
})(LikeNew);
// export default LikeNew;
export default connect(null, { createLike })(LikeNew);