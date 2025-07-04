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
    <div className="min-h-screen bg-background relative">
      {/* Base inactive ticket screen - always visible */}
      <TicketDisplay
        isActivated={false}
        activationTime={null}
        onActivate={handleActivateTicket}
        onReset={handleResetTicket}
      />
      
      {/* Active ticket overlay - shows on top when activated */}
      {isActivated && (
        <div className="fixed inset-0 z-50 bg-background">
          <TicketDisplay
            isActivated={true}
            activationTime={activationTime}
            onActivate={handleActivateTicket}
            onReset={handleResetTicket}
          />
        </div>
      )}
    </div>
  );
}

export default App;
