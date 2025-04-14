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

        setDays(days.toString().padStart(2, '0'));
        setHours(hours.toString().padStart(2, '0'));
        setMinutes(minutes.toString().padStart(2, '0'));
        setSeconds(seconds.toString().padStart(2, '0'));
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

  return (
    <Fragment>
      <p className="text-2xl font-semibold text-center text-primary-foreground">{webinarDate}</p>
      <div className="grid grid-cols-4 gap-2 place-items-center place-content-center bg-secondary w-full rounded-lg p-4">
        <Counter label="Days" value={days} />
        <Counter label="Hours" value={hours} />
        <Counter label="Minutes" value={minutes} />
        <Counter label="Seconds" value={seconds} />
      </div>
    </Fragment>
  )
}
