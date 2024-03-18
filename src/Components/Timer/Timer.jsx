import styles from "./Timer.module.css";
import {
  CircularProgress,
  Card,
  CardBody,
  CardFooter,
  Chip,
} from "@nextui-org/react";
import React from "react";
import { useContext, useState } from "react";
import TimerContext from "../Contexts/TimerContext";
import { toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TimerStartInfo from "../DateTimeInfo/TimerStartInfo";
import TimerEndInfo from "../DateTimeInfo/TimerEndInfo";

const Timer = () => {
  const {
    isTimerStarted,
    targetDateTime,
    setTargetDateTime,
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
  } = useContext(TimerContext);

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

  React.useEffect(() => {
    if (isTimerStarted) {
      const daysLeft = Math.floor(
        timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24)
      );
      if (daysLeft > 99) {
        notifyError("days");
        setIsTimerStarted(false);
      } else if (daysLeft < 0) {
        notifyInvalidDateInput();
        setIsTimerStarted(false);
      } else {
        const hoursLeft = Math.floor(
          (timeDifferenceInMilliseconds % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );
        if (hoursLeft > 23) {
          notifyError("hours");
          setIsTimerStarted(false);
        } else if (hoursLeft < 0) {
          notifyInvalidDateInput();
          setIsTimerStarted(false);
        } else {
          const minutesLeft = Math.floor(
            (timeDifferenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
          );
          if (minutesLeft > 59) {
            notifyError("minutes");
            setIsTimerStarted(false);
          } else if (minutesLeft < 0) {
            notifyInvalidDateInput();
            setIsTimerStarted(false);
          } else {
            const secondsLeft = Math.floor(
              (timeDifferenceInMilliseconds % (1000 * 60)) / 1000
            );
            if (secondsLeft > 59) {
              notifyError("seconds");
              setIsTimerStarted(false);
            } else if (secondsLeft < 0) {
              notifyInvalidDateInput();
              setIsTimerStarted(false);
            } else {
              setDaysRemaining(daysLeft);
              setHoursRemaining(hoursLeft);
              setMinutesRemaining(minutesLeft);
              setSecondsRemaining(secondsLeft);
              toast.success("The countdown has started."),
                {
                  position: "top-center",
                  transition: successTransition,
                };
            }
          }
        }
      }
    }
  }, [isTimerStarted]);

  React.useEffect(() => {
    let timerInterval;
    if (isTimerStarted) {
      timerInterval = setInterval(() => {
        if (secondsRemaining > 0) {
          setSecondsRemaining((prevSeconds) => prevSeconds - 1);
        } else {
          if (minutesRemaining > 0) {
            setMinutesRemaining((prevMinutes) => prevMinutes - 1);
            setSecondsRemaining(59);
          } else {
            if (hoursRemaining > 0) {
              setHoursRemaining((prevHours) => prevHours - 1);
              setSecondsRemaining(59);
              setMinutesRemaining(59);
            } else {
              if (daysRemaining > 0) {
                setDaysRemaining((prevDays) => prevDays - 1);
                setHoursRemaining(23);
                setSecondsRemaining(59);
                setMinutesRemaining(59);
              } else {
                clearInterval(timerInterval);
                setIsTimerStarted(false);
                notifySuccess();
              }
            }
          }
        }
      }, 1000);

      return () => clearInterval(timerInterval);
    }

    if (isTimerCancelled) {
      clearInterval(timerInterval);
      setDaysRemaining(0);
      setHoursRemaining(0);
      setMinutesRemaining(0);
      setSecondsRemaining(0);
    }
  }, [
    isTimerStarted,
    secondsRemaining,
    minutesRemaining,
    hoursRemaining,
    daysRemaining,
    isTimerCancelled,
  ]);

  if (secondsRemaining !== 0 && String(secondsRemaining).length < 2) {
    const seconds = String(secondsRemaining).split("").unshift(0).join("");
    setSecondsRemaining(seconds);
  }

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
      <div className="mx-auto flex justify-center items-center flex-wrap gap-10">
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
