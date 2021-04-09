import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import commentServices from '../../services/comments'
import { getItinerariesOf } from '../../reducers/itineraryReducer' 
import { setUser } from '../../reducers/userReducer'

const styles = {
    container: {
        borderColor: 'grey',
        borderWeigth: 1,
        borderStyle: 'solid',
        margin: 5
    },
    buttonBox: {
        display: 'flex',
        margin: 5
    },
    button: {
        margin: 5
    },
    user: {
        width: 'auto',
        display: 'flex',
        alignItems: 'center'
    },
    userImg: {
        width: 30,
        margin: 5
    },
    commentBox: {
        margin: 10,
        marginTop: 0
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
    const [buttonLike, setButtonLike] = useState('like')
    const [buttonDislike, setButtonDislike] = useState('liked')
    const [numberLikes, setNumberLikes] = useState(0)
    const [numberDislikes, setNumberDislikes] = useState(0)

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    
    useEffect(() => {
        if(user) {
            const isLiked = commentLikes.find(l => String(l) === user.id)
            const isDisliked = commentDislikes.find(d => String(d) === user.id)
            setNumberLikes(commentLikes.length)
            setNumberDislikes(commentDislikes.length)
            isLiked ? setButtonLike('liked') : setButtonLike('like')
            isDisliked ? setButtonDislike('disliked') : setButtonDislike('dislike')
        }
    }, [commentDislikes, commentLikes]) //eslint-disable-line


  

    const deleteComment = async () => {
        await commentServices.deleteComment(commentId)
        dispatch(getItinerariesOf(commentItinerary.city.name))
        const loggedUserJSON = window.localStorage.getItem('loggedMytineraryUser')
        const user = JSON.parse(loggedUserJSON)
        dispatch(setUser(user))
    }

    const likedComment = async () => {
        if(buttonLike === 'like') {
            setButtonLike('liked')
            setNumberLikes(numberLikes + 1)
            if (buttonDislike === 'disliked') {
                setButtonDislike('dislike')
                setNumberDislikes(numberDislikes - 1)
            }
        } else if (buttonLike === 'liked') {
            setButtonLike('like')
            setNumberLikes(numberLikes - 1)
        }
        await commentServices.likedComment(commentId)
        dispatch(getItinerariesOf(commentItinerary.city.name))
        const loggedUserJSON = window.localStorage.getItem('loggedMytineraryUser')
        const user = JSON.parse(loggedUserJSON)
        dispatch(setUser(user))
    }

    const dislikedComment = async () => {
        if (buttonDislike === 'dislike') {
            setButtonDislike('disliked')
            setNumberDislikes(numberDislikes + 1)
            if (buttonLike === 'liked') {
                setButtonLike('like')
                setNumberLikes(numberLikes - 1)
            }
        } else if (buttonDislike === 'disliked') {
            setButtonDislike('dislike')
            setNumberDislikes(numberDislikes - 1)
        }
        await commentServices.dislikedComment(commentId)
        dispatch(getItinerariesOf(commentItinerary.city.name))
        const loggedUserJSON = window.localStorage.getItem('loggedMytineraryUser')
        const user = JSON.parse(loggedUserJSON)
        dispatch(setUser(user))
    }

    return (
        <div style={styles.container}>
            <div>
                <div style={styles.user}>
                    <div><img style={styles.userImg} src={commentUser.imgUrl} alt='user img'/></div>
                    <div>{commentUser.firstName} {commentUser.lastName}</div>
                </div>
                <div style={styles.commentBox}>{commentContent}</div>
            </div>
            <div style={styles.buttonBox}>
                <div>
                    {numberLikes} 
                    {user
                    ? <button style={styles.button} onClick={likedComment}>{buttonLike}</button>
                    : <button style={styles.button} disabled>like</button>
                    }
                </div>
                <div>
                    {numberDislikes} 
                    {user
                    ? <button style={styles.button} onClick={dislikedComment}>{buttonDislike}</button>
                    : <button style={styles.button} disabled>dislike</button>
                    }
                </div>
                {user && user.id === commentUser.id && <button style={styles.button} onClick={deleteComment}>Delete</button>}
            </div>        
        </div>
    )
}

export default Comment