import { useState, useEffect } from 'react'
import userServices from '../../services/users'
import Activity from '../../components/Activity'
// import itineraryServices from '../../services/itineraries'

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


const Favourites = ({ user }) => {
    const [favs, setFavs] = useState([])
    const [display, setDisplay] = useState(false)
    const [index, setIndex] = useState(0)

    const show = display ? { display: ''} : { display: 'none' }

    const getFavs = async (id) => {
        const userData = await userServices.getFavs(id)
        setFavs(userData.favs)
    }

    useEffect(() => {
        if(user){
        getFavs(user.id)
        }
    }, [user]) //eslint-disable-line



    return (
        <div>
            <div> My favourites itineraries </div>
            <div>
                {favs.map(i => {
                    const unFav = async () => {
                        await userServices.unFav(user.id, i.id)
                        getFavs(user.id)
                    } 

                    return (
                        <div style={styles.card} key={i.id}>
                            <button onClick={unFav}>unFav</button>
                            <div>
                                name: {i.name}
                            </div>
                            <div>
                                rating: {i.rating}
                            </div>
                            <div>
                                price: {i.price}
                            </div>
                            <div style={styles.hashtags}>
                                hashtags: {i.hashtags.map(h => 
                                    <div key={h} style={styles.hashtag}>{h}</div>
                                )}
                            </div>
                            <button onClick={() => setDisplay(!display)} >Activities</button>
                            {i.activities.length === 0 
                            ? <div>No activities to show</div>
                            : <div style={show}>
                                {
                                    i.activities.reduce((acc, itinerary, i, arr) => {
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
                })}
            </div>
        </div>
    )
}

export default Favourites