import { Hourglass } from "react-loader-spinner";
export function Loader() {
   return (
      <div className="flex items-center w-full h-screen">
         <Hourglass
            colors={["rgba(4, 173, 230, 1)", "rgba(4, 173, 230, 0.25)"]}
         ></Hourglass>
      </div>
   );
}
