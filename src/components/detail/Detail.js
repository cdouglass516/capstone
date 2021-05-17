import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './detail.css';
import { BsFillXSquareFill } from "react-icons/bs";
import { AddComment, DeleteComment, GetComments, EditComment,EditMarker} from '../../dataLayer/appAccesss'
export const Detail = ({ isDetail, detail, closeDetail, comments, setComments, userRef, mapObj}) => {
  const [isAddComment, setIsAddComment] = React.useState(false);
  const [yourComment, setYourComment] = React.useState('');
  const [isEdit, setIsEdit] = React.useState(false);
  const [editId, setEditId] = React.useState(0);
  const [isRated, setIsRated] = React.useState(false);
  const [sliderVal, setSliderVal] = React.useState(0);
  const handleChange = (e) => {
    e.preventDefault();
    setYourComment(e.target.value)
    if(!isEdit)setIsAddComment(true);
  }
  const handleEditComment = ({ comment }) => {
    setEditId(comment.id);
    setYourComment(comment.commentText)
    setIsEdit(true);
    setIsAddComment(false);
  }
  const handleRatings = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    if (id === 'ratingsTotal') {
      setSliderVal(value);
    }
  }
  const AddUserMarkers = () =>{
    userRef.current.eachLayer(layer=>{
	          mapObj.addLayer(layer)})
  }
  const handleDeleteComment = ({ comment }) => {
    DeleteComment(comment).then(resp => {
      GetComments(detail.id).then(response => setComments(response))
      return resp;
    })
  }
  const handleEditCommentClick = () => {
    let user = parseInt(sessionStorage.getItem("exploreNashvegas_user"));
    const addedComment = { id: editId, userId: user, userMarkerId: detail.id, commentText: yourComment, datemod: Date.now() }
    EditComment(addedComment).then(resp => {
      setIsAddComment(false);
      setIsEdit(false);
      return resp;
    })
  }
  const handleSaveComment = () => {
    let user = parseInt(sessionStorage.getItem("exploreNashvegas_user"));
    if(Number(document.getElementById('ratingsTotal').value) !==0){
      setIsRated(true)
      const rt = document.getElementById('ratingsTotal');
      detail.ratingsTotal = Number(detail.ratingsTotal) + Number(rt.value);
      detail.nbrReviews++;
      EditMarker(detail).then(resp=>{
        GetComments(detail.id).then(response => setComments(response))
      }).then(resp =>{
        AddUserMarkers();
      }

      )
    }

    const addedComment = { id: 0, userId: user, userMarkerId: detail.id, commentText: yourComment, datemod: Date.now() }
    AddComment(addedComment).then(resp => {
      setIsAddComment(false);
      GetComments(detail.id).then(response => setComments(response))
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
    var d = new Date(comment.datemod);
    const comDate = d.toLocaleString();
    if (user === comment.userId) {
      return <div>{comDate}<p>{comment.user.email} says:{comment.commentText}</p><a href="#" className='btn_app' onClick={() => { handleEditComment({ comment }) }}>Edit</a><a href="#" className='btn_app' onClick={() => { handleDeleteComment({ comment }) }}>Delete</a><hr></hr></div>
    } else {
      return <div>{comDate}<p>{comment.user.email} says:{comment.commentText}</p></div>
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
          <p>Rating: {Number.parseFloat(detail?.ratingsTotal / detail?.nbrReviews).toFixed(2)}</p>

        </div>
        <div className="detail_comments_section">
          <div className="slidecontainer">

          </div>
          <form>
            <label htmlFor='addComment'>Add a comment</label>
            <div>
              <input type="range" min="1" max="100" className="slider" id="ratingsTotal" value={sliderVal} onChange={handleRatings}></input>
              <div className='flexDiv'>
                <label>Your Rating:</label>
              <input className='sliderInput' value={sliderVal} onChange={handleRatings}></input>
              </div>
            </div>
            <div>
            <input
              name='addComment'
              className='inpComment'
              placeholder='Your Comment'
              value={yourComment}
              onChange={handleChange}
            />
            </div>
            <div className='buttonDiv'>
            {isEdit && <button onClick={() => { handleEditCommentClick((detail)) }}>Update</button>}
            {isAddComment && <button onClick={() => { handleSaveComment() }}>Save</button>}
            </div>
          </form>
          <hr></hr>
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