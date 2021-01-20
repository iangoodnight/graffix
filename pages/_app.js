import '../styles/global.scss';

import Head from 'next/head';

import Layout from '../components/Layout.js';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Graffix</title>
      </Head>

      <Layout>
        <div className="grid wrapper">
          <Component {...pageProps} />
        </div>
      </Layout>
    </>
  );
}

export default App;
