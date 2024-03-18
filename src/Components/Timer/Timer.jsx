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
import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const [totalDays, setTotalDays] = useState(null);

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
              setTotalDays(daysLeft);
              setDaysRemaining(daysLeft);
              setHoursRemaining(hoursLeft);
              setMinutesRemaining(minutesLeft);
              setSecondsRemaining(secondsLeft);
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

  const progressDaysValue = (daysRemaining / totalDays) * 100;
  const progressHoursValue = (hoursRemaining / 24) * 100;
  const progressMinutesValue = (minutesRemaining / 60) * 100;
  const progressSecondsValue = (secondsRemaining / 60) * 100;

  return (
    <>
      <div className="mx-auto flex justify-center items-center flex-wrap gap-4">
        <Card className="bg-inherit shadow-none border-0">
          <CardBody className="justify-center items-center pb-0">
            <div className="relative">
              <CircularProgress
                aria-label="Day(s)"
                classNames={{
                  svg: "w-36 h-36 drop-shadow-md",
                  indicator: "stroke-danger",
                  track: "stroke-white",
                }}
                value={progressDaysValue}
                showValueLabel={false}
              />
              <h6 className="text-3xl font-semibold text-danger absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-40">
                {daysRemaining}
              </h6>
            </div>
          </CardBody>
          <CardFooter className="justify-center items-center pt-0">
            <Chip
              classNames={{
                base: "ring-1 bg-danger p-4 py-5 ring-[yellow]",
                content: "text-danger text-base text-white font-medium",
              }}
              variant="bordered"
            >
              Day(s)
            </Chip>
          </CardFooter>
        </Card>
        <strong className="text-3xl font-bold -mt-5">{`->`}</strong>
        <Card className="bg-inherit shadow-none border-0">
          <CardBody className="justify-center items-center pb-0">
            <div className="relative">
              <CircularProgress
                aria-label="Second(s)"
                classNames={{
                  svg: "w-36 h-36 drop-shadow-md",
                  indicator: "stroke-danger",
                  track: "stroke-white",
                }}
                value={progressHoursValue}
                showValueLabel={false}
              />
              <h6 className="text-3xl font-semibold text-danger absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-40">
                {hoursRemaining}
              </h6>
            </div>
          </CardBody>
          <CardFooter className="justify-center items-center pt-0">
            <Chip
              classNames={{
                base: "ring-1 bg-danger p-4 py-5 ring-[yellow]",
                content: "text-danger text-base text-white font-medium",
              }}
              variant="bordered"
            >
              Hour(s)
            </Chip>
          </CardFooter>
        </Card>
        <strong className="text-3xl font-bold -mt-5">{`->`}</strong>
        <Card className="bg-inherit shadow-none border-0">
          <CardBody className="justify-center items-center pb-0">
            <div className="relative">
              <CircularProgress
                aria-label="Second(s)"
                classNames={{
                  svg: "w-36 h-36 drop-shadow-md",
                  indicator: "stroke-danger",
                  track: "stroke-white",
                }}
                value={progressMinutesValue}
                showValueLabel={false}
              />
              <h6 className="text-3xl font-semibold text-danger absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-40">
                {minutesRemaining}
              </h6>
            </div>
          </CardBody>
          <CardFooter className="justify-center items-center pt-0">
            <Chip
              classNames={{
                base: "ring-1 bg-danger p-4 py-5 ring-[yellow]",
                content: "text-danger text-base text-white font-medium",
              }}
              variant="bordered"
            >
              Minute(s)
            </Chip>
          </CardFooter>
        </Card>
        <strong className="text-3xl font-bold -mt-5">{`->`}</strong>
        <Card className="bg-inherit shadow-none border-0">
          <CardBody className="justify-center items-center pb-0">
            <div className="relative">
              <CircularProgress
                aria-label="Second(s)"
                classNames={{
                  svg: "w-36 h-36 drop-shadow-md",
                  indicator: "stroke-danger",
                  track: "stroke-white",
                }}
                value={progressSecondsValue}
                showValueLabel={false}
              />
              <h6 className="text-3xl font-semibold text-danger absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-40">
                {secondsRemaining}
              </h6>
            </div>
          </CardBody>
          <CardFooter className="justify-center items-center pt-0">
            <Chip
              classNames={{
                base: "ring-1 bg-danger p-4 py-5 ring-[yellow]",
                content: "text-danger text-base text-white font-medium",
              }}
              variant="bordered"
            >
              Second(s)
            </Chip>
          </CardFooter>
        </Card>
        <ToastContainer
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  );
};

export default Timer;
