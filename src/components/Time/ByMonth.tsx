import { useEffect, useState } from "react";

export const TimeDisplayByMonth = ({ timestamp }: { timestamp: number }) => {
  const calculateTimeLeft = () => {
    const difference = timestamp * 1000 - new Date().getTime();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="flex flex-row gap-[4px]">
      <div className="flex flex-col items-center justify-center">
        <div className="rounded-[8px] time-box w-[48px] h-[48px] flex items-center justify-center font-Lato700 text-[18px] leading-[24px] ">
          {timeLeft.days ? String(timeLeft.days).padStart(2, "0") : "00"}
        </div>
        <span className="leading-[14.4px] text-[12px] mt-[4px]">Day</span>
      </div>
      <span className="mt-[12px]">:</span>
      <div className="flex flex-col items-center justify-center">
        <div className="rounded-[8px] time-box w-[48px] h-[48px] flex items-center justify-center font-Lato700 text-[18px] leading-[24px] ">
          {timeLeft.hours ? String(timeLeft.hours).padStart(2, "0") : "00"}
        </div>
        <span className="leading-[14.4px] text-[12px] mt-[4px]">Hours</span>
      </div>
      <span className="mt-[12px]">:</span>
      <div className="flex flex-col items-center justify-center">
        <div className="rounded-[8px] time-box w-[48px] h-[48px] flex items-center justify-center font-Lato700 text-[18px] leading-[24px] ">
          {timeLeft.minutes ? String(timeLeft.minutes).padStart(2, "0") : "00"}
        </div>
        <span className="leading-[14.4px] text-[12px] mt-[4px]">Minutes</span>
      </div>
      <span className="mt-[12px]">:</span>
      <div className="flex flex-col items-center justify-center">
        <div className="rounded-[8px] time-box w-[48px] h-[48px] flex items-center justify-center font-Lato700 text-[18px] leading-[24px] ">
          {timeLeft.seconds ? String(timeLeft.seconds).padStart(2, "0") : "00"}
        </div>
        <span className="leading-[14.4px] text-[12px] mt-[4px]">Second</span>
      </div>
    </div>
    // <div className="flex flex-row gap-[4px]">
    //   <div className="flex flex-col items-center justify-center">
    //     <div className="rounded-[8px] time-box w-[48px] h-[48px] flex items-center justify-center font-Lato700 text-[18px] leading-[24px]">
    //       {timeLeft.hours ? String(timeLeft.hours).padStart(2, "0") : "00"}
    //     </div>
    //     <span className="leading-[14.4px] text-[12px] mt-[4px]">Hours</span>
    //   </div>
    //   <span className="mt-[12px]">:</span>
    //   <div className="flex flex-col items-center justify-center">
    //     <div className="rounded-[8px] time-box w-[48px] h-[48px] flex items-center justify-center font-Lato700 text-[18px] leading-[24px]">
    //       {timeLeft.minutes ? String(timeLeft.minutes).padStart(2, "0") : "00"}
    //     </div>
    //     <span className="leading-[14.4px] text-[12px] mt-[4px]">Minutes</span>
    //   </div>
    //   <span className="mt-[12px]">:</span>
    //   <div className="flex flex-col items-center justify-center">
    //     <div className="rounded-[8px] time-box w-[48px] h-[48px] flex items-center justify-center font-Lato700 text-[18px] leading-[24px]">
    //       {timeLeft.seconds ? String(timeLeft.seconds).padStart(2, "0") : "00"}
    //     </div>
    //     <span className="leading-[14.4px] text-[12px] mt-[4px]">Seconds</span>
    //   </div>
    // </div>
  );
};
