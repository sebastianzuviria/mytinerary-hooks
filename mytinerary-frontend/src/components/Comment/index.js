import { useSelector } from 'react-redux'

const styles = {
    card: {
        display: 'flex'
    }
}

const Comment = ({
    commentContent,
    commentLikes,
    commentDislikes,
    commentUser
}) => {
    const user = useSelector(state => state.user)
    
    const deleteComment = () => {
        
    }

    return (
        <div>
            <div>
                <div>{commentUser.username}</div>
                <div>{commentContent}</div>
            </div>
            <div style={styles.card}>
                <div>{commentLikes.length} <button>likes</button></div>
                <div>{commentDislikes.length} <button>dislikes</button></div>
                {user && user.id === commentUser.id && <button onClick={deleteComment}>Delete</button>}
            </div>        
        </div>
    )
}

export default Comment