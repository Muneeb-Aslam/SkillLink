import React from "react";

interface NumberCardProps {
   label: string;
   value: number;
   icon: React.ReactNode;
   backgroundColor: string;
   textColor: string;
}

const NumberCard = ({
   label,
   value,
   icon,
   backgroundColor,
   textColor,
}: NumberCardProps) => {
   return (
      <li
         className="relative px-3 lg:px-6 w-72 py-4 lg:py-8 border border-secondary"
         style={{ backgroundColor: backgroundColor }}
      >
         <p className="text-dark-blue font-semibold font-Poppins">{label}</p>
         <p
            className="text-heading text-6xl mt-4 ml-2 font-semibold"
            style={{ color: textColor }}
         >
            {value}
         </p>
         <div className="absolute -bottom-2 right-0 p-2 rounded-full">
            {icon}
         </div>
      </li>
   );
};

export default NumberCard;
