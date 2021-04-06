const styles = {
    card: {
        margin: 5,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWeigth: 2,
        padding: 5
    }
}

const Activity = ({
    activityName,
    activityAddress,
    activityDescription,
    activityDuration,
    activityPrice,
}) => {
    
    return (
        <div style={styles.card}>
            <div>{activityName}</div>
            <div>Address: {activityAddress}</div>
            <div>Description: {activityDescription}</div>
            <div>Duration: {activityDuration}</div>
            <div>Price: {activityPrice}</div>
        </div>
    )
}

export default Activity