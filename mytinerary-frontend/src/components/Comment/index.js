const Comment = ({
    commentContent,
    commentLikes,
    commentDislikes,
    commentUser
}) => {
    return (
        <div>
            <div>{commentUser.username}</div>
            <div>{commentContent}</div>
            <div>{commentLikes.length} likes</div>
            <div>{commentDislikes.length} dislikes</div>
        </div>
    )
}

export default Comment