export const DocumentIcon = ({ className } : { className? : string }) => {
    return (
        <svg width="102" height="56" viewBox="0 0 102 79" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <g opacity="0.3">
                <path fillRule="evenodd" clip-rule="evenodd" d="M30.0096 16.9719C28.889 16.9719 27.8142 17.4171 27.0218 18.2095C26.2293 19.0019 25.7842 20.0767 25.7842 21.1974V80.3538C25.7842 81.4744 26.2293 82.5492 27.0218 83.3416C27.8142 84.134 28.889 84.5792 30.0096 84.5792H72.2642C73.3848 84.5792 74.4596 84.134 75.252 83.3416C76.0445 82.5492 76.4896 81.4744 76.4896 80.3538L76.4897 39.8494L53.6126 16.9724L30.0096 16.9719ZM21.0461 12.2338C23.4234 9.85654 26.6476 8.521 30.0096 8.521H53.613C55.854 8.52147 58.0038 9.41198 59.5883 10.9967M59.5883 10.9967L82.4644 33.8728C82.4643 33.8727 82.4646 33.873 82.4644 33.8728C84.0491 35.4573 84.9401 37.6067 84.9406 39.8476V80.3538C84.9406 83.7157 83.605 86.94 81.2277 89.3173C78.8505 91.6946 75.6262 93.0301 72.2642 93.0301H30.0096C26.6476 93.0301 23.4234 91.6946 21.0461 89.3173C18.6688 86.94 17.3333 83.7157 17.3333 80.3538V21.1974C17.3333 17.8354 18.6688 14.6111 21.0461 12.2338M34.2351 50.7756C34.2351 48.4419 36.1269 46.5501 38.4605 46.5501H63.8133C66.1469 46.5501 68.0387 48.4419 68.0387 50.7756C68.0387 53.1092 66.1469 55.001 63.8133 55.001H38.4605C36.1269 55.001 34.2351 53.1092 34.2351 50.7756ZM34.2351 67.6774C34.2351 65.3437 36.1269 63.4519 38.4605 63.4519H63.8133C66.1469 63.4519 68.0387 65.3437 68.0387 67.6774C68.0387 70.011 66.1469 71.9028 63.8133 71.9028H38.4605C36.1269 71.9028 34.2351 70.011 34.2351 67.6774Z" 
                    fill="#515B6F"
                />
                <rect x="34.2351" y="46.5503" width="33.8037" height="8.45091" rx="4.22546" fill="#26A4FF"/>
                <rect x="34.2351" y="63.4521" width="33.8037" height="8.45091" rx="4.22546" fill="#26A4FF"/>
            </g>
        </svg>

    )
};

export const ThreeDotIcon = ({ onClick, className } : { onClick? : () => void, className? : string }) => {
    return (
        <button type="button" title="More" onClick={onClick}>
            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg" className={`text-[#25324B] ${className}`}>
                <g clip-path="url(#clip0_53_1002)">
                    <path d="M6.51226 15.36C7.14871 15.36 7.66466 14.844 7.66466 14.2076C7.66466 13.5711 7.14871 13.0552 6.51226 13.0552C5.87581 13.0552 5.35986 13.5711 5.35986 14.2076C5.35986 14.844 5.87581 15.36 6.51226 15.36Z" 
                        stroke="currentColor" strokeWidth="2.30479" strokeLinecap="round" strokeLinejoin="round"
                    />
                    <path d="M14.5789 15.36C15.2154 15.36 15.7313 14.844 15.7313 14.2076C15.7313 13.5711 15.2154 13.0552 14.5789 13.0552C13.9425 13.0552 13.4265 13.5711 13.4265 14.2076C13.4265 14.844 13.9425 15.36 14.5789 15.36Z" 
                        stroke="currentColor" strokeWidth="2.30479" strokeLinecap="round" strokeLinejoin="round"
                    />
                    <path d="M22.6458 15.36C23.2823 15.36 23.7982 14.844 23.7982 14.2076C23.7982 13.5711 23.2823 13.0552 22.6458 13.0552C22.0094 13.0552 21.4934 13.5711 21.4934 14.2076C21.4934 14.844 22.0094 15.36 22.6458 15.36Z" 
                        stroke="currentColor" strokeWidth="2.30479" strokeLinecap="round" strokeLinejoin="round"
                    />
                </g>
            <defs>
                <clipPath id="clip0_53_1002">
                    <rect width="27.6575" height="27.6575" fill="white" transform="translate(0.750244 0.378906)"/>
                </clipPath>
                </defs>
            </svg>
        </button>
    )
};

