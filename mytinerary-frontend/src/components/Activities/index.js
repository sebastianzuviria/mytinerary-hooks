import { useState } from 'react'
import Activity from '../Activity/index'

const Activities = ({ activities }) => {
  const [index, setIndex] = useState(0)

  if(activities.length === 0) {
    return <div>No activities</div>
  }
  
  const handleCarouselNext = () => {
    if (index + 1 === activities.length) {
      return index
    } else {
      setIndex(index + 1)
    }
  }

  const handleCarouselBack = () => {
    if (index === 0) {
      return index
    } else {
      setIndex(index - 1)
    }
  }

    
    return (
      <div className='Activities'>
        <div className='SliderContent'>
          <div onClick={handleCarouselBack}><i className='fas fa-chevron-left SliderArrow' /></div>
          <Activity
            key={activities[index].id}
            activityId={activities[index].id}
            activityName={activities[index].name}
            activityAddress={activities[index].address}
            activityDescription={activities[index].description}
            activityDuration={activities[index].duration}
            activityPrice={activities[index].price}
            activityImage={activities[index].imgUrl}
          />
          <div className='SliderArrow' onClick={handleCarouselNext}>
            <i className='fas fa-chevron-right SliderArrow' />
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          {activities.length === 0
            ? <div>There is not activity regitered</div>
            : <div className='SliderFooter'>{index + 1} of {activities.length} {index === 1 ? 'activity' : 'activities'}</div>}
        </div>
      </div>
    )  
}

export default Activities
