import { useEffect, useMemo } from 'react';

interface RandomImageProps {
    setRandomImage: React.Dispatch<React.SetStateAction<string>>;
    forceRerender?: boolean;
}

const RandomImage: React.FC<RandomImageProps> = ({ setRandomImage, forceRerender }: RandomImageProps) => {
    const imageArray = useMemo(() => [
        '/src/assets/image-1.jpeg',
        '/src/assets/image-2.jpeg',
        '/src/assets/image-3.jpeg',
        '/src/assets/image-4.jpeg',
        '/src/assets/image-5.jpeg',
        '/src/assets/image-6.jpeg',
        '/src/assets/image-7.jpeg',
        '/src/assets/image-8.jpeg',
    ], []);

    useEffect(() => {
        const getRandomImage = () => {
          const randomIndex = Math.floor(Math.random() * imageArray.length);
          setRandomImage(imageArray[randomIndex]);
        };
    
        getRandomImage();
      }, [setRandomImage, imageArray, forceRerender]);
    
      return <></>;
};

export default RandomImage;