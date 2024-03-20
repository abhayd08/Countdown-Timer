import styles from "./DateTimePicker.module.css";
import { Button } from "@nextui-org/react";
import { useContext, useState } from "react";
import TimerContext from "../Contexts/TimerContext";
import { toast, cssTransition } from "react-toastify";
import { Spinner } from "@nextui-org/react";

const DateTimePicker = () => {
  const {
    isTimerStarted,
    setIsTimerStarted,
    targetDateTime,
    setTargetDateTime,
    setTimeDifferenceInMilliseconds,
    setIsTimerCancelled,
    setTimeWhenTimerStarted,
    setIsTimerStartBtnClicked,
  } = useContext(TimerContext);

  const bounce = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut",
  });

  const [startBtnContent, setStartBtnContent] = useState("Start Timer");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        document.getElementById("submitBtn").setAttribute("disabled", true);
        setStartBtnContent(<Spinner color="danger" />);
        setIsTimerStartBtnClicked(true);
        setTimeDifferenceInMilliseconds(new Date(targetDateTime) - Date.now());
        setTimeWhenTimerStarted(new Date());
        setIsTimerCancelled(false);
        const timerId = setTimeout(() => {
          setStartBtnContent("Start Timer");
          document.getElementById("submitBtn").removeAttribute("disabled");
        }, 1000);

        return () => clearTimeout(timerId);
      }}
      className={`text-xl flex  animate__animated animate__pulse justify-center items-center flex-wrap gap-2 ${styles.form}`}
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
          id="submitBtn"
          className="tracking-wide text-white h-[2.65rem] rounded-lg data-[hover]:opacity-100 hover:bg-[yellow] hover:text-danger transition-colors text-base w-36 font-semibold"
          color="success"
        >
          {startBtnContent}
        </Button>
      ) : (
        <div
          onClick={() => {
            setIsTimerCancelled(true);
            setIsTimerStartBtnClicked(false);
            setIsTimerStarted(false);
            toast.warn("The countdown has been cancelled."),
              {
                position: "top-right",
                transition: bounce,
              };
          }}
          className="tracking-wide h-[2.65rem] bg-danger flex justify-center items-center cursor-pointer text-white rounded-lg data-[hover]:opacity-100 active:scale-[0.96] transition-all hover:bg-[darkred] hover:text-white text-base w-36 font-semibold"
        >
          Cancel Timer
        </div>
      )}
    </form>
  );
};

export default DateTimePicker;
