interface ITableHeadings {
   label: string;
   name: string;
   component?: any;
   customDataClass?: string;
   customHeadingClass?: string;
   sortable?: boolean;
   tooltipText?: string;
}

interface ISortingCriteria {
   fieldName: string;
   type: string;
}
