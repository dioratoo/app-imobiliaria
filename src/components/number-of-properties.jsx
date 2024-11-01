import { useProperties } from "../providers/properties-provider";

function NumberOfProperties() {
  const properties = useProperties();

  return <span>({properties.length})</span>;
}

export default NumberOfProperties;
