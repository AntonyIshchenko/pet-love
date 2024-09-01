import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header, Layout } from 'components';

function App() {
  return (
    <>
      <Header />
      <Layout>{'children'}</Layout>
    </>
  );
}

export default App;
