import { createContext, useEffect, useState, useContext } from "react";

export const PropertiesContext = createContext();

export function PropertiesProvider({ children }) {
  const [properties, setProperties] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (searchText === "") {
      fetch("./src/data/properties.json")
        .then((response) => response.json())
        .then((data) => {
          setProperties(data);
        });
    }

    setProperties(
      properties.filter(
        (property) =>
          property.name.toLowerCase().includes(searchText.toLowerCase()) ||
          property.description
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          property.location.toLowerCase().includes(searchText.toLowerCase()),
      ),
    );
  }, [searchText]);

  useEffect(() => {
    fetch("./src/data/properties.json")
      .then((response) => response.json())
      .then((data) => {
        setProperties(data);
      });
  }, []);

  return (
    <PropertiesContext.Provider
      value={{ properties, searchText, setSearchText }}
    >
      {children}
    </PropertiesContext.Provider>
  );
}

export function useProperties() {
  const { properties } = useContext(PropertiesContext);

  return properties;
}
