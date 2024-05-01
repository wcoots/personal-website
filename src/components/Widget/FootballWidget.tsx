import { useEffect } from 'react';
import { useFootball } from '@/hooks';
import { formatDate } from '@/utils';
import styles from './Widget.module.css';
import { Winner } from '@/types';

function FootballWidget() {
  const { fixtures, getFixtures } = useFootball();

  useEffect(() => {
    getFixtures();
  }, []);

  return (
    <div className={styles.widget}>
      {fixtures &&
        fixtures.map((match) => (
          <div className={styles['widget-panel']} key={match.id}>
            <img className={styles['football-crest-image']} src={match.homeTeam.crest} alt={match.homeTeam.shortName} />
            <div>
              <p style={match.score.winner === Winner.HOME_TEAM ? { textDecoration: 'underline' } : {}}>
                {match.homeTeam.tla}
              </p>
            </div>
            <div className={styles['football-panel-centre']}>
              <p className={styles['football-score']}>
                {match.score.fullTime.home} - {match.score.fullTime.away}
              </p>
              <p className={styles['football-date']}>{formatDate(match.utcDate)}</p>
            </div>
            <div>
              <p style={match.score.winner === Winner.AWAY_TEAM ? { textDecoration: 'underline' } : {}}>
                {match.awayTeam.tla}
              </p>
            </div>
            <img className={styles['football-crest-image']} src={match.awayTeam.crest} alt={match.awayTeam.shortName} />
          </div>
        ))}
    </div>
  );
}

export default FootballWidget;