export const QuestionMarkDocumentIcon = ({ className } : { className? : string }) => {
    return (
        <svg width="102" height="56" viewBox="0 0 102 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={`text-[#12B347] ${className}`}>
            <g opacity="0.3">
                <path d="M92.7859 59.6279L87.4483 53.4747C91.2954 48.662 93.3915 42.7117 93.3915 36.4917C93.3915 21.4747 81.1743 9.25732 66.1571 9.25732C51.1399 9.25732 38.9227 21.4747 38.9227 36.4917C38.9227 37.4954 38.979 38.4861 39.0853 39.4619C38.1009 39.3548 37.1097 39.2977 36.1168 39.2977C21.0997 39.2977 8.88237 51.515 8.88237 66.5321C8.88237 72.7521 10.9784 78.7022 14.8256 83.5151L9.48796 89.6683C8.85266 90.4008 8.70328 91.4365 9.10585 92.3186C9.50843 93.2005 10.3887 93.7665 11.3582 93.7665H36.1168C51.1338 93.7665 63.3511 81.5491 63.3511 66.5321C63.3511 65.5391 63.294 64.5479 63.1869 63.5635C64.1627 63.6698 65.1534 63.7261 66.1571 63.7261H90.9156C91.8852 63.7261 92.7656 63.1601 93.168 62.2782C93.5706 61.3962 93.4212 60.3604 92.7859 59.6279ZM36.1168 88.8148H16.7835L19.9732 85.1378C20.8064 84.1773 20.7765 82.7416 19.904 81.8167C15.9899 77.6663 13.8341 72.2381 13.8341 66.5321C13.8341 54.2454 23.8301 44.2494 36.1168 44.2494C37.4758 44.2494 38.8306 44.3732 40.1608 44.6171C42.8212 53.1108 49.538 59.8276 58.0317 62.488C58.2756 63.8182 58.3994 65.173 58.3994 66.5321C58.3994 78.8189 48.4036 88.8148 36.1168 88.8148ZM66.1571 58.7744C53.8704 58.7744 43.8744 48.7784 43.8744 36.4917C43.8744 24.205 53.8704 14.209 66.1571 14.209C78.4438 14.209 88.4398 24.205 88.4398 36.4917C88.4398 42.1977 86.284 47.626 82.3698 51.7763C81.4973 52.7013 81.4675 54.137 82.3007 55.0974L85.4904 58.7744H66.1571Z" 
                    fill="#515B6F" stroke="#515B6F" strokeWidth="2.30479"
                />
                <path d="M66.158 53.3277C67.5254 53.3277 68.6338 52.2192 68.6338 50.8518C68.6338 49.4845 67.5254 48.376 66.158 48.376C64.7906 48.376 63.6821 49.4845 63.6821 50.8518C63.6821 52.2192 64.7906 53.3277 66.158 53.3277Z" 
                    fill="currentColor" stroke="currentColor" strokeWidth="0.769915"
                />
                <path d="M66.3527 19.4932C61.5481 19.3947 57.4149 22.9109 56.7509 27.6683C56.6901 28.1034 56.6594 28.5479 56.6594 28.9899C56.6594 30.3573 57.7679 31.4658 59.1353 31.4658C60.5026 31.4658 61.6111 30.3573 61.6111 28.9899C61.6111 28.776 61.6258 28.5615 61.655 28.3527C61.9682 26.1085 63.8962 24.443 66.1599 24.443C66.191 24.443 66.2218 24.4433 66.253 24.4439C68.6231 24.4916 70.5759 26.3807 70.6985 28.7447C70.764 30.0072 70.3225 31.2055 69.4553 32.1189C68.5873 33.0332 67.4162 33.5368 66.158 33.5368C64.7906 33.5368 63.6821 34.6453 63.6821 36.0126V43.3562C63.6821 44.7235 64.7906 45.832 66.158 45.832C67.5253 45.832 68.6338 44.7235 68.6338 43.3562V38.1569C70.3029 37.7036 71.8399 36.799 73.0461 35.5283C74.8578 33.6203 75.7801 31.12 75.6435 28.488C75.387 23.5441 71.3059 19.5931 66.3527 19.4932Z" 
                    fill="currentColor" stroke="currentColor" strokeWidth="0.769915"
                />
                <path d="M44.3702 59.105H27.8645C26.4972 59.105 25.3887 60.2135 25.3887 61.5808C25.3887 62.9482 26.4972 64.0567 27.8645 64.0567H44.3702C45.7375 64.0567 46.8461 62.9482 46.8461 61.5808C46.8461 60.2135 45.7375 59.105 44.3702 59.105Z" 
                    fill="currentColor" stroke="currentColor" strokeWidth="0.769915"
                />
                <path d="M44.3702 69.0083H27.8645C26.4972 69.0083 25.3887 70.1168 25.3887 71.4842C25.3887 72.8515 26.4972 73.96 27.8645 73.96H44.3702C45.7375 73.96 46.8461 72.8515 46.8461 71.4842C46.8461 70.1168 45.7375 69.0083 44.3702 69.0083Z" 
                    fill="currentColor" stroke="currentColor" strokeWidth="0.769915"
                />
            </g>
        </svg>

    )
};

