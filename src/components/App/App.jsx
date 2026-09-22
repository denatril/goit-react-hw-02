import { useEffect, useState } from 'react';
import Description from '../Description/Description.jsx';
import Options from '../Options/Options.jsx';
import Feedback from '../Feedback/Feedback.jsx';
import Notification from '../Notification/Notification.jsx';
import styles from './App.module.css';

const STORAGE_KEY = 'sip-happens-feedback';
const initialFeedback = { good: 0, neutral: 0, bad: 0 };

function readFeedback() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (
      saved &&
      Object.keys(initialFeedback).every(
        (type) => Number.isSafeInteger(saved[type]) && saved[type] >= 0,
      )
    ) {
      return { good: saved.good, neutral: saved.neutral, bad: saved.bad };
    }
  } catch {
    // Invalid or unavailable storage must not prevent voting.
  }
  return { ...initialFeedback };
}

export default function App() {
  const [feedback, setFeedback] = useState(readFeedback);
  const { good, neutral, bad } = feedback;
  const totalFeedback = good + neutral + bad;
  const positiveFeedback =
    totalFeedback > 0 ? Math.round((good / totalFeedback) * 100) : 0;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback));
    } catch {
      // Voting still works if browser storage is disabled or full.
    }
  }, [feedback]);

  const updateFeedback = (feedbackType) => {
    setFeedback((previousFeedback) => ({
      ...previousFeedback,
      [feedbackType]: previousFeedback[feedbackType] + 1,
    }));
  };

  const resetFeedback = () => setFeedback({ ...initialFeedback });

  return (
    <main className={styles.container}>
      <Description />
      <Options
        onUpdateFeedback={updateFeedback}
        onReset={resetFeedback}
        totalFeedback={totalFeedback}
      />
      <div aria-live="polite" aria-atomic="true">
        {totalFeedback > 0 ? (
          <Feedback
            good={good}
            neutral={neutral}
            bad={bad}
            totalFeedback={totalFeedback}
            positiveFeedback={positiveFeedback}
          />
        ) : (
          <Notification />
        )}
      </div>
    </main>
  );
}
