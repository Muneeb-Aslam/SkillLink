
const DataContainer = ({ children, className = "" } : { children: React.ReactNode, className?: string }) => {
  return (
    <td className={`w-fit px-2 py-3.5 text-xs lg:text-xs xl:text-sm whitespace-nowrap text-white align-top text-center sm:text-start ${className}`}>
      {children}
    </td>
  )
}

export default DataContainer;