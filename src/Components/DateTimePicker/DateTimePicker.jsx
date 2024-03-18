import styles from "./DateTimePicker.module.css";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useContext } from "react";
import TimerContext from "../Contexts/TimerContext";

const DateTimePicker = () => {
  const {
    isTimerStarted,
    setIsTimerStarted,
    targetDateTime,
    setTargetDateTime,
    setTimeDifferenceInMilliseconds,
    setIsTimerCancelled,
    daysRemaining,
    setDaysRemaining,
    hoursRemaining,
    setHoursRemaining,
    minutesRemaining,
    setMinutesRemaining,
    secondsRemaining,
    setSecondsRemaining,
  } = useContext(TimerContext);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={`text-xl flex justify-center items-center flex-wrap gap-2 ${styles.form}`}
    >
      <div className="relative">
        <input
          onChange={(e) => setTargetDateTime(e.target.value)}
          required
          id="datetime-picker"
          type="datetime-local"
          className="max-w-[90vw] w-80 h-[2.65rem] text-[0.92rem] hover:bg-gray-200 rounded-lg p-3 focus:outline-0 focus:ring-2 focus:ring-danger"
        />
        <h6 className="absolute -top-8 text-[0.92rem] z-10 left-0">
          Select date and time
        </h6>
      </div>
      {!isTimerStarted ? (
        <Button
          type="submit"
          className="tracking-wide h-[2.65rem] rounded-lg data-[hover]:opacity-100 hover:bg-[yellow] hover:text-danger transition-colors text-base w-40 font-semibold"
          color="danger"
          onClick={() => {
            setIsTimerStarted(true);
            setTimeDifferenceInMilliseconds(
              new Date(targetDateTime) - Date.now()
            );
            setIsTimerCancelled(false);
          }}
        >
          Start Timer
        </Button>
      ) : (
        <Button
          type="submit"
          onClick={() => {
            setIsTimerCancelled(true);
            setIsTimerStarted(false);
          }}
          className="tracking-wide h-[2.65rem] rounded-lg data-[hover]:opacity-100 hover:bg-[yellow] hover:text-danger transition-colors text-base w-40 font-semibold"
          color="danger"
        >
          Cancel Timer
        </Button>
      )}
    </form>
  );
};

export default DateTimePicker;
