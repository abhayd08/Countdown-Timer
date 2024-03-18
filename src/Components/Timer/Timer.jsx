import { Card, CardBody, CardFooter, Chip } from "@nextui-org/react";
import { useContext, useRef, useEffect, useState } from "react";
import TimerContext from "../Contexts/TimerContext";
import { toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TimerStartInfo from "../DateTimeInfo/TimerStartInfo";
import TimerEndInfo from "../DateTimeInfo/TimerEndInfo";
import { usePageVisibility } from "react-page-visibility";

const Timer = () => {
  const {
    isTimerStarted,
    timeDifferenceInMilliseconds,
    isTimerCancelled,
    setIsTimerStarted,
    daysRemaining,
    setDaysRemaining,
    hoursRemaining,
    setHoursRemaining,
    minutesRemaining,
    setMinutesRemaining,
    secondsRemaining,
    setSecondsRemaining,
    isTimerStartBtnClicked,
    setIsTimerStartBtnClicked,
  } = useContext(TimerContext);

  const { isHidden } = usePageVisibility();
  const timerRef = useRef(null);

  const bounce = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut",
  });

  const successTransition = cssTransition({
    enter: "animate__animated animate__jackInTheBox",
    exit: "animate__animated animate__rollOut",
  });

  const notifyInvalidDateInput = () => {
    toast.error(
      "Please choose a date and time ahead of the current date and time.",
      {
        position: "top-right",
        transition: bounce,
      }
    );
  };

  const notifyError = (element) => {
    let message;
    if (element === "days") {
      message = "The maximum days for the countdown timer should be 99 days.";
    } else if (element === "hours") {
      message = "The maximum hours for the countdown timer should be 23 hours.";
    } else if (element === "minutes") {
      message =
        "The maximum minutes for the countdown timer should be 59 minutes.";
    } else if (element === "seconds") {
      message =
        "The maximum seconds for the countdown timer should be 59 seconds.";
    }

    toast.info(message, {
      position: "top-right",
      transition: bounce,
    });
  };

  const notifySuccess = () => {
    toast.success("The countdown is over. What's next on your adventure?"),
      {
        position: "top-center",
        transition: successTransition,
      };
  };

  useEffect(() => {
    if (isTimerStartBtnClicked && !isHidden) {
      const startTime = performance.now();
      timerRef.current = setInterval(() => {
        const currentTime = performance.now();
        const elapsed = currentTime - startTime;
        const remainingTime = timeDifferenceInMilliseconds - elapsed;
        if (remainingTime === 0) {
          clearInterval(timerRef.current);
          setIsTimerStarted(false);
          notifySuccess();
        } else {
          updateTimerValues(remainingTime);
        }
      }, 1000);
      return () => {
        clearInterval(timerRef.current);
      };
    }

    if (isTimerCancelled) {
      clearInterval(timerRef.current);
      setDaysRemaining(0);
      setHoursRemaining(0);
      setMinutesRemaining(0);
      setSecondsRemaining(0);
    }
  }, [isTimerStartBtnClicked, isHidden]);

  const updateTimerValues = (remainingTime) => {
    const daysLeft = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    if (daysLeft > 99) {
      notifyError("days");
      setIsTimerStartBtnClicked(false);
      setIsTimerStarted(false);
      setIntervalTime(0);
      return;
    } else if (daysLeft < 0) {
      notifyInvalidDateInput();
      setIsTimerStartBtnClicked(false);
      setIsTimerStarted(false);
      setIntervalTime(0);
      return;
    }

    const hoursLeft = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    if (hoursLeft > 23) {
      notifyError("hours");
      setIsTimerStartBtnClicked(false);
      setIsTimerStarted(false);
      setIntervalTime(0);
      return;
    } else if (hoursLeft < 0) {
      notifyInvalidDateInput();
      setIsTimerStartBtnClicked(false);
      setIsTimerStarted(false);
      setIntervalTime(0);
      return;
    }

    const minutesLeft = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    if (minutesLeft > 59) {
      notifyError("minutes");
      setIsTimerStartBtnClicked(false);
      setIsTimerStarted(false);
      setIntervalTime(0);
      return;
    } else if (minutesLeft < 0) {
      notifyInvalidDateInput();
      setIsTimerStartBtnClicked(false);
      setIsTimerStarted(false);
      setIntervalTime(0);
      return;
    }

    const secondsLeft = Math.floor((remainingTime % (1000 * 60)) / 1000);
    if (secondsLeft > 59) {
      notifyError("seconds");
      setIsTimerStartBtnClicked(false);
      setIsTimerStarted(false);
      setIntervalTime(0);
      return;
    } else if (secondsLeft < 0) {
      notifyInvalidDateInput();
      setIsTimerStartBtnClicked(false);
      setIsTimerStarted(false);
      setIntervalTime(0);
      return;
    }

    setDaysRemaining(daysLeft);
    setHoursRemaining(hoursLeft);
    setMinutesRemaining(minutesLeft);
    setSecondsRemaining(secondsLeft);
    setIsTimerStarted(true);
    console.log(intervalTime);
  };

  const remainingTimeDataArray = [
    { elementName: "Day(s)", elementValue: daysRemaining, color: "green" },
    { elementName: "Hour(s)", elementValue: hoursRemaining, color: "blue" },
    {
      elementName: "Minute(s)",
      elementValue: minutesRemaining,
      color: "#f31260",
    },
    {
      elementName: "Second(s)",
      elementValue: secondsRemaining,
      color: "#0D9488",
    },
  ];

  return (
    <>
      {isTimerStarted ? <TimerStartInfo /> : ""}
      <div className="mx-auto flex justify-center items-center flex-wrap gap-10 transition-all animate__animated animate__backInLeft">
        {remainingTimeDataArray.map((remainingTimeData) => {
          return (
            <Card
              key={remainingTimeData.elementName}
              className={`bg-inherit shadow-none h-48 w-44 py-2 px-2`}
            >
              <CardBody className="text-center flex items-center justify-center">
                <h2
                  className={`text-6xl text-[${remainingTimeData.color}] font-medium`}
                >
                  {remainingTimeData.elementValue}
                </h2>
              </CardBody>
              <CardFooter className="flex items-center justify-center">
                <Chip
                  classNames={{
                    base: "p-4 border-0 ring-0 py-5 bg-white",
                    content: `text-[${remainingTimeData.color}] text-base font-medium`,
                  }}
                >
                  {remainingTimeData.elementName}
                </Chip>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      {isTimerStarted ? <TimerEndInfo /> : ""}
    </>
  );
};

export default Timer;
