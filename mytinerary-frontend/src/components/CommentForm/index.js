import './index.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getItinerariesOf } from '../../reducers/itineraryReducer'
import { setUser } from '../../reducers/userReducer'
import commentServices from '../../services/comments'

const CommentForm = ({ itineraryId, city }) => {
  const [commentContent, setCommentContent] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleComment = async (e) => {
    e.preventDefault()

    const comment = {
      content: commentContent,
      itinerary: itineraryId,
      activity: null
    }

    await commentServices.comment(comment)

    dispatch(getItinerariesOf(city))
    const loggedUserJSON = window.localStorage.getItem('loggedMytineraryUser')
    const user = JSON.parse(loggedUserJSON)
    dispatch(setUser(user))
    setCommentContent('')
  }

  return (
    <div className='CommentForm'>
      <div className='UserImage' style={{ backgroundImage: `url(${user.imgUrl})` }} />
      <form className='Form' onSubmit={handleComment}>
        <input
          className='InputComment'
          type='text'
          value={commentContent}
          onChange={({ target }) => setCommentContent(target.value)}
        />
        {commentContent.length > 0 ? <button className='ButtonComment' type='submit'>Comment</button> : <button className='ButtonComment Disabled' disabled>Comment</button>}
      </form>
    </div>
  )
}

export default CommentForm
