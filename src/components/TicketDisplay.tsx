import { useState, useEffect } from 'react';
import { format, addHours } from 'date-fns';
import DartLogo from './DartLogo';

interface TicketDisplayProps {
  isActivated: boolean;
  activationTime: Date | null;
  onActivate: () => void;
  onReset: () => void;
}

const TicketDisplay = ({
  isActivated,
  activationTime,
  onActivate,
  onReset,
}: TicketDisplayProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatCurrentTime = (date: Date) => {
    return format(date, 'h:mm:ss a');
  };

  const formatExpiryDate = (date: Date) => {
    return format(date, 'MMM d, yyyy, h:mm a');
  };

  if (!isActivated) {
    // Inactive ticket page
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="text-center pt-20 pb-12">
          <h1 className="text-6xl font-black text-foreground mb-3 tracking-tight">DART</h1>
          <p className="text-muted-foreground text-lg font-medium px-4">Detroit Area Regional Transportation</p>
        </div>

        {/* Ticket Type Badge */}
        <div className="mx-6 mb-8">
          <div className="bg-secondary rounded-2xl p-6 text-center shadow-lg border border-border">
            <h2 className="text-xl font-bold text-secondary-foreground">4 Hour Pass</h2>
          </div>
        </div>

        {/* Main Ticket Info */}
        <div className="mx-6 mb-8 flex-1">
          <div className="bg-card border border-border rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-card-foreground mb-4 tracking-tight">Regional Full Fare 4 Hour</h3>
            <p className="text-muted-foreground text-lg mb-6 font-medium">Valid for 4 hours from activation</p>
            <p className="text-transit-text text-lg font-semibold">Detroit, MI</p>
          </div>
        </div>

        {/* Activate Button */}
        <div className="mx-6 mb-16">
          <button
            onClick={onActivate}
            className="w-full bg-primary text-primary-foreground text-xl font-bold py-6 rounded-2xl shadow-xl hover:bg-primary/90 active:bg-primary/80 transition-all duration-300 ease-smooth"
          >
            Activate Ticket
          </button>
        </div>
      </div>
    );
  }

  // Active ticket page
  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Header with close button */}
      <div className="pt-16 pb-6 px-6 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight">DART</h1>
          <p className="text-muted-foreground text-sm mt-1 font-medium">Show operator your ticket!</p>
        </div>
        {/* Close/Cross button */}
        <button
          onClick={onReset}
          className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300 ease-smooth rounded-full hover:bg-secondary"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Circular Timer */}
      <div className="flex-1 flex items-center justify-center px-8 py-4">
        <div className="relative">
          {/* Outer circle - pixel perfect match to Figma */}
          <div className="w-72 h-72 relative">
            {/* Main blue circle */}
            <div className="w-full h-full bg-primary rounded-full flex items-center justify-center shadow-2xl">
              {/* Inner white circle */}
              <div className="w-44 h-44 bg-background rounded-full flex items-center justify-center shadow-inner">
                {/* DART Logo in center */}
                <DartLogo />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Time Display */}
      <div className="text-center px-4 pb-16">
        <div className="time-display text-5xl sm:text-6xl font-black text-foreground mb-6 tracking-tight font-mono whitespace-nowrap overflow-hidden text-ellipsis">
          {formatCurrentTime(currentTime)}
        </div>
        
        <div className="bg-card rounded-3xl p-6 mx-4 shadow-xl border border-border">
          <h3 className="text-lg font-bold text-foreground mb-2 tracking-tight">Regional Full Fare 4 Hour</h3>
          <p className="text-muted-foreground font-medium text-base mb-3">Detroit, MI</p>
          {activationTime && (
            <>
              <div className="w-full h-px bg-border my-3"></div>
              <p className="text-muted-foreground text-sm font-medium">
                Expires {formatExpiryDate(addHours(activationTime, 4))}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDisplay;
