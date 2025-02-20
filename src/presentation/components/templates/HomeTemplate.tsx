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
  user?: any; // Replace with proper user type
  stats?: {
    treeCount: number;
    arrayCount: number;
  };
  isLoading?: boolean;
  navigationHandlers: {
    onLogin: () => void;
    onSignup: () => void;
    onWaitingList: () => void;
    onInvestor: () => void;
    onProducer: () => void;
  };
}

export function HomeTemplate({ 
  user, 
  isLoading, 
  navigationHandlers 
}: HomeTemplateProps) {
  return (
    <>
      <Hero 
        user={user}
        isLoading={isLoading}
        onWaitingList={navigationHandlers.onWaitingList}
        onLogin={navigationHandlers.onLogin}
        onSignup={navigationHandlers.onSignup}
      />
      <main className="2xl:w-[1200px] md:mx-auto mt-[90vh]">
        <About />
        <Strategy />
        <HowItWorks />
        <Pricing />
        <RecentRegistrations />
        <Disclaimer />
        <Footer />
      </main>
    </>
  );
} 