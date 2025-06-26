import { icons } from "@/app/utils/icons";
import classNames from "classnames";
import { totalmem } from "os";
import Select from "react-select";

interface PaginationProps {
   page: number;
   setPage: (page: number) => void;
   totalItems: number;
   itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = (props) => {
   const noOfPages = Math.ceil(props.totalItems / props.itemsPerPage);
   const options = Array(noOfPages)
      .fill(0)
      .map((a, i) => ({ value: i.toString(), label: i + 1 }));
   const selectionOption = options.find(
      (x) => x.value === props.page.toString()
   );
   return (
      <div className="flex items-center">
         <div
            className={classNames("mr-6 cursor-pointer", {
               "text-main-500": props.page !== 0,
               "text-gray-500": props.page === 0,
            })}
            onClick={() => {
               if (props.page === 0) return;
               props.setPage(props.page - 1);
            }}
         >
            {icons.arrowLeft}
         </div>
         <Select
            value={selectionOption}
            //@ts-ignore
            options={options}
            onChange={(newValue) => {
               console.log(newValue, "new value");
               //@ts-ignore
               props.setPage(newValue.value);
            }}
         ></Select>

         <div
            className={classNames("ml-6 cursor-pointer", {
               "text-main-500": props.page !== noOfPages - 1,
               "text-gray-500": props.page === noOfPages - 1,
            })}
            onClick={() => {
               if (props.page + 1 === noOfPages) return;
               props.setPage(props.page + 1);
            }}
         >
            {icons.arrowRight}
         </div>
      </div>
   );
};

export default Pagination;
