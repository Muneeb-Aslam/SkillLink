
const TableRow = ({
  item,
  headings,
  isLast,
  index,
  dataClass,
}: {
  item: any;
  headings: ITableHeadings[];
  isLast: boolean;
  index: number;
  dataClass?: string;
}) => {
    function getColumnComponent(heading: ITableHeadings, row: any) {
      const col = headings.filter((x) => x.name === heading.name)[0];
      return (
          col && (col.component ? col.component(row , index) : row[heading?.name])
      );
    }
  return (
    <tr className={`hover:bg-gray-50 transition-all duration-500 ease-in-out ${!isLast && "border-b"} border-lightestGray text-start`}>
      {
        headings.map((heading, index) => {
          return(
            <td className={`min-w-[5rem] px-3 py-4 text-sm text-dark-blue font-normal text-start ${dataClass} ${heading.customDataClass} transition-all duration-500 ease-in-out`} key={heading.name}>              
              {getColumnComponent(heading, item) || "N/A"}
            </td>
          )
        })
      }
    </tr>
  );
};

export default TableRow;