import DateTimePicker from "../DateTimePicker/DateTimePicker";
import Timer from "../Timer/Timer";
import styles from "./Home.module.css";
import TimerContext from "../Contexts/TimerContext";
import { useEffect, useState } from "react";
import "animate.css";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [targetDateTime, setTargetDateTime] = useState(null);
  const [timeDifferenceInMilliseconds, setTimeDifferenceInMilliseconds] =
    useState(null);
  const [isTimerCancelled, setIsTimerCancelled] = useState(null);
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [hoursRemaining, setHoursRemaining] = useState(0);
  const [minutesRemaining, setMinutesRemaining] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [timeWhenTimerStarted, setTimeWhenTimerStarted] = useState(null);
  const [isTimerStartBtnClicked, setIsTimerStartBtnClicked] = useState(false);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  });

  return (
    <>
      <div className="py-4 flex flex-col gap-y-14 px-2 bg-gradient-to-b from-[#f31260] to-[white]">
        <TimerContext.Provider
          value={{
            isTimerStarted,
            setIsTimerStarted,
            targetDateTime,
            setTargetDateTime,
            timeDifferenceInMilliseconds,
            setTimeDifferenceInMilliseconds,
            isTimerCancelled,
            setIsTimerCancelled,
            daysRemaining,
            setDaysRemaining,
            hoursRemaining,
            setHoursRemaining,
            minutesRemaining,
            setMinutesRemaining,
            secondsRemaining,
            setSecondsRemaining,
            timeWhenTimerStarted,
            setTimeWhenTimerStarted,
            isTimerStartBtnClicked,
            setIsTimerStartBtnClicked,
          }}
        >
          <nav
            className={`flex justify-center flex-wrap items-center gap-x-4 mb-8 gap-y-2 ${styles.navHeading}`}
          >
            <h1 className="text-5xl leading-[3.75rem] text-center tracking-wide text-white font-bold">
              Countdown{" "}
              <span className="text-[yellow] text-[3.5rem]">Timer</span>
            </h1>
            <lord-icon
              src="https://cdn.lordicon.com/lzgqzxrq.json"
              id="clock"
              // trigger="loop"
              state="loop-oscillate"
              colors="primary:black,secondary:white,tertiary:black,quaternary:#f31260"
              style={{ width: "140px", height: "140px" }}
            ></lord-icon>
          </nav>
          <DateTimePicker />
          <Timer />
        </TimerContext.Provider>
        <ToastContainer
          autoClose={3000}
          closeOnClick
          draggable
          limit={3}
          pauseOnHover
          theme="dark"
          style={{ width: screenWidth <= 270 ? "100%" : "" }}
        />
      </div>
    </>
  );
};

export default Home;
