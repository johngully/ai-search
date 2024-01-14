type NameValuePair = { name: string, value: any };
type CriteriaListProps = { criteria: Criteria, className?: string };
export function CriteriaList({criteria, className }: CriteriaListProps) {
  const filterProperties = Object.keys(criteria).map(name => {
    const value = criteria[name as keyof Criteria];
    return { name, value } as NameValuePair
  })

  return <div className={`min-h-12 pt-2 ${className}`}>
    {filterProperties.filter(filterProperty => !!filterProperty.value).map(filterProperty => (<Criteria key={filterProperty.name} filterProperty={filterProperty}></Criteria>))}
  </div>
}

type CriteriaProps = { filterProperty: NameValuePair }
function Criteria({ filterProperty }: CriteriaProps) {
  let value = filterProperty.value;
  let label = filterProperty.name.toLowerCase();
  let operation = ": ";
  
  const LOWERBOUND = "LowerBound".toLowerCase();
  const UPPERBOUND = "UpperBound".toLowerCase();
  const MARGIN = "Margin".toLowerCase();

  if (label.includes(LOWERBOUND)) {
    label = label.replace(LOWERBOUND, "");
    operation = " is more than ";
  }

  if (label.includes(UPPERBOUND)) {
    label = label.replace(UPPERBOUND, "");
    operation = " is less than ";
  }

  if (label === MARGIN) {
    value = (value * 100).toString() + "%"
  }
  
  
  return <div className="inline-block rounded-lg bg-gray-100 border border-gray-200 text-gray-400 text-[10px] uppercase px-2 py-1 mr-1">{label}{operation}{value}</div>
}