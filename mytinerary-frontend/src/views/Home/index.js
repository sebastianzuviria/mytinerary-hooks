import cover from '../../images/home/World.jpg'

const styles = {
    img: {
        width: '100%'
    }
}
const Home = () => {

    return (
        <div>
            <img style={styles.img} src={cover} alt={'world'}/>
            <h3>Take a look to itineraries</h3>
        </div>
    )
}

export default Home