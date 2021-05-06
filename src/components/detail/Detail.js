import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './detail.css';
import { BsFillXSquareFill } from "react-icons/bs";
import { AddComment, GetComments, EditComment } from '../../dataLayer/appAccesss'
export const Detail = ({ isDetail, detail, closeDetail, comments }) => {
  const [isAddComment, setIsAddComment] = React.useState(false);
  const [yourComment, setYourComment] = React.useState('');
  const [isEdit, setIsEdit] = React.useState(false);
  const [editId, setEditId] = React.useState(0);
  const handleChange = (e) => {
    e.preventDefault();
    setYourComment(e.target.value)
  }
  const handleEditComment = ({ comment }) => {
    setEditId(comment.id);
    setYourComment(comment.commentText)
    setIsEdit(true);
    setIsAddComment(false);
  }
  const handleEditCommentClick = () => {
    let user = parseInt(sessionStorage.getItem("exploreNashvegas_user"));
    const addedComment = { id: editId, userId: user, userMarkerId: detail.id, commentText: yourComment }
    EditComment(addedComment).then(resp => {
      setIsAddComment(false);
      setIsEdit(false);
      return resp;
    })
  }
  const handleSaveComment = () => {
    let user = parseInt(sessionStorage.getItem("exploreNashvegas_user"));
    const addedComment = { id: 0, userId: user, userMarkerId: detail.id, commentText: yourComment }
    AddComment(addedComment).then(resp => {
      setIsAddComment(false);
      return resp;
    })
  }
  const handleButtonClick = () => {
    setIsAddComment(true);
    setIsEdit(false);
  }
  const CommentForm = () => {
    if (isEdit) {
      return (<form>
        <label htmlFor='addComment'>Add a comment</label>
        <input
          name='addComment'
          placeholder='Your Comment'
          value={yourComment}
          onChange={handleChange}
        />
        {{ isEdit } && <button onClick={() => { handleEditCommentClick((detail)) }}>Update</button>}
      </form>)
    }
    if (isAddComment) {
      return (<form>
        <label htmlFor='addComment'>Add a comment</label>
        <input
          name='addComment'
          placeholder='Your Comment'
          value={yourComment}
          onChange={handleChange}
        />
        {{ isAddComment } && <button onClick={() => { handleSaveComment() }}>Save</button>}

      </form>)
    }
    return (<div></div>)

  }
  const Comments = ({ comment }) => {
    let user = parseInt(sessionStorage.getItem("exploreNashvegas_user"));
    if (user === comment.userId) {
      return <div><a href="#" onClick={() => { handleEditComment({ comment }) }}>Edit</a><p>{comment.user.email} says:{comment.commentText}</p></div>
    } else {
      return <div><p>{comment.user.email} says:{comment.commentText}</p></div>
    }

  }
  return (
    <div
      className={`detail__container detail__container--${isDetail && detail && "active"
        }`}
    >
      <div className="detail__close" onClick={() => closeDetail()}>
        <BsFillXSquareFill />
      </div>
      <div className="detail__title">{detail?.name}</div>
      <div className="detail__description__container">
        <div className="detail_itemDescription">
          <p>{detail?.description}</p>
          <p>Rating: {Number.parseFloat(detail?.ratingsTotal / detail?.nbrReviews).toFixed(2)}{String.fromCharCode(9733)}</p>
        </div>
        <div className="detail_comments_section">
          <h4>Comments </h4> <button onClick={() => { handleButtonClick() }}>Add Comment</button>
          <form>
        <label htmlFor='addComment'>Add a comment</label>
        <input
          name='addComment'
          placeholder='Your Comment'
          value={yourComment}
          onChange={handleChange}
        />
        {{ isEdit } && <button onClick={() => { handleEditCommentClick((detail)) }}>Update</button>}
        { {isAddComment } && <button onClick={() => { handleSaveComment() }}>Save</button>}
      </form>
          {
            comments.map(comment => {
              return <div key={comment.id}>
                <Comments comment={comment} user={parseInt(sessionStorage.getItem("exploreNashvegas_user"))} />
              </div>
            })
          }
        </div>
      </div>
      <div
        className="detail__picture"
      ></div>
    </div>
  );

}