export const SaasIcon = ({ className } : { className? : string }) => {
    return (
        <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg" className={` ${className}`}>
            <g clip-path="url(#clip0_53_979)">
                <path fillRule="evenodd" clip-rule="evenodd" d="M9.81152 20.4902V53.27L37.967 70.1984L38.6205 69.146L37.967 37.3321L10.7796 20.5097L9.81152 20.4902Z" 
                    fill="#449B82"
                />
                <path fillRule="evenodd" clip-rule="evenodd" d="M65.818 20.3364V53.578L37.967 70.1987V37.3323L64.7979 20.3614L65.818 20.3364Z" 
                    fill="#9BDB9C"
                />
                <path fillRule="evenodd" clip-rule="evenodd" d="M37.8148 4.02295L65.818 20.3359L37.967 37.8802L9.81152 20.4899L37.8148 4.02295Z" 
                    fill="#56CDAD"
                />
                <path fillRule="evenodd" clip-rule="evenodd" d="M51.8802 17.0962L42.4089 22.7023V34.0175L32.9193 28.3194L23.7944 33.7206V57.371L33.2657 51.4976V38.7672L43.3816 45.2248L51.8802 39.9548V17.0962Z" 
                    fill="white"
                />
            </g>
            <defs>
                <clipPath id="clip0_53_979">
                    <rect width="56.0065" height="66.3781" fill="white" transform="translate(9.81152 4.01855)"/>
                </clipPath>
            </defs>
        </svg>
    )
};

export const AssistantIcon = ({ className } : { className? : string }) => {
    return (
        <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <mask id="mask0_53_1009" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="75" height="75">
                <circle cx="37.469" cy="37.2761" r="36.8767" fill="#C4C4C4"/>
            </mask>
            <g mask="url(#mask0_53_1009)">
                <rect x="0.592285" y="0.399414" width="73.7534" height="73.7534" fill="url(#pattern0_53_1009)"/>
            </g>
            <defs>
                <pattern id="pattern0_53_1009" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image0_53_1009" transform="scale(0.0025)"/>
                </pattern>
                <image id="image0_53_1009" width="400" height="400" xlinkHref="data:image/png;base64,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"/>
            </defs>
        </svg>
    )
};

export const DoubleSheetIcon = ({ className }: { className?: string }) => {
    return (
        <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_53_1034)">
                <path fillRule="evenodd" clip-rule="evenodd" d="M18.1086 61.4536L37.9219 66.8464L37.9451 22.2639L18.1319 16.8711L18.1086 61.4536Z" 
                    fill="#FF6550"
                />
                <path fillRule="evenodd" clip-rule="evenodd" d="M50.9177 13.98L28.3752 7.84375V15.9625L41.4176 19.5145L41.406 50.4083L50.9061 52.9926C54.1696 53.8777 56.8175 51.4114 56.8292 47.4818L56.8408 22.7242C56.8292 18.7829 54.1812 14.8769 50.9177 13.98Z" 
                    fill="#FF6550"
                />
            </g>
            <defs>
                <clipPath id="clip0_53_1034">
                <rect width="38.7205" height="59.0027" fill="white" transform="translate(18.1086 7.84375)"/>
                </clipPath>
            </defs>
        </svg>
    )
};

export const ChevronDownIcon = ({ className } : { className?: string }) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={`text-[#98A2B3] ${className}`}>
        <path d="M14.25 6.75L9 12L3.75 6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export function TableSpinner({ rowClass, dataClass, colSpan} : { rowClass: string, dataClass: string, colSpan: number }) {
    return (
        <tr className={`absolute w-full flex items-center justify-center overflow-visible h-96 ${rowClass}`}>
            <td className={`${dataClass}`} colSpan={colSpan}>
                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                <span className="sr-only">Loading...</span>
            </td>
        </tr>
    )
}

