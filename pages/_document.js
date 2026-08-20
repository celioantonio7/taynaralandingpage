import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          {/* Open Graph / Facebook */}
          <meta property="og:title" content="Taynara Lemes Leal | Consultora Evoramaxx" />
          <meta property="og:description" content="Especialista em películas automotivas, PPF, vitrificação e proteção premium para seu veículo." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://portfoliogeely.evoramaxx.com.br/" />
          <meta property="og:image" content="https://portfoliogeely.evoramaxx.com.br/preview.jpg" />

          {/* Twitter Cards */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Taynara Lemes Leal | Evoramaxx" />
          <meta name="twitter:description" content="Consultora especialista em proteção automotiva – películas, PPF e vitrificação premium." />
          <meta name="twitter:image" content="https://portfoliogeely.evoramaxx.com.br/preview.jpg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
