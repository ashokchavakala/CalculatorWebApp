import React, { useState, useEffect } from "react";

function Clock({isActivate}) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  return (
    <div>
      {/* <h2>Current Time</h2> */}
      <p className={isActivate === "darkMode" ? "timer" : "clockDarkMode"} >{time.toLocaleTimeString()}</p>
    </div>
  );
}

export default Clock;
