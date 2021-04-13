import './index.css'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Activities from '../Activities/index'
import Comment from '../Comment/index'
import CommentForm from '../CommentForm/index'

const Itinerary = ({
  itineraryId,
  itineraryName,
  itineraryRating,
  itineraryPrice,
  itineraryImage,
  itineraryHashtags,
  itineraryActivities,
  itineraryFavs,
  itineraryComments,
  functionFav,
  city
}) => {
  const [display, setDisplay] = useState(false)
  const [isFav, setIsFav] = useState(false)
  const user = useSelector(state => state.user)

  const show = display ? { display: '' } : { display: 'none' }

  useEffect(() => {
    if (user) {
      const fav = !!itineraryFavs.find(u => String(u) === String(user.id))
      setIsFav(fav)
    }
    }, [itineraryFavs, user]) //eslint-disable-line

  return (
    <div className='CardItinerary'>
      <div className='ContainerItinerary'>
        <div className='ItineraryHeader'>
          <div className='ItineraryName'>
            {itineraryName}
          </div>
          <div className='BookmarkBox'>
            {user &&
              <div
                className='Bookmark' onClick={() => {
                  functionFav(itineraryId)
                  setIsFav(!isFav)
                }}
              >{isFav ? <i className='fas fa-bookmark' /> : <i className='far fa-bookmark' />}
              </div>}
          </div>
        </div>
        <div className='Img' style={{ backgroundImage: `url(${itineraryImage})` }} />
        <div className='Info'>
          <div>
            <i className='fas fa-star Star' /> {itineraryRating}
          </div>
          <div>
            <i className='fas fa-money-bill-wave Money' /> {itineraryPrice}
          </div>
          <div className='Hashtags'>
            {itineraryHashtags.map(h =>
              <div key={h}>{h}</div>
            )}
          </div>
          <button className='ButtonActivities' onClick={() => setDisplay(!display)}>Activities</button>
        </div>
      </div>
      <div style={show}>
        <Activities activities={itineraryActivities}/>
      </div>
      <div className='CommentTitle'>Comments</div>
      {itineraryComments.length === 0
        ? <div className='CommentTitle'>No comments</div>
        : itineraryComments.map(c => {
          return (
            <Comment
              key={c.id}
              commentId={c.id}
              commentContent={c.content}
              commentLikes={c.likes}
              commentDislikes={c.dislikes}
              commentUser={c.user}
              commentItinerary={c.itinerary}
            />
          )
        })}
      {user &&
        <div>
          <CommentForm
            itineraryId={itineraryId}
            city={city}
          />
        </div>}
    </div>
  )
}

export default Itinerary
