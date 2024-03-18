import { useContext } from "react";
import TimerContext from "../Contexts/TimerContext";

const TimerStartInfo = () => {
  const { timeWhenTimerStarted, isTimerStarted } = useContext(TimerContext);

  const timerStartDate = isTimerStarted
    ? timeWhenTimerStarted.toLocaleDateString("en-us", {
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "";

  return (
    <div className={`px-2 mt-8 flex flex-col h-14 -mb-6 items-start`}>
      <h3 className="text-xl">Timer started on </h3>
      <strong className="text-xl font-semibold text-teal-700">
        {timerStartDate}
      </strong>
    </div>
  );
};

export default TimerStartInfo;
