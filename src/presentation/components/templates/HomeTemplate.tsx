import React from 'react';
import Hero from '../home/Hero';
import About from '../home/About';
import Strategy from '../home/Strategy';
import HowItWorks from '../home/HowItWorks';
import Pricing from '../home/Pricing';
import RecentRegistrations from '../home/RecentRegistrations';
import Disclaimer from '../home/Disclaimer';
import Footer from '../home/Footer';

interface HomeTemplateProps {
  navigationHandlers: {
    onLogin: () => void;
    onSignup: () => void;
    onWaitingList: () => void;
    onInvestor: () => void;
    onProducer: () => void;
  };
}

export function HomeTemplate({
  navigationHandlers 
}: HomeTemplateProps) {
  return (
    <>
      <Hero 
        
      />
      <main className="2xl:w-[1200px] md:mx-auto mt-[90vh]">
        <About />
        <Strategy />
        <HowItWorks />
        <Pricing handleWaitingListClick={navigationHandlers.onWaitingList}/>
        <RecentRegistrations />
        <Disclaimer />
        <Footer />
      </main>
    </>
  );
} 