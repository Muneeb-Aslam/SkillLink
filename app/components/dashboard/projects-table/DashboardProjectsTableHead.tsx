import { ChevronDownIcon } from '../../icons';

const MilestonesTableHead = ({ headings = [], headingClass = "", headClass = "", sortingCriteria,  updateSortingCriteria } : 
{ headings: any[], headingClass?: string, headClass?: string, sortingCriteria: any[], updateSortingCriteria: (fieldName: string) => void }
) => {

  return (
    <thead className={`${headClass}`}>
        <tr>
            { headings.map((heading, index) => (
                <th
                    scope="col"
                    className={`px-2 py-4 text-sm text-secondary-background text-start font-inter font-medium ${headingClass} ${heading.customHeadingClass}`}
                    key={heading.name}
                >
                {!heading.sortable && <span>{heading.label}</span>}
                {/* Sorting icon for selected Tab(s) */}
                {heading.sortable && (
                    <button 
                        type="button"
                        className="hover:text-primary-light group outline-none whitespace-nowrap"
                        // Updating the sorting criteria
                        onClick={() => { updateSortingCriteria(heading.name.toLowerCase()) }}
                    >
                    <span>{heading.label}</span>
                    <span className={`ml-0.5 xl:ml-2`}>
                        <ChevronDownIcon className={`inline opacity-0 group-hover:opacity-100 text-primary-light ${sortingCriteria.find((criteria) => criteria.fieldName === heading.name.toLowerCase())?.type === 'desc' ? 'rotate-180' : ''} transition-all duration-300`}/>
                    </span>
                    </button>
                )}
                </th>
            ))}
        </tr>
    </thead>
    )
}

export default MilestonesTableHead;