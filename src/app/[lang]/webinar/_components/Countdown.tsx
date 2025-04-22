import pluralize from 'pluralize';
import React, { Fragment, useState, useEffect } from 'react'

type CountdownProps = {
  date: string
  timezone: string
}

export default function Countdown({ date, timezone }: CountdownProps) {
  const webinarDate = new Date(`${date}`)
    .toLocaleString('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      hour12: true,
      weekday: 'long',
      timeZoneName: 'shortGeneric',
    });

  const useCountdown = (targetDate: Date) => {
    const [days, setDays] = useState("0");
    const [hours, setHours] = useState("0");
    const [minutes, setMinutes] = useState("0");
    const [seconds, setSeconds] = useState("0");

    useEffect(() => {
      const now = new Date();
      const interval = setInterval(() => {
        const days = Math.floor((targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((targetDate.getTime() - now.getTime()) / (1000 * 60 * 60)) % 24;
        const minutes = Math.floor((targetDate.getTime() - now.getTime()) / (1000 * 60)) % 60;
        const seconds = Math.floor((targetDate.getTime() - now.getTime()) / 1000) % 60;

        setDays(days > 0 ? days.toString().padStart(2, '0') : '0');
        setHours(hours > 0 ? hours.toString().padStart(2, '0') : '0');
        setMinutes(minutes > 0 ? minutes.toString().padStart(2, '0') : '0');
        setSeconds(seconds > 0 ? seconds.toString().padStart(2, '0') : '0');
      }, 1000);

      return () => clearInterval(interval);
    }, [targetDate]);

    return [days, hours, minutes, seconds];
  }

  const [days, hours, minutes, seconds] = useCountdown(new Date(`${date}`));

  const Counter = ({ label, value }: { label: string, value: string }) => {
    return (
      <div className="flex flex-col items-center gap-1 w-max">
        <p className="text-6xl font-semibold text-center text-primary">{value}</p>
        <p className="text-sm text-center uppercase text-primary font-medium">{label}</p>
      </div>
    )
  }

  if (days === '0' && hours === '0' && minutes === '0' && seconds === '0') {
    return (
      <div className='flex flex-col items-center gap-2 bg-secondary rounded-lg p-4 px-6'>
        <p className="text-2xl font-semibold text-center text-primary">
          The webinar has started
        </p>
        <p className='text-sm text-center text-muted-foreground'>Register to join the next one if you missed it</p>
      </div>
    )
  }

  return (
    <Fragment>
      <p className="text-2xl font-semibold text-center text-primary-foreground">{webinarDate}</p>
      <div className="grid grid-cols-4 gap-2 place-items-center place-content-center bg-secondary w-full rounded-lg p-4">
        <Counter label={pluralize("Day", parseInt(days))} value={days} />
        <Counter label={pluralize("Hour", parseInt(hours))} value={hours} />
        <Counter label={pluralize("Minute", parseInt(minutes))} value={minutes} />
        <Counter label={pluralize("Second", parseInt(seconds))} value={seconds} />
      </div>
    </Fragment>
  )
}
