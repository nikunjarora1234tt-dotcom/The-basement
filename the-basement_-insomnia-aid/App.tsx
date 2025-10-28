import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import WelcomeScreen from './components/WelcomeScreen';
import Dashboard from './components/Dashboard';
import CrashScreen from './components/CrashScreen';
import Quiz from './components/Quiz';
import SelectionScreen from './components/SelectionScreen';
import InitiationScreen from './components/InitiationScreen';
import AccessModal from './components/AccessModal';

enum AppState {
  Landing,
  Quiz,
  Selection,
  Initiation,
  Welcome,
  Dashboard,
  Rejection,
  Login,
}

interface RejectionScreenProps {
  onAcknowledge: () => void;
}

const RejectionScreen: React.FC<RejectionScreenProps> = ({ onAcknowledge }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onAcknowledge();
    }, 5000); // Redirect after 5 seconds
    return () => clearTimeout(timer);
  }, [onAcknowledge]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 animate-[fadeIn_0.5s_ease-out]">
      <div className="w-full max-w-2xl text-center p-4">
        <h2 className="text-4xl font-normal uppercase tracking-[0.1em] text-[#F8C7E8] mb-4" style={{ fontFamily: "'Satoshi', sans-serif" }}>
          Analysis Complete
        </h2>
        <p className="font-mono text-xl text-[#F8C7E8]/80 mb-8">
          You are too complete. You are too sane. Our methods may not be suitable for you at this time.
        </p>
        <p className="font-mono text-sm text-[#F8C7E8]/50">
          You will be redirected shortly.
        </p>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.Landing);
  const [crashed, setCrashed] = useState(false);
  const [crashMessages, setCrashMessages] = useState<string[]>([]);

  useEffect(() => {
    // Add a class to the body to switch themes
    if ([AppState.Landing, AppState.Quiz, AppState.Selection].includes(appState)) {
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.add('dark-theme');
    }
  }, [appState]);


  const handleInitiate = () => {
    setAppState(AppState.Quiz);
  };

  const handleLoginInitiate = () => {
    setAppState(AppState.Login);
  };
  
  const handleWelcomeAcknowledged = () => {
    setAppState(AppState.Dashboard);
  };

  const handleQuizComplete = (passed: boolean) => {
    if (passed) {
      setAppState(AppState.Selection);
    } else {
      setAppState(AppState.Rejection);
    }
  };

  const handleAcceptInvitation = () => {
    setAppState(AppState.Initiation);
  };

  const handleInitiationComplete = () => {
    setAppState(AppState.Welcome);
  };


  const handleCrash = (messages: string[]) => {
    setCrashMessages(messages);
    setCrashed(true);
  };

  const renderContent = () => {
    if (crashed) {
      return <CrashScreen messages={crashMessages} />;
    }

    switch (appState) {
      case AppState.Landing:
        return <LandingPage onInitiate={handleInitiate} onLogin={handleLoginInitiate} />;
      case AppState.Quiz:
        return <Quiz onComplete={handleQuizComplete} onCrash={handleCrash} />;
      case AppState.Selection:
        return <SelectionScreen onAccept={handleAcceptInvitation} />;
      case AppState.Initiation:
        return <InitiationScreen onComplete={handleInitiationComplete} />;
      case AppState.Welcome:
        return <WelcomeScreen onAcknowledge={handleWelcomeAcknowledged} />;
      case AppState.Dashboard:
        return <Dashboard onCrash={handleCrash} />;
      case AppState.Rejection:
        return <RejectionScreen onAcknowledge={() => setAppState(AppState.Landing)} />;
      case AppState.Login:
        return (
          <>
            <LandingPage onInitiate={handleInitiate} onLogin={handleLoginInitiate} />
            <AccessModal 
              onAccessGranted={() => setAppState(AppState.Dashboard)} 
              onClose={() => setAppState(AppState.Landing)}
              onCrash={handleCrash}
            />
          </>
        );
      default:
        return <LandingPage onInitiate={handleInitiate} onLogin={handleLoginInitiate} />;
    }
  };

  return (
    <div className={[AppState.Landing, AppState.Quiz, AppState.Selection].includes(appState) ? "bg-[#FBF9F6] text-[#333]" : "bg-black text-[#E6D9D7]"}>
      {renderContent()}
    </div>
  );
};

export default App;