import './index.css'

const Activity = ({
  activityName,
  activityAddress,
  activityDescription,
  activityDuration,
  activityPrice,
  activityImage
}) => {
  return (
    <div className='CardActivity'>
      <div className='ActivityHeader'>
        <div className='ActivityContent'>
          <div className='ActivityName'>{activityName}</div>
          <div className='Description'><i className='fas fa-info-circle DescriptionIcon' /> {activityDescription}</div>
          <div className='Details'>
            <div><i className='fas fa-clock' /> {activityDuration}</div>
            <div><i className='fas fa-dollar-sign DolarIcon' /> {activityPrice}</div>
          </div>
        </div>
        <div>
          <div className='ActivityImage' style={{ backgroundImage: `url(${activityImage})` }} />
        </div>
      </div>
      <div>
        <div className='Address'><i className='fas fa-map-marked-alt' /> {activityAddress}</div>
      </div>
    </div>
  )
}

export default Activity
