import Link from 'next/link';
import styles from './IconButton.module.css';
import { HTMLAttributeAnchorTarget } from 'react';

type IconType = 'github' | 'linkedin' | 'activitymap';

interface Props {
  identifier: IconType;
}

const iconSvgs: { [iconType in IconType]: { path: string; url: string; target: HTMLAttributeAnchorTarget } } = {
  github: { path: '/github.svg', url: 'https://github.com/wcoots', target: '_blank' },
  linkedin: { path: '/linkedin.svg', url: 'https://www.linkedin.com/in/wcoots/', target: '_blank' },
  activitymap: { path: '/strava.svg', url: 'https://activity-map.vercel.app/', target: '_blank' },
};

function IconButton({ identifier }: Props) {
  const iconPath = iconSvgs[identifier].path;
  const iconUrl = iconSvgs[identifier].url;
  const iconTarget = iconSvgs[identifier].target;

  return (
    <Link className={styles['link']} href={iconUrl} target={iconTarget}>
      <img className={styles['icon-button']} src={iconPath} alt={`${identifier} icon`} />
    </Link>
  );
}

export default IconButton;
