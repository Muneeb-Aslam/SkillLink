import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ totalCount = 0, pageSize = 1, currentPage = 1, onPageChange = (page: number) => {}, containerClass = "" }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const noOfPages = Math.ceil(totalCount/pageSize);

  const onPageChangeHandler = (page: number) => {
    current.delete("page");
    current.set("page", page.toString());
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
    onPageChange(page);
  }

  const previousPageHandler = () => {
    if (currentPage > 1) {
      current.delete("page");    
      current.set("page", (currentPage-1).toString());
      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`);
      onPageChange(currentPage-1);
    }
  }
  const nextPageHandler = () => {
    if (currentPage < noOfPages) {
      current.delete("page");
      current.set("page", (currentPage+1).toString());
      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`);
      onPageChange(currentPage+1);
    }
    
  }

  return (
    <div className={`flex bg-white items-center justify-between absolute bottom-0 w-full px-6 py-3 border-t ${containerClass}  border-gray-200 rounded-b-lg`}>
      <button 
        type="button" 
        className={`flex border rounded-lg items-center px-3 py-2 text-sm font-medium ${noOfPages < 2 && "hidden"} ${currentPage === 1 ? 'text-[#98A2B3] hover:cursor-not-allowed' : ' text-primary hover:border-gray-300 hover:text-gray-700'}`}
        onClick={previousPageHandler}
        disabled={currentPage === 1}
        data-testid="pagination-previous-button"
      >
        {/* <ArrowSmallLeftIcon
          className={`mr-2 h-5 w-5 scale-150 ${currentPage === 1 ? 'text-[#98A2B3]' : 'text-primary'} `}
          aria-hidden="true"
        /> */}
        Arrow left icon
        Previous
      </button>
      <div className="hidden md:-mt-px md:flex gap-4 mx-auto">
        {
          [...Array(noOfPages)].map((_, i) => (
            <button 
              key={i} 
              type="button" 
              className={`flex items-center justify-center ${currentPage === i+1 ? 'bg-gray-50' : 'hover:bg-gray-200'} px-4 py-3 rounded-lg text-sm font-medium text-primary `}
              onClick={() => onPageChangeHandler(i+1)}
              data-testid="pagination-page-number-button"
            >
              {i+1}
            </button>
          ))
        }
      </div>
      <button 
        type="button" 
        className={`flex border rounded-lg items-center px-3 py-2 text-sm font-medium ${noOfPages < 2 && "hidden"} ${currentPage === noOfPages ? 'text-[#98A2B3] hover:cursor-not-allowed' : 'text-primary hover:border-gray-300 hover:text-gray-700'}`}
        onClick={nextPageHandler}
        disabled={currentPage === noOfPages}
        data-testid="pagination-next-button"
      >
        Next
        {/* <ArrowSmallRightIcon
          className={`ml-2 h-5 w-5 scale-150 ${currentPage === noOfPages ? 'text-[#98A2B3]' : 'text-primary'}`}
          aria-hidden="true"
        /> */}
        Arrow right icon
      </button>
    </div>
);
}