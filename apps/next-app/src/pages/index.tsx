import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Button } from 'ui/Button';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IBoy } from 'server/src/lib/BoyInterface';

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <Button />
      <div className="bg-yellow-200 h-12 w-12" />
    </main>
  </div>
);

export default Home;
