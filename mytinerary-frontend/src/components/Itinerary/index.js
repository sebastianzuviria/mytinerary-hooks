import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Activity from '../Activity/index'
import itineraryServices from '../../services/itineraries'
import { getItinerariesOf } from '../../reducers/itineraryReducer'

const styles = {
    card: {
        margin: 10,
        borderStyle: 'solid',
        borderWeigth: 2,
        borderColor: 'black',
        padding: 10
    },
    hashtags: {
        display: 'flex'
    },
    hashtag: {
        marginRight: 5,
        marginLeft: 5
    }
}

const Itinerary = ({ 
    itineraryName,
    itineraryRating,
    itineraryPrice,
    itineraryHashtags,
    itineraryActivities,
    itineraryFavs,
    city
 }) => {
    const [display, setDisplay] = useState(false)
    const [index, setIndex] = useState(0)
    const [isFav, setIsFav] = useState(false)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const show = display ? { display: ''} : { display: 'none' }

    useEffect(() => {
        const fav = itineraryFavs.find(u => String(u) === String(user.id)) ? true : false
        setIsFav(fav)
    }, [itineraryFavs, user])

    const handleFav = async () => {
        setIsFav(!isFav)
        await itineraryServices.favItinerary(city)
        dispatch(getItinerariesOf(city))
    }

    return (
        <div style={styles.card}>
            <button onClick={handleFav}>{isFav ? 'unfav' : 'fav'}</button> 
            <div>
                name: {itineraryName}
            </div>
            <div>
                rating: {itineraryRating}
            </div>
            <div>
                price: {itineraryPrice}
            </div>
            <div style={styles.hashtags}>
                hashtags: {itineraryHashtags.map(h => 
                    <div key={h} style={styles.hashtag}>{h}</div>
                )}
            </div>
            <button onClick={() => setDisplay(!display)} >Activities</button>
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
                            <div>
                                <Activity 
                                    key={arr[index].id}
                                    activityId={arr[index].id}
                                    activityName={arr[index].name}
                                    activityAddress={arr[index].address}
                                    activityDescription={arr[index].description}
                                    activityDuration={arr[index].duration}
                                    activityPrice={arr[index].price}
                                />
                                <div style={{ display: 'flex' }}>
                                    <button onClick={handleCarouselBack}>{'<'}</button>
                                    { arr.length === 0 
                                    ? <div>There is not activity regitered</div>
                                    : <div>{index + 1} of {arr.length} {index === 1 ? 'activity' : 'activities'}</div>
                                    }
                                    <button onClick={handleCarouselNext}>{'>'}</button>
                                </div>      
                            </div>
                        )
                        
                    })
                }
             </div>
            }
        </div>
    )
}

export default Itinerary