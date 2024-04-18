import { useState } from "react";

const ToggleComponent = ({
  setIsBurnAllowed,
}: {
  setIsBurnAllowed: (isBurnAllowed: boolean) => void;
}) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    setIsBurnAllowed(!isToggled);
  };

  return (
    <div>
      <h2>Allow Burn?</h2>
      <button
        className="wallet-adapter-button-trigger w-[106px] h-[32px] text-[#583C00] font-Lato700 leading-[19px] text-[12px] cursor-pointer"
        onClick={handleToggle}
      >
        {isToggled ? "YES" : "NO"}
      </button>
    </div>
  );
};

export default ToggleComponent;
