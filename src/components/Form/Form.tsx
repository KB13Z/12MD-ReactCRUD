import { useState, FormEvent } from 'react';
import styles from './Form.module.css'

interface CardData {
    id: number;
    image: string;
    name: string;
    description: string;
    mood: string;
    createdAt: string;
  }

interface FormProps {
    onSubmit: (cardData: CardData) => void;
    randomImage: string;
    setRandomImage: React.Dispatch<React.SetStateAction<string>>;
}

function Form({ onSubmit, randomImage }: FormProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [mood, setMood] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const cardData: CardData = {
            id: 0,
            image: randomImage,
            name, 
            description, 
            mood,
            createdAt: '',
        };

        onSubmit(cardData);

        setName('');
        setDescription('');
        setMood('');
    };

    return (
        <>
            <div className={styles.formWrapper}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h3 className={styles.formTitle}>Add new post</h3>
                    <div className={styles.imageWrapper}>
                        <img src={randomImage} alt="Random image" className={styles.randomImage} width={200} />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label>Name:</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Add name"
                            minLength={3}
                            maxLength={25}
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label>Description:</label>
                        <input 
                            type="text" 
                            name="description" 
                            placeholder="Add description"
                            minLength={15}
                            maxLength={50}
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <label>Mood:</label>
                        <input 
                            type="text" 
                            name="mood" 
                            placeholder="Add mood"
                            minLength={3}
                            maxLength={20}
                            required
                            value={mood}
                            onChange={(e) => setMood(e.target.value)}
                        />
                    </div>
                    <div className={styles.buttonWrapper}>
                        <button className={styles.addButton} type="submit">
                            Add
                        </button>
                    </div>
                </form>    
            </div>
        </>
    );
}

export default Form;