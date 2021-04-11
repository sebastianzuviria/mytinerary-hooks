import './index.css'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Activity from '../Activity/index'
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
    const [index, setIndex] = useState(0)
    const [isFav, setIsFav] = useState(false)
    const user = useSelector(state => state.user)

    const show = display ? { display: ''} : { display: 'none' }

    useEffect(() => {
        if(user){
        const fav = itineraryFavs.find(u => String(u) === String(user.id)) ? true : false
        setIsFav(fav)
        }
    }, [itineraryFavs, user]) //eslint-disable-line

    return (
        <div className="CardItinerary">
            <div className="ContainerItinerary">
                <div className="Img" style={{ backgroundImage: `url(${itineraryImage})`}} />
                <div className="Info">
                    <div className="BookmarkBox">
                        {user &&
                            <div className="Bookmark" onClick={() => {
                                functionFav()
                                setIsFav(!isFav)
                                }}>{isFav ? <i className="fas fa-bookmark"></i> : <i className="far fa-bookmark"></i>}
                            </div> 
                        }
                    </div>
                    <div className="ItineraryName">
                        {itineraryName}
                    </div>
                    <div>
                        <i className="fas fa-star Star"></i> {itineraryRating}
                    </div>
                    <div>
                        <i className="fas fa-money-bill-wave Money"></i> {itineraryPrice}
                    </div>
                    <div className="Hashtags">
                        {itineraryHashtags.map(h => 
                            <div key={h}>{h}</div>
                        )}
                    </div>
                    <button className="ButtonActivities" onClick={() => setDisplay(!display)} >Activities</button>
                </div>
            </div>
            {itineraryActivities.length === 0 
            ? <div>No activities to show</div>
            : <div style={show}>
                {
                    itineraryActivities.reduce((acc, itinerary, i, arr) => {
                        const handleCarouselNext = () => {
                            if(index+1 === arr.length){
                                return index
                            } else {
                            setIndex(index+1)
                            }
                        }
                        const handleCarouselBack = () => {
                            if(index === 0){
                                return index
                            } else {
                            setIndex(index - 1)
                            }
                        }

                        return(
                            <div className="Activities">
                                <div className="SliderContent">
                                    <div onClick={handleCarouselBack}><i className="fas fa-chevron-left SliderArrow"></i></div>
                                    <Activity 
                                        key={arr[index].id}
                                        activityId={arr[index].id}
                                        activityName={arr[index].name}
                                        activityAddress={arr[index].address}
                                        activityDescription={arr[index].description}
                                        activityDuration={arr[index].duration}
                                        activityPrice={arr[index].price}
                                        activityImage={arr[index].imgUrl}
                                    />
                                    <div className="SliderArrow" onClick={handleCarouselNext}><i className="fas fa-chevron-right SliderArrow"></i></div>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    { arr.length === 0 
                                    ? <div>There is not activity regitered</div>
                                    : <div className="SliderFooter">{index + 1} of {arr.length} {index === 1 ? 'activity' : 'activities'}</div>
                                    }
                                </div>
                            </div>
                        )
                        
                    })
                }
             </div>
            }
            <div className="CommentTitle">Comments</div>
            {itineraryComments.length === 0 
            ? <div>no comments</div>
            : itineraryComments.map(c => {
                return(
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
            })
            }
            {user &&
                <div>
                    <CommentForm
                        itineraryId={itineraryId}
                        city={city}
                    />
                </div>
            }
            <hr></hr>      

        </div>
    )
}

export default Itinerary