'use client';

import styles from '@/styles/not-found.module.scss';
import { Button } from '@mui/material';

export default function PageNotFound({ params }: any) {

  return (
    <div id="notfound">
      <div className={styles.notfound}>
        <div className={styles['notfound-404']}>
          <h1>{ params.status }</h1>
        </div>
        <h2>{ params.title }</h2>
				<p> {params.description} </p>
				<Button variant="contained" type="submit" fullWidth>
					{params.btnName}
				</Button>
      </div>
    </div>
  );
};
