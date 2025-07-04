import { useState } from 'react';
import TicketDisplay from './components/TicketDisplay';
import './App.css';

function App() {
  const [isActivated, setIsActivated] = useState(false);
  const [activationTime, setActivationTime] = useState<Date | null>(null);

  const handleActivateTicket = () => {
    setIsActivated(true);
    setActivationTime(new Date());
  };

  const handleResetTicket = () => {
    setIsActivated(false);
    setActivationTime(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <TicketDisplay
        isActivated={isActivated}
        activationTime={activationTime}
        onActivate={handleActivateTicket}
        onReset={handleResetTicket}
      />
    </div>
  );
}

export default App;
