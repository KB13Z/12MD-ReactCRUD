import Header from "../Header/Header";
import styles from "./About.module.css";

const About = () => {
    return (
        <>
            <Header />
            <div className={styles.aboutWrapper}>
                <h3>About us</h3>
                <p>Cat's diary is created by a proud cat mom, for those, who would like to interact and add their thoughts of cat's daily life. 
                    <br></br>
                    At the moment, all pictures feature Merlin - a feline friend, whose mission is to bite every box he sleeps in.
                    <br></br>
                    Use your imagination and create a new memory in Merlin's life!
                    <br></br>
                    P.S. Don't be scared - you are allowed to change cat's name in your post.
                </p>
                <img src="src/assets/image-8.jpeg" alt="Merlin in a box" width="300" />
            </div>
        </>
    )
}

export default About;