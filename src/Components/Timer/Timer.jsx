import { Card, CardBody, CardFooter, Chip } from "@nextui-org/react";
import { useContext, useRef, useEffect, useState } from "react";
import TimerContext from "../Contexts/TimerContext";
import { toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TimerStartInfo from "../DateTimeInfo/TimerStartInfo";
import TimerEndInfo from "../DateTimeInfo/TimerEndInfo";
import { usePageVisibility } from "react-page-visibility";
import successSound from "/assets/success.mp3";
import { motion } from "framer-motion";

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

  const [audio] = useState(new Audio(successSound));

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
    toast.success("The countdown is over. What's next on your adventure?", {
      transition: successTransition,
      position: "top-right",
    });
  };

  const startTime = performance.now();
  const currentTime = performance.now();
  const elapsed = currentTime - startTime;
  const remainingTime = timeDifferenceInMilliseconds - elapsed;

  const [updateAnimation, setUpdateAnimation] = useState(true);

  useEffect(() => {
    if (
      isTimerStartBtnClicked &&
      !isHidden &&
      handleSubmissionError(remainingTime)
    ) {
      setUpdateAnimation(false);
      const startTime = performance.now();
      timerRef.current = setInterval(() => {
        const currentTime = performance.now();
        const elapsed = currentTime - startTime;
        const remainingTime = timeDifferenceInMilliseconds - elapsed;
        updateTimerValues(remainingTime);
      }, 1000);

      const successTimer = setTimeout(() => {
        toast.success("The coundown has started!", {
          transition: successTransition,
          position: "top-right",
        });
        setUpdateAnimation(true);
        document.getElementById("clock").setAttribute("trigger", "loop");
      }, 1000);

      return () => {
        clearInterval(timerRef.current);
        clearTimeout(successTimer);
      };
    }
    
    if (isTimerCancelled) {
      setUpdateAnimation(false);
      clearInterval(timerRef.current);
      document.getElementById("clock").removeAttribute("trigger");
      setDaysRemaining(0);
      setHoursRemaining(0);
      setMinutesRemaining(0);
      setSecondsRemaining(0);
      const timer = setTimeout(() => {
        setUpdateAnimation(true);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isTimerStartBtnClicked, isHidden, isTimerCancelled]);

  const handleSubmissionError = (remainingTime) => {
    const daysLeft = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesLeft = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const secondsLeft = Math.floor((remainingTime % (1000 * 60)) / 1000);

    if (daysLeft > 99) {
      setTimeout(() => {
        notifyError("days");
      }, 1000);
      setIsTimerStartBtnClicked(false);
      setIsTimerStarted(false);
      return false;
    } else if (daysLeft < 0) {
      setTimeout(() => {
        notifyInvalidDateInput();
      }, 1000);
      setIsTimerStartBtnClicked(false);
      setIsTimerStarted(false);
      return false;
    }

    if (hoursLeft > 23) {
      setTimeout(() => {
        notifyError("hours");
      }, 1000);
      setIsTimerStartBtnClicked(false);
      setIsTimerStarted(false);
      return false;
    } else if (hoursLeft < 0) {
      setTimeout(() => {
        notifyInvalidDateInput();
      }, 1000);
      setIsTimerStartBtnClicked(false);
      setIsTimerStarted(false);
      return false;
    }

    if (minutesLeft > 59) {
      setTimeout(() => {
        notifyError("minutes");
      }, 1000);
      setIsTimerStartBtnClicked(false);
      setIsTimerStarted(false);
      return false;
    } else if (minutesLeft < 0) {
      setTimeout(() => {
        notifyInvalidDateInput();
      }, 1000);
      setIsTimerStartBtnClicked(false);
      setIsTimerStarted(false);
      return false;
    }

    if (secondsLeft > 59) {
      setTimeout(() => {
        notifyError("seconds");
      }, 1000);
      setIsTimerStartBtnClicked(false);
      setIsTimerStarted(false);
      return false;
    } else if (secondsLeft < 0) {
      setTimeout(() => {
        notifyInvalidDateInput();
      }, 1000);
      setIsTimerStartBtnClicked(false);
      setIsTimerStarted(false);
      return false;
    }

    return true;
  };

  const updateTimerValues = (remainingTime) => {
    if (remainingTime <= 0) {
      notifySuccess();
      audio.play();
      setUpdateAnimation(false);
      setIsTimerStartBtnClicked(false);
      setIsTimerStarted(false);
      clearInterval(timerRef.current);
      document.getElementById("clock").removeAttribute("trigger");
      const timer = setTimeout(() => {
        setUpdateAnimation(true);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    } else {
      const daysLeft = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor(
        (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutesLeft = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const secondsLeft = Math.floor((remainingTime % (1000 * 60)) / 1000);

      setDaysRemaining(daysLeft);
      setHoursRemaining(hoursLeft);
      setMinutesRemaining(minutesLeft);
      setSecondsRemaining(secondsLeft);
      setIsTimerStarted(true);
    }
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
      <TimerStartInfo />
      <div className="mx-auto flex justify-center items-center flex-wrap gap-10 transition-all animate__animated animate__pulse">
        {remainingTimeDataArray.map((remainingTimeData) => {
          return (
            <Card
              key={remainingTimeData.elementName}
              className={`bg-inherit shadow-none h-48 w-44 py-2 px-2`}
            >
              <CardBody className="text-center flex items-center justify-center">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={
                    updateAnimation
                      ? { opacity: 1, rotateY: 0 }
                      : { rotateY: 90 }
                  }
                  transition={{ duration: 0.7, delay: 0.05 }}
                  className={`text-6xl font-medium`}
                  style={{ color: remainingTimeData.color }}
                >
                  {remainingTimeData.elementValue}
                </motion.h2>
              </CardBody>
              <CardFooter className="flex items-center justify-center">
                <Chip
                  style={{ color: remainingTimeData.color }}
                  classNames={{
                    base: "p-4 border-0 ring-0 py-5 bg-white",
                    content: "text-base font-medium",
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
