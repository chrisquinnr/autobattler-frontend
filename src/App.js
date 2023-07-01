import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { Game } from './Components/Game.jsx';

// const registerUrl = 'http://localhost:8000/register';
const getTeamUrl = 'http://localhost:8000/api/team';
const getOppositionUrl = 'http://localhost:8000/api/opposition';
const battleResultUrl = 'http://localhost:8000/api/battle';
const GAME_SPEED = 1000;
function App() {
  // const [webSocketId, setWebSocketId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [team, setTeam] = useState([]);
  const [index, setIndex] = useState(0);
  const [opposition, setOpposition] = useState([]);
  const [battleObject, setBattleObject] = useState(null);

  // useEffect(() => {
  //   // POST request using fetch inside useEffect React hook
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ user_id: 1 }),
  //   };
  //   fetch(registerUrl, requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => setWebSocketId(data.url));
  // }, []);

  useMemo(() => {
    fetch(getTeamUrl)
      .then((response) => response.json())
      .then((data) => setTeam(data))
      .catch((err) => {
        setError(err);
      });
  }, []);

  useMemo(() => {
    if (team) {
      fetch(getOppositionUrl)
        .then((response) => response.json())
        .then((data) => setOpposition(data))
        .catch((err) => {
          setError(err);
        });
    }
  }, [team]);

  useEffect(() => {
    if (team && opposition) {
      fetch(battleResultUrl)
        .then((response) => response.json())
        .then((data) => setBattleObject(data))
        .catch((err) => {
          setError(err);
        });
    }
  }, []);

  useEffect(() => {
    if (team.length && opposition.length && battleObject?.steps && !error) {
      setLoading(false);
    }
  }, [team, opposition, battleObject, error]);

  const updateRoster = (step) => {
    let defenderIndex = opposition.findIndex((o) => o.name === step.defender);
    let defence = opposition;
    if (step.who === 'ai') {
      defenderIndex = team.findIndex((t) => t.name === step.defender);
      defence = team;
    }
    if (defenderIndex < 0) {
      return false;
    }
    defence[defenderIndex].stats.hp = step.remaining_hp;
    if (step.who === 'ai') {
      setTeam(defence);
    } else {
      setOpposition(defence);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < battleObject?.steps.length) {
        setIndex(index + 1);
        updateRoster(battleObject.steps[index]);
      } else {
        clearInterval(interval); // Stop the interval when all elements have been moved
      }
    }, GAME_SPEED);

    return () => {
      clearInterval(interval); // Cleanup: clear the interval when the component unmounts
    };
  });

  return (
    <div className="App">
      {loading ? (
        <div>
          <h1>Loading</h1>
        </div>
      ) : (
        <div className="wrapper">
          <Game
            team={team}
            opposition={opposition}
            result={battleObject?.result}
            index={index}
            steps={battleObject?.steps.slice(0, index)}
            done={battleObject?.steps.length === index}
          />
        </div>
      )}
      {error && (
        <div>
          <p>Error: {error.message}</p>
        </div>
      )}
    </div>
  );
}

export default App;
