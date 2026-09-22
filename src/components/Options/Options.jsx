import styles from './Options.module.css';

export default function Options({ onUpdateFeedback, onReset, totalFeedback }) {
  return (
    <div className={styles.options}>
      <button type="button" onClick={() => onUpdateFeedback('good')}>
        Good
      </button>
      <button type="button" onClick={() => onUpdateFeedback('neutral')}>
        Neutral
      </button>
      <button type="button" onClick={() => onUpdateFeedback('bad')}>
        Bad
      </button>
      {totalFeedback > 0 && (
        <button type="button" onClick={onReset}>
          Reset
        </button>
      )}
    </div>
  );
}
