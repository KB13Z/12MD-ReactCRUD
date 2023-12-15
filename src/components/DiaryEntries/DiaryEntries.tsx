import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './DiaryEntries.module.css';
import Form from '../Form/Form';
import Card from '../Card/Card';
import RandomImage from '../RandomImage/RandomImage';
import Header from '../Header/Header';

interface CardData {
  id: number;
  image: string;
  name: string;
  description: string;
  mood: string;
  createdAt: string;
}

function DiaryEntries() {
  const { id } = useParams<{ id: string }>();
  const [cards, setCards] = useState<CardData[]>([]);
  const [randomImage, setRandomImage] = useState('');
  const [forceRerender, setForceRerender] = useState(false);

  const diaryEntriesQuery = useQuery({
    queryKey: ['diaryEntries'],
    queryFn: () => wait(1000).then(() => cards)
  })

  const navigate = useNavigate();

  function wait(duration:number) {
    return new Promise(resolve => setTimeout(resolve, duration))
  }

  useEffect(() => {
    axios.get('http://localhost:3001/cards')
      .then(response => setCards(response.data.cards))
      .catch(error => console.error('Error fetching cards:', error));
  }, [forceRerender, diaryEntriesQuery.isSuccess]);

  if (diaryEntriesQuery.isLoading) {
    return <h2>Loading...</h2>
  }

  const handleFormSubmit = (cardData: CardData) => {
    axios.post('http://localhost:3001/card', cardData)
      .then(response => {
        setCards(prevCards => [...prevCards, response.data]);
        setRandomImage('');
        setForceRerender(prev => !prev);
      })
      .catch(error => console.error('Error adding card:', error));
  };

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:3001/cards/${id}`)
      .then(() => {
        setCards(prevCards => prevCards.filter(card => card.id !== id));
      })
      .catch(error => console.error('Error deleting card:', error));
  };

  const handleEdit = (id: number, updatedData: CardData) => {
    axios.put(`http://localhost:3001/cards/${id}`, updatedData)
      .then(response => {
        setCards(prevCards => prevCards.map(card => (card.id === id ? { ...response.data, key: card.id } : card)));
        setForceRerender(prev => !prev);
      })
      .catch(error => console.error('Error updating card:', error));
  };

  return (
    <div className={styles.diaryEntriesWrapper}>
      <Header />
      {id ? (
        <div className={styles.fullCard}>
          {cards.map((cardData) => cardData.id === Number(id) && (
            <div key={`card-${cardData.id}`}>
              <Card data={cardData} onDelete={() => handleDelete(cardData.id)} onEdit={handleEdit} />
              <div className={styles.goBackButtonWrapper}>
                <button className={styles.goBackButton} onClick={() => navigate('/diary-entries')}>Go back</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className={styles.cardsWrapper}>
            {cards.map((cardData) => (
              <Link
                key={`card-${cardData.id}`}
                to={`/diary-entries/${cardData.id}`}
              >
                <div className={styles.previewImageWrapper}>
                  <img src={cardData.image} alt={cardData.name} className={styles.previewImage} width='200' />
                </div>
              </Link>
            ))}
          </div>
          <div className={styles.formWrapper}>
            <Form onSubmit={handleFormSubmit} randomImage={randomImage} setRandomImage={setRandomImage} />
          </div>
        </>
      )}

      <RandomImage setRandomImage={setRandomImage} forceRerender={forceRerender} />
    </div>
  )
}

export default DiaryEntries;
