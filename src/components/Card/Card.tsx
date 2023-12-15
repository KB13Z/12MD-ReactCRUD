import { useState, useEffect } from 'react';
import styles from './Card.module.css';

interface CardData {
    id: number;
    image: string;
    name: string;
    description: string;
    mood: string;
    createdAt: string;
  }
  
interface CardProps {
    data: CardData;
    onEdit: (id: number, updatedData: CardData) => void;
    onDelete: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ data, onDelete, onEdit }) => {
    const handleDelete = () => {
        onDelete(data.id);
    };

    const [isEditing, setEditing] = useState(false);
    const [editedData, setEditedData] = useState({ ...data });

    useEffect(() => {
        setEditedData({ ...data });
      }, [data]);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        onEdit(data.id, editedData);
        setEditedData((prevData) => ({ ...prevData }));
        setEditing(false);
    };

    const handleCancel = () => {
        setEditedData({ ...data});
        setEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({ ...prevData, [name]: value }));
    };

    const formatTimeAgo = (timestamp: string): string => {
        const currentTime = new Date();
        const createdAt = new Date(timestamp);
        const timeDifference = currentTime.getTime() - createdAt.getTime();
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
    
        if (days > 0) {
          return `${days} ${days === 1 ? 'day' : 'days'} ago`;
        } else if (hours > 0) {
          return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        } else if (minutes > 0) {
          return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
        } else {
          return 'Just now';
        }
    };

    const [formattedTime, setFormattedTime] = useState(formatTimeAgo(data.createdAt));

    useEffect(() => {
        const intervalId = setInterval(() => {
          setFormattedTime(formatTimeAgo(data.createdAt));
        }, 60000);
    
        return () => clearInterval(intervalId);
      }, [data.createdAt]);

      console.log('Image URL:', data.image);

    return (
        <div className={styles.cardWrapper}>
            <div className={styles.card}>
                <div className="image-wrapper">
                    <img src={data.image} alt="Random image" className={styles.randomImage} width={200} />
                </div>
                {isEditing ? (
                    <div className={styles.dataWrapper}>
                        <input
                            type="text"
                            name="name"
                            value={editedData.name}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="description"
                            value={editedData.description}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="mood"
                            value={editedData.mood}
                            onChange={handleChange}
                        />
                    </div>
                ) : (
                    <div className={styles.dataWrapper}>
                        <p className={styles.dataName}>{data.name}</p>
                        <p>{data.description}</p>
                        <p className={styles.dataMood}>{data.mood}</p>
                    </div>
                )}
                <div className={styles.buttonWrapper}>
                    {isEditing ? (
                        <>
                            <button onClick={handleSave}>
                                Save
                            </button>
                            <button onClick={handleCancel}>
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button className={styles.editButton} onClick={handleEdit}>
                                Edit
                            </button>
                            <button className={styles.deleteButton} onClick={handleDelete}>
                                Delete
                            </button>
                        </>
                    )}
                </div>
                <div className={styles.dateWrapper}>
                    <div className="card-date">Created at: {formattedTime}</div>
                </div>
            </div>
        </div>
    );
};

export default Card;