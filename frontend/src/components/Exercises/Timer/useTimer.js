import { useState, useRef } from "react";

export default function useTimer(initialState = 0) {
  const [timer, setTimer] = useState(initialState);
  const [isStarted, setIsStarted] = useState(false);
  const countRef = useRef(null);

  const handleStart = () => {
    // setTimer(0);
    setIsStarted(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };
  const handlePause = () => {
    setIsStarted(false);
    clearInterval(countRef.current);
  };
  const handleReset = () => {
    clearInterval(countRef.current);
    setTimer(0);
    setIsStarted(false);
  };

  return [timer, isStarted, handleStart, handlePause, handleReset];
}
