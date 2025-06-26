import { icons } from "@/app/utils/icons";

interface MainSearchProps {
   value: string;
   onChange: (val: string) => void;
   onSearch: () => void;
}

const MainSearch: React.FC<MainSearchProps> = ({ value, onChange }) => {
   return (
      <div className="flex flex-col mx-48">
         <div className="grid grid-cols-[min-content_auto]  gap-5  p-6 bg-white">
            <div className="mt-1">{icons.search}</div>
            <input
               placeholder="Project keywords or Skills"
               className=" outline-none border-b pb-4 border-b-gray-border "
               value={value}
               onChange={(e) => onChange(e.target.value)}
            ></input>
            {/* <div className="py-3 px-6 bg-main-500 text-white font-Epilogue font-bold">
               Search
            </div> */}
         </div>

         <div className="text-neutral-80 font-Epilogue mt-4 mb-10">
            <b>Popular: </b>
            UI Designer, UX Researcher, Android, Admin
         </div>
      </div>
   );
};

export default MainSearch;
