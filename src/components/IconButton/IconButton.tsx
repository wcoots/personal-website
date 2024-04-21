import Image from 'next/image';
import styles from './IconButton.module.css';

type IconType = 'github' | 'linkedin';

interface Props {
  identifier: IconType;
}

const iconSvgs: { [iconType in IconType]: { path: string; url: string } } = {
  github: { path: '/github.svg', url: 'https://github.com/wcoots' },
  linkedin: { path: '/linkedin.svg', url: 'https://www.linkedin.com/in/wcoots/' },
};

function IconButton({ identifier }: Props) {
  const iconPath = iconSvgs[identifier].path;
  const iconUrl = iconSvgs[identifier].url;

  function handleClick() {
    window.open(iconUrl, '_blank');
  }

  return (
    <Image
      className={styles['icon-button']}
      src={iconPath}
      width={96}
      height={96}
      alt={`${identifier} icon`}
      onClick={handleClick}
    />
  );
}

export default IconButton;
