import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePostLikes, addLike, removeLike, verifyJwt} from '../../../actions/index';
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

class PostBody extends Component {


  componentWillMount() {
    this.props.verifyJwt();  // fetch username
    if (this.props.authenticated && !this.props.user) {  // if the user already signed in, navigate to '/posts'
      this.props.history.replace('/posts');
     
    }
  }
  renderTags(tags) {
    return tags.map(tag => {
      return <span className="badge badge-info span-with-margin" key={tag}>{tag}</span>;
    });
  }

  renderLikes(likes) {

    console.log(this.props.verifyJwt())

    let tempLikes = likes;

    if (tempLikes.includes(this.props.post.authorId))
        return <span className="btn-like span-with-margin"><AiFillLike/> </span>;
    else 
        return <span className="btn-like span-with-margin"><AiOutlineLike/> </span>;
  }

  handleLikeStatus() {

  const _id = this.props.post._id;
  let likes = this.props.post.likes;

  const userid = this.props.post.authorId

return <div>
  <span onClick={() => this.props.addLike(_id, userid)}
          className="span-with-margin btn-like">
         <AiFillLike/> 
          {' '}
          <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        </span>
        <span onClick={() => this.props.removeLike(_id, userid)}
          className="span-with-margin btn-like">
        <AiOutlineLike/> 
        </span>
</div>
    
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
        <div className='post-tags'>{this.renderLikes(post.likes)}</div> 
        <div className='post-text'>
              <div className="text-justify" dangerouslySetInnerHTML={{ __html: post.content }} />
       
        <div className='post-details'>
            <span className="span-with-margin text-black"> {post.authorName}</span>
             <span className="span-with-margin text-sm-grey">{new Date(post.time).toLocaleString()}</span>
             {/* <span> {this.handleLikeStatus()} </span> */}
        </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(_state, ownProps) {
  return { initialValues: ownProps.post };
}

export default connect(mapStateToProps, { updatePostLikes, addLike, removeLike, verifyJwt })(PostBody);
