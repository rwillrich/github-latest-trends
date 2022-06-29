import type { GetServerSidePropsResult, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.css'

import { Paginated } from '../entities/paginated'
import { Repo } from '../entities/repo'
import { getLatestTrends } from '../repositories/repos'
import { RepoList } from '../components/RepoList'

type HomeProps = {
  data?: Paginated<Repo>,
  error?: Error
}

const Home: NextPage<HomeProps> = ({ data, error }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Github Latest Trends</title>
        <meta name="description" content="List of trending repos from the last 7 days sorted by the number of stars." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Github Latest Trends</h1>
        <p>List of trending repos from the last 7 days sorted by the number of stars.</p>

        {error && (
          <p>{error.message}</p>
        )}

        {data && (
          <RepoList items={data.items} />
        )}
      </main>
    </div>
  )
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<HomeProps>> {
  return getLatestTrends()
    .then(data => ({ props: { data } }))
    .catch(error => ({ props: { error } }))
}

export default Home
