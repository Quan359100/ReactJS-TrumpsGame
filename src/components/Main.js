import React from 'react';
import CardItem from './CardItem';
import Score from './Score';
import { useMain } from '../hooks/useMain';
import Message from './Message';
import Loading from './Loading';

export default function Main() {
  const { isLoading, userCard, comCard, fetchData } = useMain();
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='main'>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Score />
          <div className='cards'>
            {userCard && <CardItem card={userCard} />}
            {comCard && <CardItem card={comCard} isSecretCard={true} />}
          </div>
          <Message />
        </>
      )}
    </div>
  );
}
