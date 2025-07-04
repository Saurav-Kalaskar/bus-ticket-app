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
    const datePart = format(date, 'MMM d, yyyy');
    const timePart = format(date, 'h:mm a');
    return `${datePart} at ${timePart}`;
  };

  if (!isActivated) {
    // Inactive ticket page
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="text-center pt-20 pb-12">
          <h1 className="text-6xl font-black text-foreground mb-3 tracking-tight" style={{ fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }}>DART</h1>
          <p className="text-muted-foreground text-lg font-medium px-4" style={{ fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }}>Detroit Area Regional Transportation</p>
        </div>

        {/* Ticket Type Badge */}
        <div className="mx-6 mb-8">
          <div className="bg-secondary rounded-lg p-6 text-center shadow-lg border border-border">
            <h2 className="text-xl font-bold text-secondary-foreground" style={{ fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }}>4 Hour Pass</h2>
          </div>
        </div>

        {/* Main Ticket Info */}
        <div className="mx-6 mb-8 flex-1">
          <div className="ticket-card">
            <h3 className="text-2xl font-bold text-card-foreground mb-4 tracking-tight" style={{ fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }}>Regional Full Fare 4 Hour</h3>
            <p className="text-muted-foreground text-lg mb-6 font-medium" style={{ fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }}>Valid for 4 hours from activation</p>
            <p className="text-transit-text text-lg font-semibold" style={{ fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }}>Detroit, MI</p>
          </div>
        </div>

        {/* Activate Button */}
        <div className="mx-6 mb-16">
          <button
            onClick={onActivate}
            className="w-full bg-primary text-primary-foreground text-xl font-bold py-6 rounded-2xl shadow-xl hover:bg-primary/90 active:bg-primary/80 transition-all duration-300 ease-smooth"
            style={{ fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }}
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
      <div className="pt-6 pb-6 px-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-wide" style={{ color: '#3e4044', fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }}>DART</h1>
          <p className="text-foreground text-base font-normal -mt-1" style={{ fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif', fontWeight: '400' }}>Show operator your ticket</p>
        </div>
        {/* Close/Cross button - positioned at rightmost corner */}
        <div className="flex-1 flex justify-end">
          <button
            onClick={onReset}
            className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300 ease-smooth"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Circular Timer */}
      <div className="flex items-center justify-center px-8 pt-8 pb-16">
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
        <div className="time-display text-6xl sm:text-6xl mb-32 whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: '#3e4044', fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif', fontWeight: '900' }}>
          <span className="tracking-wide">{formatCurrentTime(currentTime).time}</span>
          <span className="tracking-wide ml-3.5">{formatCurrentTime(currentTime).period}</span>
        </div>
        
        <div className="ticket-card pt-5 px-6">
          <h3 className="text-2xl font-normal text-foreground mb-1 text-left text" style={{ fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }}>Regional Full Fare 4 Hour</h3>
          <p className="text-muted-foreground font-normal text-sm mb-6 text-left" style={{ fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }}>Detroit, MI</p>
          {activationTime && (
            <p className="text-lg text-foreground font-normal text-left" style={{ fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }}>
              Expires {formatExpiryDate(addHours(activationTime, 4))}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDisplay;


