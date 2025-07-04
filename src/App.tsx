import { useState } from 'react';
import TicketDisplay from './components/TicketDisplay';
import './App.css';

function App() {
  const [isActivated, setIsActivated] = useState(false);
  const [activationTime, setActivationTime] = useState<Date | null>(null);
  const [selectedTicketType, setSelectedTicketType] = useState('4 Hour Pass');

  const handleActivateTicket = () => {
    setIsActivated(true);
    setActivationTime(new Date());
  };

  const handleResetTicket = () => {
    setIsActivated(false);
    setActivationTime(null);
  };

  const handleTicketTypeSelect = (ticketType: string) => {
    setSelectedTicketType(ticketType);
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Base inactive ticket screen - always visible */}
      <TicketDisplay
        isActivated={false}
        activationTime={null}
        onActivate={handleActivateTicket}
        onReset={handleResetTicket}
        selectedTicketType={selectedTicketType}
        onTicketTypeSelect={handleTicketTypeSelect}
      />
      
      {/* Active ticket overlay - shows on top when activated */}
      {isActivated && (
        <div className="fixed inset-0 z-50 bg-background">
          <TicketDisplay
            isActivated={true}
            activationTime={activationTime}
            onActivate={handleActivateTicket}
            onReset={handleResetTicket}
            selectedTicketType={selectedTicketType}
            onTicketTypeSelect={handleTicketTypeSelect}
          />
        </div>
      )}
    </div>
  );
}

export default App;
