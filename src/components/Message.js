import React, { useMemo } from 'react';
import { GameResultType } from '../constants';
import { useMain } from '../hooks/useMain';

function GameResult({ gameResult, playAgain }) {
  const message = useMemo(() => {
    if (gameResult === GameResultType.Win) {
      return 'You win!';
    }
    if (gameResult === GameResultType.Lose) {
      return 'Your lose!';
    }
    return 'Draw!';
  }, [gameResult]);
  return (
    <>
      <div className='message-container'>
        <div className='content'>{message}</div>
        <div className='footer'>
          <button className='button-play' onClick={playAgain}>
            Continue
          </button>
        </div>
      </div>
    </>
  );
}

function FinalGameResult({ finalGameResult, newGame }) {
  const message = useMemo(() => {
    if (finalGameResult === GameResultType.Win) {
      return 'Finally You win !';
    }
    if (finalGameResult === GameResultType.Lose) {
      return 'Finally Your lose!';
    }
    return 'Finally Draw!';
  }, [finalGameResult]);
  return (
    <>
      <div className='message-container'>
        <div className='content'>{message}</div>
        <div className='footer'>
          <button className='button-reset' onClick={newGame}>New Game</button>
        </div>
      </div>
    </>
  );
}

export default function Message() {
  const { gameResult, finalGameResult, playAgain, newGame } = useMain();
  const isShow = useMemo(
    () =>
      Number.isInteger(gameResult) || Number.isInteger(finalGameResult)
        ? true
        : false,
    [gameResult, finalGameResult]
  );

  return (
    <div className={`p ${isShow ? 'show' : ''}`}>
      <div className='messsage-result'>
        {isShow && (
          <>
            {Number.isInteger(gameResult) && (
              <GameResult gameResult={gameResult} playAgain={playAgain} />
            )}
            {Number.isInteger(finalGameResult) && (
              <FinalGameResult
                finalGameResult={finalGameResult}
                newGame={newGame}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