export function DataSpinner({ className, containerClass } : { className?: string, containerClass?: string }) {
    return (
        <div className={`flex items-center justify-center ${containerClass}`}>
            <svg aria-hidden="true" className={`w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-brand ${className}`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export function FilterIcon ({ className }: { className?: string }) {
    return (
        <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_53_1250)">
                <path d="M4.90576 7.09814H23.4275" stroke="#25324B" strokeWidth="2.31522" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.22095 14.0435H21.1123" stroke="#25324B" strokeWidth="2.31522" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.53638 20.9893H18.7972" stroke="#25324B" strokeWidth="2.31522" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_53_1250">
                    <rect width="27.7826" height="27.7826" fill="white" transform="translate(0.275391 0.152344)"/>
                </clipPath>
            </defs>
        </svg>

    )
}

export const PDFIcon = ({ className }: { className?: string }) => (
        <svg width="30" height="36" viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={`text-white ${className}`}>
        <path d="M20.5543 0H6.09526C3.98293 0 2.26372 1.7204 2.26372 3.83154V17.9999H1.88949C1.03694 17.9999 0.34552 18.6907 0.34552 19.544V28.9075C0.34552 29.7607 1.03686 30.4514 1.88949 30.4514H2.26372V32.1684C2.26372 34.2818 3.98293 35.9999 6.09526 35.9999H25.824C27.935 35.9999 29.6545 34.2818 29.6545 32.1684V9.06824L20.5543 0ZM4.39599 21.2338C4.84847 21.1573 5.48448 21.0997 6.38056 21.0997C7.28613 21.0997 7.93155 21.2725 8.36522 21.6197C8.77947 21.9469 9.05902 22.487 9.05902 23.1225C9.05902 23.758 8.84719 24.2982 8.46176 24.6641C7.96045 25.136 7.21908 25.3478 6.35182 25.3478C6.1588 25.3478 5.9858 25.3383 5.8505 25.3195V27.6414H4.39599V21.2338ZM25.824 33.6534H6.09526C5.27736 33.6534 4.61133 32.9874 4.61133 32.1684V30.4514H23.0026C23.8553 30.4514 24.5466 29.7607 24.5466 28.9075V19.544C24.5466 18.6907 23.8553 17.9999 23.0026 17.9999H4.61133V3.83154C4.61133 3.01483 5.27743 2.3488 6.09526 2.3488L19.6765 2.33462V7.35471C19.6765 8.82102 20.8662 10.0119 22.3336 10.0119L27.2514 9.99778L27.3067 32.1683C27.3067 32.9874 26.6419 33.6534 25.824 33.6534ZM9.99692 27.612V21.2338C10.5364 21.1479 11.2395 21.0997 11.9816 21.0997C13.2148 21.0997 14.0145 21.3209 14.6411 21.7927C15.3154 22.294 15.739 23.0931 15.739 24.2404C15.739 25.4831 15.2865 26.341 14.6598 26.8705C13.9761 27.4388 12.9353 27.7084 11.6638 27.7084C10.9023 27.7084 10.3629 27.6601 9.99692 27.612ZM20.5121 23.8357V25.0301H18.1802V27.6414H16.7063V21.1479H20.6756V22.3517H18.1802V23.8357H20.5121Z" fill="currentColor"/>
</svg>
);

export const CrossIcon = ({ className }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`text-white ${className}`}>
        <path d="M9.16992 14.8299L14.8299 9.16992" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.8299 14.8299L9.16992 9.16992" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" 
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
);

export const FileUploadIcon = ({ className } : { className?: string }) => (
    <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={`text-white ${className}`}>
        <path d="M62.5092 59.1051H45.3453V41.7614H51.0176C52.4561 41.7614 53.3061 40.1267 52.4561 38.9498L41.4221 23.6821C40.7192 22.7013 39.2644 22.7013 38.5615 23.6821L27.5276 38.9498C26.6776 40.1267 27.5112 41.7614 28.9661 41.7614H34.6383V59.1051H15.4148C6.83286 58.631 0 50.6049 0 41.9085C0 35.9093 3.25296 30.6784 8.07519 27.8505C7.63384 26.6572 7.40498 25.3821 7.40498 24.0417C7.40498 17.9118 12.358 12.9588 18.4879 12.9588C19.812 12.9588 21.087 13.1876 22.2803 13.629C25.8275 6.10957 33.4777 0.89502 42.3702 0.89502C53.8782 0.911366 63.3592 9.72216 64.4381 20.9522C73.2816 22.4725 80 30.6621 80 39.9306C80 49.8366 72.2844 58.4185 62.5092 59.1051Z" 
            fill="currentColor" fillOpacity="0.5"
        />
    </svg>
)

export const CrossCircleIcon = ({ className } : { className?: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" stroke="gray" fill="none" xmlns="http://www.w3.org/2000/svg" className={`text-gray-600 ${className}`}>
        <path d="M9.16992 14.8299L14.8299 9.16992" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.8299 14.8299L9.16992 9.16992" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const CheckCircledIcon = ({ className } : { className?: string }) => (
    <svg width="24" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <path d="M8.75 12.25L11 14.5L15.25 9.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);