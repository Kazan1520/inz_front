import { Head, Html, Main, NextScript } from "next/document";

const Document = () => (
  <Html className="flex min-h-screen flex-col scroll-smooth">
    <Head />
    <body className="flex flex-grow flex-col bg-white text-black">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
