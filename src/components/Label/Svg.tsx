import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface SvgrWithLabelProps {
  label: string | JSX.Element;
  SvgrComponent: React.ReactElement;

  /** Additional Class name tailwind styles like top | right | bottom | left */
  labelClassName?: string;

  /** Additional Class name tailwind styles for svgr container */
  svgrContainerClassName?: string;
}

const SvgrWithLabel = ({
  SvgrComponent,
  label,
  labelClassName,
  svgrContainerClassName,
}: SvgrWithLabelProps) => {
  const [hover, setHover] = useState(false);

  const mergedLabelClassName = twMerge(
    `text-white-0 absolute flex items-center justify-center rounded-lg p2 `,
    labelClassName
  );

  return (
    <div
      className={`relative flex flex-row items-center ${svgrContainerClassName}`}
    >
      <div
        className={`flex justify-center items-center	`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {SvgrComponent}
      </div>
      {hover ? (
        <div className={`${mergedLabelClassName} bg-black-900`}>{label}</div>
      ) : null}
    </div>
  );
};

export default SvgrWithLabel;
