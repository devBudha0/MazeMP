import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">me!</a>
        </h1>

        <p className={styles.description}>
          Choose your{' '}
          <code className={styles.code}>game</code>
        </p>

        <div className={styles.grid}>
          <a href="/maze" className={styles.card}>
            <h2>The Maze &rarr;</h2>
            <p>Find your way from the hell.</p>
          </a>

        </div>
      </main>

    </div>
  )
}

export default Home
