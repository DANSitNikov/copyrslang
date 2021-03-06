import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ActiveStage from '../activeStage/ActiveStage';
import style from './audioGame.module.scss';
import GameResultWindow from '../../../components/GameResultWindow';
import playAnswerSound from '../../../utilities/audioPlayer';
import ResultProgressBar from '../../../components/ResultPregressBar';
import FullScreenButtons from '../../../components/FullScreenButton';
import backImage from '../../../assets/backgrounds/bg-audiocall-game.svg';
import ControlAnswerVolumeButton from '../../../components/ControlAnswerVolumeButton';

const AudioGame = (props) => {
  const { words, fakeWords } = props;
  const [activeStage, setActiveStage] = useState(1);
  const [nextBtnStatus, setNextBtnStatus] = useState(false);
  const [correct, setCorrectOrNot] = useState('default');
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [value] = useState(5);
  const [fullScreenStatus, setFullScreenStatus] = useState(false);
  const [soundStatus, setSoundStatus] = useState(true);
  const gameWindow = useRef();

  useEffect(() => {
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        setFullScreenStatus(false);
      }
    });
    gameWindow.current.style.background = `url(${backImage})`;
    gameWindow.current.style.backgroundSize = 'cover';
    gameWindow.current.style.backgroundPosition = 'bottom';
  }, []);

  const onFullscreenBtnClick = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setFullScreenStatus(false);
    } else {
      gameWindow.current.requestFullscreen().catch((e) => console.log(e));
      setFullScreenStatus(true);
    }
  };

  return (
    activeStage !== 21
      ? (
        <div ref={gameWindow} className={style.wrapper}>
          <h2 className={style.header}>Аудиовызов</h2>
          {
            words && fakeWords && (
              <ActiveStage
                word={words[activeStage - 1]}
                fakeWords={fakeWords}
                correct={correct}
                setCorrectOrNot={setCorrectOrNot}
                setCorrectAnswers={setCorrectAnswers}
                setWrongAnswers={setWrongAnswers}
                setNextBtnStatus={setNextBtnStatus}
                correctAnswers={correctAnswers}
                wrongAnswers={wrongAnswers}
                activeStage={activeStage}
                setActiveStage={setActiveStage}
                soundStatus={soundStatus}
              />
            )
          }
          {
            !nextBtnStatus && (
              <Button
                onClick={() => {
                  setNextBtnStatus(true);
                  setCorrectOrNot('wrong');
                  setWrongAnswers([...wrongAnswers, words[activeStage - 1]]);
                  playAnswerSound(false).play();
                }}
                variant="warning"
                className={style.nextOrUnknown}
              >
                Не знаю
              </Button>
            )
          }
          {
            nextBtnStatus && (
              <Button
                onClick={() => {
                  setActiveStage(activeStage + 1);
                  setNextBtnStatus(false);
                  setCorrectOrNot('default');
                }}
                variant="warning"
                className={style.nextOrUnknown}
              >
                Дальше
              </Button>
            )
          }
          <ResultProgressBar
            correct={correctAnswers.length}
            wrong={wrongAnswers.length}
            value={value}
          />
          <ControlAnswerVolumeButton soundStatus={soundStatus} setSoundStatus={setSoundStatus} />
          <FullScreenButtons
            fullScreenStatus={fullScreenStatus}
            onFullscreenBtnClick={onFullscreenBtnClick}
          />
        </div>
      )
      : (
        <div>
          <GameResultWindow
            correctAnswers={correctAnswers}
            wrongAnswers={wrongAnswers}
          />
        </div>
      )
  );
};

AudioGame.propTypes = {
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
  fakeWords: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AudioGame;
