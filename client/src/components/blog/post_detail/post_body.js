import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePostLikes } from '../../../actions/index';

class PostBody extends Component {

  componentWillMount() {
    if (this.props.authenticated) {  // if the user already signed in, navigate to '/posts'
      this.props.history.replace('/posts');
    }
  }
  renderTags(tags) {
    return tags.map(tag => {
      return <span className="badge badge-info span-with-margin" key={tag}>{tag}</span>;
    });
  }

  // handleLikeStatus() {

  //   const _id = this.props.post._id;
  //   // likes = likes.toString();

  //   this.props.updatePostLikes({ _id }, 
  //     this.props.onEditSuccess, (path, state) => {
  //     this.props.history.replace(path, state);
  //   });
  // }

  // renderAlert() {

  //   const { state } = this.props;
  //   const { action } = this.props;

  //   if (state && action === 'REPLACE') {
  //     return (
  //       <div className="alert alert-danger" role="alert">
  //         {`[${state.time}] --- `} <strong>Oops!</strong> {state.message}
  //       </div>
  //     );
  //   }
  // }

  render() {

    const { post } = this.props;

    return (
      <div className='post-card'>
        <h3>{post.title}</h3>
        <div className='post-tags'>{this.renderTags(post.categories)}</div> 

        <div className='post-text'>
              <div className="text-justify" dangerouslySetInnerHTML={{ __html: post.content }} />
       
        <div className='post-details'>
            <span className="span-with-margin text-black"> {post.authorName}</span>
             <span className="span-with-margin text-sm-grey">{new Date(post.time).toLocaleString()}</span>
        </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { initialValues: ownProps.post };
}

export default connect(mapStateToProps, { updatePostLikes })(PostBody);
