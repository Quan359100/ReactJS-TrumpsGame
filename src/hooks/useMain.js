import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { GameResultType, MAX_GAME_TURNS } from '../constants';
import Card from '../core/Card';
import SWAPIService from '../services/SWAPI';

const MainContext = createContext(null);

export const MainProvider = ({ children }) => {
  const [allCards, setAllCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [userCard, setUserCard] = useState(null);
  const [comCard, setComCard] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [comScore, setComScore] = useState(0);
  const [turnNumber, setTurnNumber] = useState(1);
  const [isHidden, setIsHidden] = useState(true);
  const [gameResult, setGameResult] = useState(null);
  const [finalGameResult, setFinalGameResult] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await SWAPIService.getAllStarships();
      const dataCards = data.map((item) => Card.buildFromStarshipData(item));
      setCards(dataCards);
      setAllCards(dataCards);
    }
    fetchData();
  }, []);

  function resetCards() {
    let indexCard1 = Math.floor(Math.random() * cards.length);
    let indexCard2 = null;
    do {
      indexCard2 = Math.floor(Math.random() * cards.length);
    } while (indexCard1 === indexCard2);
    const newUserCard = cards[indexCard1];
    const newComCard = cards[indexCard2];
    setUserCard(newUserCard);
    setComCard(newComCard);
    setCards(
      cards.filter((_, index) => index !== indexCard1 && index !== indexCard2)
    );
  }

  useEffect(() => {
    if (allCards?.length) {
      resetCards();
    }
  }, [allCards]);

  function play(category) {
    setIsHidden(false);
    const result = userCard.compareWith(comCard, category);
    if (result > 0) {
      setUserScore(userScore + 1);
    } else if (result < 0) {
      setComScore(comScore + 1);
    }
    setGameResult(result);
  }

  function playAgain() {
    if (turnNumber < MAX_GAME_TURNS) {
      resetCards();
      setIsHidden(true);
    }
    setGameResult(null);
    setTurnNumber(turnNumber + 1);
  }

  useEffect(() => {
    if (turnNumber > MAX_GAME_TURNS) {
      const finalResult =
        userScore > comScore
          ? GameResultType.Win
          : userScore === comScore
          ? GameResultType.Draw
          : GameResultType.Lose;
      setFinalGameResult(finalResult);
    }
  }, [turnNumber]);

  function newGame() {
    setTurnNumber(1);
    setUserScore(0);
    setComScore(0);
    resetCards();
    setIsHidden(true);
    setFinalGameResult(null);
    setCards(allCards);
  }

  const isLoading = useMemo(() => !allCards || !allCards.length, [allCards]);

  return (
    <MainContext.Provider
      value={{
        isLoading,
        userCard,
        comCard,
        userScore,
        comScore,
        isHidden,
        play,
        gameResult,
        finalGameResult,
        playAgain,
        newGame,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMain = () => useContext(MainContext);
