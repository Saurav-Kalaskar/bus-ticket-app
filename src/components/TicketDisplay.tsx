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
    const timeString = format(date, 'h:mm:ss');
    const period = format(date, 'a');
    return { time: timeString, period };
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
          <h1 className="text-6xl font-black text-foreground mb-3 tracking-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}>DART</h1>
          <p className="text-muted-foreground text-lg font-medium px-4" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}>Detroit Area Regional Transportation</p>
        </div>

        {/* Ticket Type Badge */}
        <div className="mx-6 mb-8">
          <div className="bg-secondary rounded-2xl p-6 text-center shadow-lg border border-border">
            <h2 className="text-xl font-bold text-secondary-foreground" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}>4 Hour Pass</h2>
          </div>
        </div>

        {/* Main Ticket Info */}
        <div className="mx-6 mb-8 flex-1">
          <div className="ticket-card">
            <h3 className="text-2xl font-bold text-card-foreground mb-4 tracking-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}>Regional Full Fare 4 Hour</h3>
            <p className="text-muted-foreground text-lg mb-6 font-medium" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}>Valid for 4 hours from activation</p>
            <p className="text-transit-text text-lg font-semibold" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}>Detroit, MI</p>
          </div>
        </div>

        {/* Activate Button */}
        <div className="mx-6 mb-16">
          <button
            onClick={onActivate}
            className="w-full bg-primary text-primary-foreground text-xl font-bold py-6 rounded-2xl shadow-xl hover:bg-primary/90 active:bg-primary/80 transition-all duration-300 ease-smooth"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}
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
      {/* Header with close button - matching screenshot */}
      <div className="pt-14 pb-6 px-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-wide mb-1" style={{ color: '#3e4044', fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}>DART</h1>
          <p className="text-muted-foreground text-base font-normal" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}>Show operator your ticket</p>
        </div>
        {/* Close/Cross button */}
        <button
          onClick={onReset}
          className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300 ease-smooth"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Circular Timer */}
      <div className="flex items-center justify-center px-8 pt-8 pb-14">
        <div className="relative">
          {/* Outer circle - pixel perfect match to Figma */}
          <div className="w-64 h-64 relative">
            {/* Main blue circle */}
            <div className="w-full h-full rounded-full flex items-center justify-center" style={{ backgroundColor: '#1c337e' }}>
              {/* Inner white circle */}
              <div className="w-40 h-40 bg-background rounded-full flex items-center justify-center">
                {/* DART Logo in center */}
                <DartLogo />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Time Display */}
      <div className="text-center px-4 pb-20">
        <div className="time-display text-5xl sm:text-6xl mb-32 whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: '#3e4044', fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif', fontWeight: '900' }}>
          <span className="tracking-tight">{formatCurrentTime(currentTime).time}</span>
          <span className="tracking-normal ml-3.5">{formatCurrentTime(currentTime).period}</span>
        </div>
        
        <div className="ticket-card pt-5">
          <h3 className="text-lg font-bold text-foreground mb-2 tracking-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}>Regional Full Fare 4 Hour</h3>
          <p className="text-muted-foreground font-medium text-base mb-3" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}>Detroit, MI</p>
          {activationTime && (
            <p className="text-muted-foreground text-sm font-medium" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}>
              Expires {formatExpiryDate(addHours(activationTime, 4))}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDisplay;
