'use client';

import styles from '@/styles/not-found.module.scss';

export default function PageNotFound({ params }: any) {

  return (
    <div id="notfound">
      <div className={styles.notfound}>
        <div className={styles['notfound-404']}>
          <h1>{ params.status }</h1>
        </div>
        <h2>{ params.title }</h2>
        <p> { params.description } </p>
        <a href="/" className={styles['notfound-a']}>
          { params.btnName }
        </a>
      </div>
    </div>
  );
};
