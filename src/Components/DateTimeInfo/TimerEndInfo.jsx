import { useContext } from "react";
import TimerContext from "../Contexts/TimerContext";

const TimerEndInfo = () => {
  const { targetDateTime } = useContext(TimerContext);
  const targetDate = new Date(targetDateTime).toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="px-2 flex -mb-8 flex-col items-end animate__animated animate__backInRight">
      <h3 className="text-xl">Timer ends on </h3>
      <strong className="text-xl font-semibold text-teal-700">
        {targetDate}
      </strong>
    </div>
  );
};

export default TimerEndInfo;
