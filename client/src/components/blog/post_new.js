import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { createPost } from '../../actions';

class PostNew extends Component {

  handleFormSubmit({ title, categories, content }) {
    this.props.createPost({ title, categories, content }, (path) => {  // callback 1: history push
      this.props.history.push(path);
    }, (path, state) => {  // callback 2: history replace
      this.props.history.replace(path, state);
    });
  }

  renderInput = (field) => (
    <fieldset className="form-group">
      <label>{field.label}</label>
      <input
        className="form-control"
        {...field.input}
        type={field.type}
        placeholder={field.placeholder}
        required={field.required? 'required' : ''}
        disabled={field.disabled? 'disabled' : ''}
      />
    </fieldset>
  );

  renderTextEditor = (field) => (
    <fieldset className="form-group">
      <label>{field.label}</label>
      <input className="form-control" id="x" type="hidden" name="content" />
      <trix-editor input="x" {...field.input} />
    </fieldset>
  );

  renderAlert() {

    const { state } = this.props.history.location;
    const { action } = this.props.history;

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
      <div className="post">
        {this.renderAlert()}
        <h3 className="mb-5">New Post</h3>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field name="title" component={this.renderInput} type="text" label="Title:" placeholder="Enter your title" required={true} />
          <Field name="categories" component={this.renderInput} type="text" label="Categories:" placeholder="Enter categories, use ',' to separate" required={true} />
          <Field name="content" component={this.renderTextEditor} label="Content:" />
          <button action="submit" className="btn btn-success btn-block">Publish</button>
        </form>
      </div>
    );
  }
}

PostNew = reduxForm({
  form: 'post_new',  // name of the form
})(PostNew);

export default connect(null, { createPost })(PostNew);