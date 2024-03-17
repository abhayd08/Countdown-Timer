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

const Timer = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [daysRemaining, setDaysRemaining] = useState(0);
  const [hoursRemaining, setHoursRemaining] = useState(0);
  const [minutesRemaining, setMinutesRemaining] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  const {
    isTimerStarted,
    targetDateTime,
    setTargetDateTime,
    timeDifferenceInMilliseconds,
  } = useContext(TimerContext);

  React.useEffect(() => {
    if (isTimerStarted) {
      setDays(Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor(
          (timeDifferenceInMilliseconds % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        )
      );
      setMinutes(
        Math.floor(
          (timeDifferenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
        )
      );
      setSeconds(
        Math.floor((timeDifferenceInMilliseconds % (1000 * 60)) / 1000)
      );
    }
  }, [isTimerStarted]);

  const progressDaysValue = (daysRemaining / days) * 100;
  const progressHoursValue = (hoursRemaining / hours) * 100;
  const progressMinutesValue = (minutesRemaining / minutes) * 100;
  const progressSecondsValue = (secondsRemaining / seconds) * 100;

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
                {days}
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
                {hours}
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
                {minutes}
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
                {seconds}
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
      </div>
    </>
  );
};

export default Timer;
