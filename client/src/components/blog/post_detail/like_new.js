import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { reduxForm, Field } from 'redux-form';
import { createLike } from '../../../actions';
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

class LikeNew extends Component {

    state = { liked: false };
  toggle = () => {
    let localLiked = this.state.liked;
  
    // Toggle the state variable liked 
    localLiked = !localLiked;
    this.setState({ liked: localLiked });
  };

//   handleFormSubmit({ like }) {
//     const postId = this.props.postId;
//     this.props.createLike({ like, postId }, () => {  // callback 1: clear text editor
//     }, (path, state) => {  // callback 2: history replace
//       this.props.history.replace(path, state);
//     });
//   }

//   renderTextEditor = (field) => (
//     <fieldset className="form-group">
//       <input className="form-control" id="x" type="hidden" name="content" />
//       <trix-editor input="x" {...field.input} />
//     </fieldset>
//   );

//   renderAlert() {

//     const { state } = this.props;
//     const { action } = this.props;

//     if (state && action === 'REPLACE') {
//       return (
//         <div className="alert alert-danger" role="alert">
//           {`[${state.time}] --- `} <strong>Oops!</strong> {state.message}
//         </div>
//       );
//     }
//   }

  render() {

    const { handleSubmit } = this.props;

    return (
      <div>
         <center>
          <div
            className="container"
            style={{ border: "1px solid black", width: "15%" }}
            onClick={() => this.toggle()}
          >
            <p>Like here</p>
            {this.state.liked === false ? (
              <AiFillLike /> 
            ) : (
              <AiOutlineLike />
            )}
          </div>
        </center>
        {/* <h3 className="mt-5 mb-4">New Comment</h3>
        {this.renderAlert()}
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field name="comment" component={this.renderTextEditor} />
          <button action="submit" className="btn btn-primary btn-sm">Post Your Comment</button>
        </form> */}
      </div>
    );
  }
}

// LikeNew = reduxForm({
//   form: 'like_new',  // name of the form
// })(LikeNew);
export default LikeNew;
// export default connect(null, { createLike })(LikeNew);