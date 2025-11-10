import axios from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback
} from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function DataProvider({ children }) {
  const [activePage, setActivePage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(API_URL);
  const [currentFilters, setCurrentFilters] = useState({});

  const applyFilters = useCallback((filters = {}) => {
    const cleanParams = Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value !== '')
    );
    const queryString = new URLSearchParams(cleanParams).toString();
    const newUrl = queryString ? `${API_URL}?${queryString}` : API_URL;
    setCurrentFilters(cleanParams);
    setApiURL(newUrl);
    setActivePage(0);
  }, []);

  const resetFilters = useCallback(() => {
    setCurrentFilters({});
    setApiURL(API_URL);
    setActivePage(0);
  }, []);

  const fetchData = useCallback(async (url) => {
    setIsFetching(true);
    setIsError(false);

    axios
      .get(url)
      .then(({ data }) => {
        setIsFetching(false);
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch((e) => {
        setIsFetching(false);
        setIsError(true);
        console.error(e);
      });
  }, []);

  useEffect(() => {
    fetchData(apiURL);
  }, [apiURL, fetchData]);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      apiURL,
      setApiURL,
      characters,
      fetchData,
      isFetching,
      isError,
      info,
      applyFilters,
      resetFilters,
      currentFilters
    }),
    [
      activePage,
      apiURL,
      characters,
      isFetching,
      isError,
      info,
      fetchData,
      applyFilters,
      resetFilters,
      currentFilters
    ]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
