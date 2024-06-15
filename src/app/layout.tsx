import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Header from './components/Header';
import Head from 'next/head';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap"
        />
        <title>Восход - Каталог автомобилей</title>
      </head>
      <body>
        <Head>
          <title>Восход - Каталог автомобилей</title>
          <meta name="description" content="Лучший каталог автомобилей для аренды" />
          <meta
            name="keywords"
            content="аренда автомобилей, каталог автомобилей, восход"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:title" content="Восход - Каталог автомобилей" />
          <meta
            property="og:description"
            content="Лучший каталог автомобилей для аренды"
          />
          <meta property="og:image" content="/path/to/your/image.jpg" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Восход - Каталог автомобилей" />
          <meta
            name="twitter:description"
            content="Лучший каталог автомобилей для аренды"
          />
          <meta name="twitter:image" content="/images/buggati.jpg" />
        </Head>
        <Header />
        {children}
      </body>
    </html>
  );
}
