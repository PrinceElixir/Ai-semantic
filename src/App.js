import { useState, useEffect } from 'react';
import './App.css';
import smiley from './smiley.svg';
import cry from './cry.svg';
import neutral from './neutral.svg';

const ml5 = window.ml5;

function App() {
  const [text, setText] = useState('');
  const [score, setScore] = useState(0);
  const [sentimentTag, setSentimentTag] = useState('Neutral');
  const [modelIsReady, setModelIsReady] = useState(false);
  const [sentiment, setSentiment] = useState(null);

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const calculateSentiment = () => {
    const prediction = sentiment.predict(text);
    setScore(prediction.score);

    if (prediction.score < 0.5) {
        setSentimentTag("Negative");
    } else if (prediction.score >= 0.5 && prediction.score <= 0.8) {
        setSentimentTag("Neutral");
    } else {
        setSentimentTag("Positive");
    }
  }

  const resetReview = () => {
    setText('');
    setScore(0);
    setSentimentTag('Neutral');
  }

  useEffect(() => {
    console.log("loading model");
    setSentiment(ml5.sentiment('movieReviews', modelReady));
  }, [])

  function modelReady() {
    console.log('Model Loaded!');
    setModelIsReady(true);
  }

  return (
    <div className="App">
      <h1 className="header">Sentiment Analyzer</h1>
      <div className="input-section">
        <textarea 
          id="input" 
          onChange={handleChange} 
          value={text}
          placeholder="Write your review here..." 
          disabled={!modelIsReady}
        ></textarea>
      </div>
      <div className="buttons">
        <button className="analyze-button" onClick={calculateSentiment} disabled={!modelIsReady}>Calculate</button>
        <button className="reset-button" onClick={resetReview}>Add Another Review</button>
      </div>
      <div className="results">
        <p>Sentiment Score: {score.toFixed(5)}</p>
        <p>Sentiment Tag: {sentimentTag}</p>
        <img 
          className="sentiment-image"
          src={sentimentTag === 'Positive' ? smiley : sentimentTag === 'Negative' ? cry : neutral} 
          alt={sentimentTag}
        />
      </div>
    </div>
  );
}

export default App;

 
