import React, { useState, useEffect } from "react";

async function useTimeout(callback: () => void, delay: number) {
  await new Promise(res => setTimeout(res, delay));
  callback();
}

// if you want to try your code on the right panel
// remember to export App() component like below

export function App() {
  const [msg, setMsg] = useState('initializing...')

  const setTimer = () => {
    setMsg("Timer done!")
  }

  useEffect(() => {
    const startTimer = () => {
      useTimeout(setTimer, 3000)
    }
    startTimer()
  },[])

  return (
    <div>{msg}</div>
    )
}




