import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';
import Title from '../components/Title/Title';
import Form from '../components/Form/Form';
import Card from '../components/Card/Card';
import RandomImage from '../components/RandomImage/RandomImage';

interface CardData {
  id: number;
  image: string;
  name: string;
  description: string;
  mood: string;
  createdAt: string;
}

function App() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [randomImage, setRandomImage] = useState('');
  const [forceRerender, setForceRerender] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/cards')
      .then(response => setCards(response.data))
      .catch(error => console.error('Error fetching cards:', error));
  }, [forceRerender]);

  const handleFormSubmit = (cardData: CardData) => {
    axios.post('http://localhost:8000/cards', cardData)
      .then(response => {
        setCards(prevCards => [...prevCards, response.data]);
        setRandomImage('');
        setForceRerender(prev => !prev);
      })
      .catch(error => console.error('Error adding card:', error));
  };

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:8000/cards/${id}`)
      .then(() => {
        setCards(prevCards => prevCards.filter(card => card.id !== id));
      })
      .catch(error => console.error('Error deleting card:', error));
  };

  const handleEdit = (id: number, updatedData: CardData) => {
    axios.put(`http://localhost:8000/cards/${id}`, updatedData)
      .then(response => {
        setCards(prevCards => prevCards.map(card => (card.id === id ? response.data : card)));
      })
      .catch(error => console.error('Error updating card:', error));
  };

  return (
    <>
      <Title />
      <Form onSubmit={handleFormSubmit} randomImage={randomImage} setRandomImage={setRandomImage} />
      <div className={styles.wrapper}>
        {cards.map((cardData) => (
          <Card 
            key={cardData.id} 
            data={cardData} 
            onDelete={handleDelete} 
            onEdit={handleEdit}
          />
        ))}
      </div>
      <RandomImage setRandomImage={setRandomImage} forceRerender={forceRerender} />
    </>
  )
}

export default App;