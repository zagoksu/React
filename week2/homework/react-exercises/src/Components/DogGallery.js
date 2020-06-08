import React, {useState} from 'react';
import DogPhoto from './DogPhoto';
import Button from './Button';


export default function DogGallery() {
    const [dogPhotos, setDogPhotos] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [hasError, setError] = useState(false);

    async function getDogPhoto() {
        try {
            setLoading(true);
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();
            setDogPhotos(oldDogPhotos => [...oldDogPhotos, data.message]);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    return (
<div>
    <h1>Get Dog Photos</h1>
      {dogPhotos.length === 0 ? (
        <p>Get your first dog by clicking the button!</p>
      ) : (
        dogPhotos.map(imgUrl => (
          <div>
            <DogPhoto url={imgUrl} />
          </div>
        ))
      )}

      {isLoading && <p>Loading...</p>}
      {hasError && <p> Uppss! </p>}
      <Button onClick={getDogPhoto} title="dog photo"></Button>
</div>
    );
}