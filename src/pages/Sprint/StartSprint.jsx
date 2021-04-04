import React, { useEffect, useState } from 'react';
import PresentComponent from '../../components/PresentComponent';
import Sprint from './actuallySprintGame';
import backImage from '../../assets/backgrounds/bg-sprint-game.svg';

const StartSprintGame = () => {
  const [words, setWords] = useState([]);
  const [startGame, setStartGame] = useState(false);

  useEffect(() => {
    fetch('https://newrslangapi.herokuapp.com/words/?group=0&page=0')
      .then((response) => response.json())
      .then((response) => setWords(response));
  }, []);

  return (
    !startGame
      ? (
        <PresentComponent
          setStartGame={setStartGame}
          words={words}
          gameName="Спринт"
          gameDescription="Мини-игра «Спринт» - это тренировка для повторения заученных слов из вашего словаря."
          gameRules="После запуска игры вы увидите слово и перевод. Вам нужно выбрать, правильно это или неправильно."
          gameOpportunityOne="1. Используйте мышь, чтобы выбрать."
          gameOpportunityTwo="2. Используйте клавиши влево и вправо."
          back={backImage}
        />
      )
      : (
        <Sprint words={words} />
      )
  );
};

export default StartSprintGame;
