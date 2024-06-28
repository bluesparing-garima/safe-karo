import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

interface CountdownTimerProps {
  registerDate: any; // Accepts any type that can be converted to dayjs
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ registerDate }) => {
  const regDate = dayjs(registerDate);

  const calculateTimeLeft = () => {
    const now = dayjs();

    const diffInMilliseconds = now.diff(regDate); // Difference in milliseconds

    if (diffInMilliseconds <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    // Convert milliseconds to seconds
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

    const days = Math.floor(diffInSeconds / (24 * 60 * 60));
    const hours = Math.floor((diffInSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(diffInSeconds % 60);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [regDate]);

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div>
      {days > 0 && (
        <span>
          {days} day{days !== 1 ? "s" : ""}{" "}
        </span>
      )}
      {hours > 0 && (
        <span>
          {hours} hour{hours !== 1 ? "s" : ""}{" "}
        </span>
      )}
      {minutes > 0 && (
        <span>
          {minutes} minute{minutes !== 1 ? "s" : ""}{" "}
        </span>
      )}
      {seconds > 0 && (
        <span>
          {seconds} second{seconds !== 1 ? "s" : ""}{" "}
        </span>
      )}
      {days === 0 && hours === 0 && minutes === 0 && seconds === 0 && (
        <span>Time's up!</span>
      )}
    </div>
  );
};

export default CountdownTimer;
