import { useCallback, useEffect, useState } from 'react';

export function useUrlState(initialState = {}) {
  const [state, setState] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {};
    for (const [key, value] of urlParams.entries()) {
      params[key] = value.toLowerCase();
    }

    return { ...initialState, ...params };
  });

  const updateUrl = useCallback((newParams) => {
    const url = new URL(window.location);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value && value !== '') {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
    });

    window.history.pushState({}, '', url.toString());
  }, []);

  const setUrlState = useCallback(
    (newState) => {
      setState((prev) => {
        const updated = { ...prev, ...newState };
        updateUrl(updated);

        return updated;
      });
    },
    [updateUrl]
  );

  const resetFilters = useCallback(() => {
    const resetState = { ...initialState };
    setState(resetState);

    const url = new URL(window.location);
    Object.keys(initialState).forEach((key) => {
      url.searchParams.delete(key);
    });
    window.history.pushState({}, '', url.toString());
  }, [initialState]);

  useEffect(() => {
    const handleUrlChange = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const currentParams = {};

      for (const [key, value] of urlParams.entries()) {
        currentParams[key] = value.toLowerCase(); // ⚡ Приводим к lowercase
      }

      setState((prev) => ({ ...prev, ...currentParams }));
    };

    window.addEventListener('popstate', handleUrlChange);
    handleUrlChange();

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  return [state, setUrlState, resetFilters];
}
