import React from 'react';
import BreathingWidget from './BreathingWidget';

interface LandingPageProps {
  onInitiate: () => void;
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onInitiate, onLogin }) => {
  const blogPosts = [
    {
      title: "The Art of Stillness in a Restless World",
      excerpt: "In an age of constant motion, finding a moment of true stillness can feel like a revolutionary act. We explore techniques to calm the mind when it's racing at 3 AM."
    },
    {
      title: "Rethinking Your Nightly Rituals",
      excerpt: "Your brain craves routine, but is your current one helping or hurting? A critical look at the habits that shape our sleep, for better or worse."
    },
    {
      title: "Embracing the Darkness: A Guide to Light Discipline",
      excerpt: "From screens to streetlights, our world is never truly dark. Learn how to create a sanctuary of darkness to signal to your body that it's time for rest."
    },
  ];

  return (
    <div className="min-h-screen w-full px-4 sm:px-6 lg:px-8 py-12 animate-[fadeIn_1s_ease-out]">
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-normal text-slate-800" style={{ fontFamily: "'Lora', serif" }}>
          Can't Sleep?
        </h1>
        <p className="mt-4 text-lg text-slate-500">A journal for the waking hours.</p>
      </header>
      
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
            {blogPosts.map(post => (
                <div key={post.title}>
                    <h2 className="text-3xl font-normal text-slate-800 mb-2" style={{ fontFamily: "'Lora', serif" }}>{post.title}</h2>
                    <p className="text-slate-600 leading-relaxed">{post.excerpt}</p>
                    <a href="#" className="text-sky-600 hover:text-sky-800 transition-colors mt-3 inline-block">Read More &rarr;</a>
                </div>
            ))}
             <div className="mt-12 p-8 border border-slate-300 rounded-lg bg-white shadow-sm">
                <h2 className="text-3xl font-normal text-slate-800 mb-3" style={{ fontFamily: "'Lora', serif" }}>Personalized Sleep Assessment</h2>
                <p className="text-slate-600 leading-relaxed mb-6">Sometimes, the root of sleeplessness isn't just physical. Our assessment helps identify underlying personality traits that may contribute to your waking hours. This is not for everyone. Find out if our methods are right for you.</p>
                <button 
                  onClick={onInitiate} 
                  className="bg-sky-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-700 transition-colors duration-300"
                >
                  Begin Assessment
                </button>
            </div>
        </div>
        
        <aside className="space-y-8">
            <BreathingWidget />
        </aside>
      </main>

      <footer className="text-center mt-20 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-400">
              © 2024 Insomnia Solutions | All rights reserved. You are not alone in the quiet hours. 
              <button onClick={onLogin} className="hover:text-slate-700 transition-colors">*</button>
          </p>
      </footer>
    </div>
  );
};

export default LandingPage;