import classNames from "classnames";
import { icons } from "../utils/icons";

interface CheckboxProps {
   checked: boolean;
   onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
   return (
      <div
         className={classNames("border-2  rounded cursor-pointer", {
            "border-main-500": props.checked,
            "border-neutral-20": !props.checked,
         })}
         onClick={() => props.onChange(!props.checked)}
      >
         <div
            className={classNames(
               "flex items-center justify-center w-full h-full bg-main-500 scale-0 transition-all duration-75",
               { "scale-100": props.checked }
            )}
         >
            {icons.check}
         </div>
      </div>
   );
};

export default Checkbox;
