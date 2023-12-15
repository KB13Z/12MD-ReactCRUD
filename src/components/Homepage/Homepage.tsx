import Header from "../Header/Header"
import styles from './Homepage.module.css'

const Homepage = () => {
    return (
        <>
            <Header />
            <div className={styles.homepageWrapper}>
                <h1>Welcome to cat's diary!</h1>
                <img src="src/assets/image-1.jpeg" alt="Merlin" width="350" />
            </div>
        </>
    )
}

export default Homepage;