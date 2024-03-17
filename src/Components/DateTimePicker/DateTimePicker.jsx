import styles from "./DateTimePicker.module.css";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

const DateTimePicker = () => {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={`text-xl flex justify-center items-center flex-wrap gap-2 ${styles.form}`}
    >
      <div className="relative">
        <input
          required
          id="datetime-picker"
          type="datetime-local"
          className="max-w-[90vw] w-80 h-[2.65rem] text-[0.92rem] hover:bg-gray-200 rounded-lg p-3 focus:outline-0 focus:ring-2 focus:ring-danger"
        />
        <h6 className="absolute -top-8 text-[0.92rem] z-10 left-0">
          Select date and time
        </h6>
      </div>
      <Button
        type="submit"
        className="tracking-wide h-[2.65rem] rounded-lg data-[hover]:opacity-100 hover:bg-[yellow] hover:text-danger transition-colors text-base w-28 font-semibold"
        color="danger"
      >
        Start
      </Button>
    </form>
  );
};

export default DateTimePicker;
