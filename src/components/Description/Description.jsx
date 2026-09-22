import styles from './Description.module.css';

export default function Description() {
  return (
    <header className={styles.description}>
      <h1 className={styles.title}>Sip Happens Café</h1>
      <p>
        Please leave your feedback about our service by selecting one of the
        options below.
      </p>
    </header>
  );
}
