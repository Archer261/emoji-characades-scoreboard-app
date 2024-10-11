import React, { useState, useEffect } from 'react';
import { PlusCircle, MinusCircle, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';

const EmojiCharadesScoreboard = () => {
  const [teams, setTeams] = useState(2);
  const [teamNames, setTeamNames] = useState(['Team 1', 'Team 2']);
  const [scores, setScores] = useState([0, 0]);
  const [timer, setTimer] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [guessedAnswers, setGuessedAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    let interval;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleResetTimer = () => {
    setTimer(60);
    setIsRunning(false);
  };

  const handleTeamChange = (change) => {
    const newTeamCount = Math.max(2, teams + change);
    setTeams(newTeamCount);
    setScores(Array(newTeamCount).fill(0));
    setTeamNames(prevNames => {
      const newNames = [...prevNames];
      if (change > 0) {
        newNames.push(`Team ${newTeamCount}`);
      } else {
        newNames.pop();
      }
      return newNames;
    });
  };

  const handleScoreChange = (index, change) => {
    const newScores = [...scores];
    newScores[index] = Math.max(0, newScores[index] + change);
    setScores(newScores);
  };

  const handleAddAnswer = (e) => {
    e.preventDefault();
    if (newAnswer.trim() !== '') {
      setGuessedAnswers([...guessedAnswers, newAnswer.trim()]);
      setNewAnswer('');
    }
  };

  const handleRemoveAnswer = (index) => {
    setGuessedAnswers(guessedAnswers.filter((_, i) => i !== index));
  };

  const handleTeamNameChange = (index, newName) => {
    setTeamNames(prevNames => {
      const newNames = [...prevNames];
      newNames[index] = newName;
      return newNames;
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="p-6 max-w-4xl w-full bg-white rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Emoji Charades Scoreboard</h1>

        <Card className="mb-8 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500">
            <CardTitle className="text-white">Timer</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center">
              <div className={`text-6xl font-bold mb-4 transition-all duration-300 ease-in-out ${timer <= 10 ? 'text-red-500 scale-110' : 'text-gray-800'
                }`}>
                {timer}s
              </div>
              <div className="flex space-x-4">
                <Button
                  onClick={handleStartStop}
                  className={`transition-all duration-300 ease-in-out ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                    }`}
                >
                  {isRunning ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                  {isRunning ? 'Pause' : 'Start'}
                </Button>
                <Button onClick={handleResetTimer} className="bg-gray-500 hover:bg-gray-600 transition-all duration-300 ease-in-out">
                  <RotateCcw className="mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <Button onClick={() => handleTeamChange(-1)}><MinusCircle /></Button>
              <span className="text-xl font-bold">{teams} Teams</span>
              <Button onClick={() => handleTeamChange(1)}><PlusCircle /></Button>
            </div>
            {scores.map((score, index) => (
              <div key={index} className="flex items-center justify-between mb-2">
                <Input
                  value={teamNames[index]}
                  onChange={(e) => handleTeamNameChange(index, e.target.value)}
                  className="w-1/3 mr-2"
                />
                <div>
                  <Button onClick={() => handleScoreChange(index, -1)} className="mr-2"><MinusCircle /></Button>
                  <span className="text-xl font-bold">{score}</span>
                  <Button onClick={() => handleScoreChange(index, 1)} className="ml-2"><PlusCircle /></Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Guessed Answers</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddAnswer} className="flex mb-4">
              <Input
                type="text"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Enter a guessed answer"
                className="mr-2"
              />
              <Button type="submit">Add</Button>
            </form>
            <ul>
              {guessedAnswers.map((answer, index) => (
                <li key={index} className="flex justify-between items-center mb-2">
                  <span>{answer}</span>
                  <Button onClick={() => handleRemoveAnswer(index)} variant="ghost">
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmojiCharadesScoreboard;



