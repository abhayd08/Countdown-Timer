import DateTimePicker from "../DateTimePicker/DateTimePicker";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <div className="py-8 min-h-[100vh] bg-gradient-to-b from-[#f31260] to-[white]">
        <nav
          className={`flex justify-center items-center gap-4 mb-24 ${styles.navHeading}`}
        >
          <h1 className="text-5xl text-center tracking-wide text-white font-bold">
            Countdown <span className="text-[yellow] text-[3.5rem]">Timer</span>
          </h1>
          <lord-icon
            src="https://cdn.lordicon.com/lzgqzxrq.json"
            trigger="loop"
            state="loop-oscillate"
            colors="primary:black,secondary:white,tertiary:black,quaternary:#f31260"
            style={{ width: "150px", height: "150px" }}
          ></lord-icon>
        </nav>
        <DateTimePicker />
      </div>
    </>
  );
};

export default Home;
