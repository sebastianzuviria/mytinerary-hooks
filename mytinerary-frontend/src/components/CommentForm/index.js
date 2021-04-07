import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getItinerariesOf } from '../../reducers/itineraryReducer'
import commentServices from '../../services/comments'

const CommentForm = ({ itineraryId, city }) => {
    const [commentContent, setCommentContent] = useState('')
    const dispatch = useDispatch()

    const handleComment = async (e) => {
        e.preventDefault()
        
        const comment = {
            content: commentContent,
            itinerary: itineraryId,
            activity: null,
        }
        
        await commentServices.comment(comment)
       
        dispatch(getItinerariesOf(city))
        setCommentContent('')
    }

    return (
        <div>
            <form onSubmit={handleComment}>
                <input 
                    type= 'text'
                    value={commentContent}
                    onChange={({ target }) => setCommentContent(target.value)}
                />
                <button type='submit'>Comment</button>
            </form>
        </div>
    )
}

export default CommentForm