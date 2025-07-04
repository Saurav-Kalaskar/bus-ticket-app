import { useState, useEffect } from 'react';
import { format, addHours } from 'date-fns';
import DartLogo from './DartLogo';

interface TicketDisplayProps {
  isActivated: boolean;
  activationTime: Date | null;
  onActivate: () => void;
  onReset: () => void;
  selectedTicketType?: string;
  onTicketTypeSelect?: (ticketType: string) => void;
}

const TicketDisplay = ({
  isActivated,
  activationTime,
  onActivate,
  onReset,
  selectedTicketType = '4 Hour',
  onTicketTypeSelect,
}: TicketDisplayProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTicket, setSelectedTicket] = useState(selectedTicketType);

  const ticketOptions = [
    { id: '4-hour', name: '4 Hour', duration: '4 hours', price: '$2.00' },
    { id: '24-hour', name: '24 Hour', duration: '24 hours', price: '$5.00' },
    { id: '7-day', name: '7 Day', duration: '7 days', price: '$22.00' },
    { id: '31-day', name: '31 Day', duration: '31 days', price: '$70.00' },
  ];

  const handleTicketSelect = (ticketType: string) => {
    setSelectedTicket(ticketType);
    if (onTicketTypeSelect) {
      onTicketTypeSelect(ticketType);
    }
  };

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

  const calculateExpiryTime = (activationTime: Date, ticketType: string) => {
    const selectedOption = ticketOptions.find(opt => opt.name === ticketType);
    
    switch (selectedOption?.id) {
      case '4-hour':
        return addHours(activationTime, 4);
      case '24-hour':
        return addHours(activationTime, 24);
      case '7-day':
        return addHours(activationTime, 24 * 7); // 7 days
      case '31-day':
        return addHours(activationTime, 24 * 31); // 31 days
      default:
        return addHours(activationTime, 4); // Default to 4 hours
    }
  };

  if (!isActivated) {
    // Inactive ticket page
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black text-foreground mb-1 tracking-tight" style={{ fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }}>DART</h1>
          <p className="text-muted-foreground text-sm font-medium px-4" style={{ fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }}>Detroit Area Regional Transportation</p>
        </div>

        {/* Ticket Type Selection */}
        <div className="mx-6 mb-6">
          <div className="bg-secondary rounded-lg p-4 text-center shadow-lg border border-border">
            <h2 className="text-base font-bold text-secondary-foreground mb-3" style={{ fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }}>Select Pass Type</h2>
            
            {/* Ticket Options Grid */}
            <div className="space-y-2">
              {ticketOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleTicketSelect(option.name)}
                  className={`w-full p-2.5 rounded-lg border-2 transition-all duration-200 ${
                    selectedTicket === option.name
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border bg-background hover:border-primary/50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground text-sm" style={{ fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }}>
                        {option.name}
                      </h3>
                      <p className="text-xs text-muted-foreground" style={{ fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }}>
                        Valid for {option.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-primary" style={{ fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }}>
                        {option.price}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Ticket Info */}
        <div className="mx-6 mb-6">
          <div className="ticket-card">
            <h3 className="text-lg font-bold text-card-foreground mb-2 tracking-tight" style={{ fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }}>
              Regional Full Fare {selectedTicket}
            </h3>
            <p className="text-muted-foreground text-sm mb-3 font-medium" style={{ fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }}>
              Valid for {ticketOptions.find(opt => opt.name === selectedTicket)?.duration || '4 hours'} from activation
            </p>
            <p className="text-transit-text text-sm font-semibold" style={{ fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }}>Detroit, MI</p>
          </div>
        </div>

        {/* Activate Button */}
        <div className="mx-6">
          <button
            onClick={onActivate}
            className="w-full bg-primary text-primary-foreground text-base font-bold py-3.5 rounded-2xl shadow-xl hover:bg-primary/90 active:bg-primary/80 transition-all duration-300 ease-smooth"
            style={{ fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }}
          >
            Activate {selectedTicket}
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
          <h3 className="text-2xl font-normal text-foreground mb-1 text-left text" style={{ fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }}>
            Regional Full Fare {selectedTicket}
          </h3>
          <p className="text-muted-foreground font-normal text-sm mb-6 text-left" style={{ fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }}>Detroit, MI</p>
          {activationTime && (
            <p className="text-lg text-foreground font-semibold text-left" style={{ fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif', fontWeight: '400' }}>
              Expires {formatExpiryDate(calculateExpiryTime(activationTime, selectedTicket))}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDisplay;


