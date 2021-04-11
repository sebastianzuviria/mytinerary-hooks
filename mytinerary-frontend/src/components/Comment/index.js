import './index.css'
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
        setNumberLikes(commentLikes.length)
        setNumberDislikes(commentDislikes.length)
        if(user) {
            const isLiked = commentLikes.find(l => String(l) === user.id)
            const isDisliked = commentDislikes.find(d => String(d) === user.id)
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
        <div className="ContainerComment">
            <div className="UserBox" style={styles.user}>
                    <div className="UserImage" style={{backgroundImage: `url(${commentUser.imgUrl})`}} />
            </div>
            <div className="CommentBox"> 
                <div className="Comment">
                    <div className="CommentHeader">
                        <div className="UserName">{commentUser.firstName} {commentUser.lastName}</div>
                        {user && user.id === commentUser.id && <div className="Delete" onClick={deleteComment}><i className="fas fa-trash"></i></div>}
                    </div>
                    <div className="CommentText">{commentContent}</div>
                </div>
            <div className="ButtonBox" style={styles.buttonBox}>
                <div className="Likes">
                    {numberLikes} 
                    {user
                    ? <div onClick={likedComment}>{buttonLike === 'like' ? <i className="far fa-thumbs-up Like"></i> : <i className="fas fa-thumbs-up Liked"></i>}</div>
                    : <div disabled><i className="far fa-thumbs-up"></i></div>
                    }
                </div>
                <div className="Dislikes">
                    {numberDislikes} 
                    {user
                    ? <div onClick={dislikedComment}>{buttonDislike === 'dislike' ? <i className="far fa-thumbs-down Dislike"></i> : <i className="fas fa-thumbs-down Disliked"></i> }</div>
                    : <div disabled><i className="far fa-thumbs-down"></i></div>
                    }
                </div>
            </div>
            </div>        
        </div>
    )
}

export default Comment