import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'

export default function Home({
  allPostsData
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

//getStatic props for *static rendering, page loaded at startup*

//would use getServerSideProps if data must be fetched at request time
//on each request, the data is fetched and the html is generated
//aka server side rendering
//
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // props for your component
//     },
//   };
// }
//
//also clientside rendering can be used
//--statically generate parts of the page that do not require external data
//--when page loads, fetch external data from the client using javascript and populate the remaining parts
//
//fetch data on client side
//   import useSWR from 'swr';

// function Profile() {
//   const { data, error } = useSWR('/api/user', fetch);

//   if (error) return <div>failed to load</div>;
//   if (!data) return <div>loading...</div>;
//   return <div>hello {data.name}!</div>;
// }
//

//getStaticProps runs at build time in production
//in development, getStaticProps runs on each request
//in production, getStaticProps runs at build time
//in production, page will be prerendered to HTML at build time using the props returned by getStaticProps
//page will be statically generated and cached for future requests
//if the data required to render the page changes, you can use dynamic generation
//if you need to fetch data at request time instead of at build time, you can try server side rendering
//if you do not need to pre-render the data, you can also use client side rendering
//getStaticProps can only be exported from a page
//you cannot export it from non-page files
//for fetching data at build time, see getStaticProps
//for fetching data on each request, see getServerSideProps
//for client side rendering, see SWR
//for dynamic rendering, see getStaticPaths
//for more info, see https://nextjs.org/docs/basic-features/data-fetching
