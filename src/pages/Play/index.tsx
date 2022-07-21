import { Avatar } from '@chakra-ui/react';
import AnswerSelector from 'pages/Play/components/AnswerSelector';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { canInc, setAns } from 'redux/slices/game';
import socket from 'socket/socket-service';

const Play = () => {
  const game = useAppSelector(state => state.game);
  const question = game.questions[game.currentQuestion];
  const [answer, setAnswer] = useState<string>('');
  const [countTime, setCountTime] = useState<number>(question.duration_sec);
  const [selectTime, setSelectTime] = useState<number>(countTime);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on('end_game', () => {
      navigate('/', { replace: true });
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountTime(old => {
        if (old > 0) return old - 1;
        return old;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countTime === 0) {
      if (!game.isHost) {
        socket.emit('answer', {
          report_id: game.reportId,
          question_id: question.question_id,
          answer: answer,
          count_time: selectTime,
        });
        dispatch(setAns(answer));
      }

      dispatch(canInc());
      navigate('/afterQuestion');
    }
  }, [answer, game.isHost, game.reportId, countTime, selectTime, question]);

  function handleSelect(ans: string) {
    setAnswer(ans);
    setSelectTime(countTime);
  }

  return (
    <div className="bg-gray-200">
      <div className="min-h-screen flex flex-col justify-between items-center px-4 pt-4">
        <div className="w-full py-3 bg-white rounded-md outline-none px-10 text-5xl text-center font-medium">
          {question.content}
        </div>

        <Avatar
          bg="gray.400"
          size="2xl"
          icon={<div className="w-full bg-inherit outline-none m-5 text-white text-center">{countTime}</div>}
        />

        <div className="w-full">
          <div className="flex space-x-4 mb-4">
            <AnswerSelector
              index={0}
              question={question}
              answer="ans_A"
              selectedAns={answer}
              handleSelect={handleSelect}
            />
            <AnswerSelector
              index={1}
              question={question}
              answer="ans_B"
              selectedAns={answer}
              handleSelect={handleSelect}
            />
          </div>
          <div className="flex space-x-4 mb-4">
            <AnswerSelector
              index={2}
              question={question}
              answer="ans_C"
              selectedAns={answer}
              handleSelect={handleSelect}
            />
            <AnswerSelector
              index={3}
              question={question}
              answer="ans_D"
              selectedAns={answer}
              handleSelect={handleSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
