import styles from './Pill.module.css';

interface Props {
  content: string;
  handleClick(): void;
}

function Pill({ content, handleClick }: Props) {
  return (
    <div className={styles.pill} onClick={() => handleClick()}>
      {content}
    </div>
  );
}

export default Pill;
