import DateTimePicker from "../DateTimePicker/DateTimePicker";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <div className="py-8 px-2 min-h-[100vh] bg-gradient-to-b from-[#f31260] to-[white]">
        <nav
          className={`flex justify-center flex-wrap items-center gap-x-4 gap-y-2 mb-24 ${styles.navHeading}`}
        >
          <h1 className="text-5xl leading-[3.75rem] text-center tracking-wide text-white font-bold">
            Countdown <span className="text-[yellow] text-[3.5rem]">Timer</span>
          </h1>
          <lord-icon
            src="https://cdn.lordicon.com/lzgqzxrq.json"
            trigger="loop"
            state="loop-oscillate"
            colors="primary:black,secondary:white,tertiary:black,quaternary:#f31260"
            style={{ width: "140px", height: "140px" }}
          ></lord-icon>
        </nav>
        <DateTimePicker />
      </div>
    </>
  );
};

export default Home;
