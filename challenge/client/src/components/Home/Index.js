import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import AppAppBar from './modules/views/AppAppBar';
import ProductHero from './modules/views/ProductHero';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import Footer from '../Dashboard/Footer'

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductHowItWorks />
      <Footer />
    </React.Fragment>
  );
}

export default withRoot(Index);