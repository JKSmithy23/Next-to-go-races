import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { RaceList } from './components/RaceList';

import './App.css';

function App() {
  const [appState, setAppState] = useState({ 
    loading: false,
    raceSummaries: [],
   });

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = 'https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=10';
    axios.get(apiUrl).then((races) => {
      const raceSummaries = races.data.data.race_summaries;
      setAppState({ 
        loading: false, 
        raceSummaries: Object.values(raceSummaries),
      });
    });
  }, [setAppState]);

  return (
    <div className="App">
      <h1>Next to go races</h1>
      {appState.loading ? (
        <div>Loading races...</div>
      ) : (
        <RaceList summaries={appState.raceSummaries} />
      )}
    </div>
  );
}

export default App;
