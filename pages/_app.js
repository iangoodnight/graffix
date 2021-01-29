import '../styles/global.scss';

import Head from 'next/head';
import { Provider } from 'next-auth/client';

import Layout from '../components/Layout.js';

function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>Graffix</title>
      </Head>

      <Layout>
        <div className="grid wrapper">
          <Component {...pageProps} />
        </div>
      </Layout>
    </Provider>
  );
}

export default App;
