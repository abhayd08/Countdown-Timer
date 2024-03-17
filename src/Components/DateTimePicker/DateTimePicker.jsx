import styles from "./DateTimePicker.module.css";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

const DateTimePicker = () => {
  return (
    <form className="text-xl flex justify-center items-center flex-wrap gap-2">
      <div className="relative">
        <Input
          isRequired
          id="datetime-picker"
          type="datetime-local"
          className="max-w-[90vw] w-80"
        />
        <h6 className="absolute -top-8 text-[0.92rem] z-10 left-0">
          Select date and time
        </h6>
      </div>
      <Button
        type="submit"
        className="tracking-wide data-[hover]:opacity-100 hover:bg-[yellow] hover:text-danger transition-colors text-base w-28 font-semibold"
        color="danger"
      >
        Start
      </Button>
    </form>
  );
};

export default DateTimePicker;
