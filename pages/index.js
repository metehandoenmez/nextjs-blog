import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

//getStatic props for *static rendering, page loaded at startup*
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
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
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello!</p>
        <p>Welcome to our blog website.</p>
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
  );
}
