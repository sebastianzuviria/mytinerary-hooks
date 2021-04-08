import { useSelector, useDispatch } from 'react-redux'
import commentServices from '../../services/comments'
import { getItinerariesOf } from '../../reducers/itineraryReducer' 
import { setUser } from '../../reducers/userReducer'

const styles = {
    card: {
        display: 'flex'
    }
}

const Comment = ({
    commentId,
    commentContent,
    commentLikes,
    commentDislikes,
    commentUser,
    commentItinerary
}) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const deleteComment = async () => {
        await commentServices.deleteComment(commentId)
        dispatch(getItinerariesOf(commentItinerary.city.name))
        const loggedUserJSON = window.localStorage.getItem('loggedMytineraryUser')
        const user = JSON.parse(loggedUserJSON)
        dispatch(setUser(user))
    }

    const likedComment = async () => {
        console.log('like')
        await commentServices.likedComment(commentId)
        dispatch(getItinerariesOf(commentItinerary.city.name))
        const loggedUserJSON = window.localStorage.getItem('loggedMytineraryUser')
        const user = JSON.parse(loggedUserJSON)
        dispatch(setUser(user))
    }

    const dislikedComment = async () => {
        console.log('dislike')
        await commentServices.dislikedComment(commentId)
        dispatch(getItinerariesOf(commentItinerary.city.name))
        const loggedUserJSON = window.localStorage.getItem('loggedMytineraryUser')
        const user = JSON.parse(loggedUserJSON)
        dispatch(setUser(user))
    }

    return (
        <div>
            <div>
                <div>{commentUser.firstName} {commentUser.lastName}</div>
                <div>{commentContent}</div>
            </div>
            <div style={styles.card}>
                <div>{commentLikes.length} <button onClick={likedComment}>likes</button></div>
                <div>{commentDislikes.length} <button onClick={dislikedComment}>dislikes</button></div>
                {user && user.id === commentUser.id && <button onClick={deleteComment}>Delete</button>}
            </div>        
        </div>
    )
}

export default Comment