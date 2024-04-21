import './Pill.css';

interface Props {
  content: string;
  handleClick(): void;
}

function Pill({ content, handleClick }: Props) {
  return (
    <div className="pill" onClick={() => handleClick()}>
      {content}
    </div>
  );
}

export default Pill;
