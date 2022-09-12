import React, { Component } from 'react';
import { connect } from 'react-redux';

import NoMatch from '../../nomatch';
import PostBody from './post_body';
import Comments from './comments';
import CommentNew from './comment_new';
import Likes from './likes';
import LikeNew from './like_new';

import PostEdit from './post_edit';

import { fetchPost, checkAuthority, deletePost, updatePostLikes } from '../../../actions';
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";


class PostDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {  // component state: being read or being edited
      beingEdit: false,
      liked: false, 
      count: 0 
    };
  }

  componentDidMount() {

    // By default, we set beingEdit as false (Since when the user first click the post, the post detail is read, rather than edited)
    this.setState({
      beingEdit: false
    });

    this.setState({
      liked: false
    });

    // Get post id
    const { id } = this.props.match.params;

    // Fetch post detail
    if (!this.props.post) {
      this.props.fetchPost(id);
      
    }

    // Check whether current authenticated user has authority to make change to this post
    this.props.checkAuthority(id);
  }

  handleEditSuccess() {
    this.setState({
      beingEdit: false
    });
  }

  handleLikeSuccess() {
    this.setState({
      liked: false
    });
  }

  onEditClick() {
    this.setState({
      beingEdit: true
    });
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, (path) => {
      this.props.history.push(path);
    });
  }

  toggleLike = () => {
    
    let localLiked = this.state.liked;
    let localCount = this.state.count;
  
    localLiked = !localLiked;

    if (localCount) localCount = localCount - 1;
    else localCount = localCount + 1;

    this.setState({ liked: localLiked });
    this.setState({ count: localCount});

  };

    handleLikeStatus() {

    const _id = this.props.post._id;
    this.props.updatePostLikes( _id ,(path) => {
      this.props.history.push(path);
    });
  }

  renderDeleteConfirmModal() {  // used for delete confirmation
    return (
      <div className="modal fade" id="deleteConfirmModal" tabIndex="-1" role="dialog" aria-labelledby="deleteConfirmModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteConfirmModalLabel">Confirm Delete</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this post with its comments? <strong>Attention!</strong> This delete operation cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal" onClick={this.onDeleteClick.bind(this)}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderLikeCount(likes) {
    
    return (
      <div className='text-blue'>
          <span className="span-with-margin btn-like" 
                  onClick={() => this.toggleLike()}>
                  {this.state.liked === true ? 
                  ( <AiFillLike/> ) : ( <AiOutlineLike /> )} </span> 
          <span className="span-with-margin"> {this.state.count + likes.length} </span>
       </div>
    )
  }

  renderUpdateAndDeleteButton() {
    if (this.props.allowChange) {
      return (
        <div className='edit-delete-btns'>
          <button className="btn-edit btn-sm mr-1" onClick={this.onEditClick.bind(this)}><FiEdit/></button>
          <button className="btn-delete btn-sm" data-toggle="modal" data-target="#deleteConfirmModal"><FaTrashAlt/></button>
        </div>
      );
    }
  }

  render() {

    // If there is no post match the given post ID, render NoMatch page
    if (!this.props.post) {
      return <NoMatch />;
    }

    // If the component state 'beingEdit' is true, we render the post edit page
    if (this.state.beingEdit) {
      return (
        <PostEdit
          post={this.props.post}
          onEditSuccess={this.handleEditSuccess.bind(this)}
          history={this.props.history}
          state={this.props.history.location.state}
          action={this.props.history.action}
        />
      );
    }

    // Render the regular post detail page for reading
    return (
      <div className="post">
        
        <PostBody post={this.props.post}        
         history={this.props.history}
         state={this.props.history.location.state}
          action={this.props.history.action}
        />
         {this.renderLikeCount(this.props.post.likes)}
         {this.handleLikeStatus()}
       
       
      
        {/* <Likes postId={this.props.match.params.id} />
         <LikeNew
         postId={this.props.match.params.id}
         handleLike={this.toggleLike.bind(this)}
         history={this.props.history}
         state={this.props.history.location.state}
         action={this.props.history.action}
       /> */}
        {this.renderUpdateAndDeleteButton()}
       
        <Comments postId={this.props.match.params.id} />
        <CommentNew
          postId={this.props.match.params.id}
          history={this.props.history}
          state={this.props.history.location.state}
          action={this.props.history.action}
        />

        {this.renderDeleteConfirmModal()}

      </div>
    );
  }
}

function mapStateToProps({ posts, auth }, ownProps) {
  return {
    post: posts[ownProps.match.params.id],
    allowChange: auth.allowChange,
  };
}

export default connect(mapStateToProps, { fetchPost, checkAuthority, deletePost, updatePostLikes })(PostDetail);