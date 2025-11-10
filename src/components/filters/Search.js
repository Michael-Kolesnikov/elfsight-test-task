import styled from 'styled-components';
import { Select } from './Select';
import { useCallback, useEffect, useState } from 'react';
import { useUrlState } from './../../hooks/useUrlState';
import { useData } from '../providers';

export const Search = () => {
  const { applyFilters, resetFilters } = useData();
  const [filters, setFilters, resetUrlFilters] = useUrlState({
    status: '',
    gender: '',
    species: '',
    name: '',
    type: ''
  });

  const [options, setOptions] = useState({
    status: [],
    gender: [],
    species: []
  });

  const getSelectedOption = (filterValue, optionList) => {
    if (!filterValue) return null;

    return optionList.find((opt) => opt.value === filterValue) || null;
  };

  useEffect(() => {
    const fetchAllCharacters = async () => {
      try {
        const response = await fetch(
          'https://rickandmortyapi.com/api/character'
        );
        const data = await response.json();
        const pages = data.info.pages;

        const requests = Array.from({ length: pages }, (_, i) =>
          fetch(
            `https://rickandmortyapi.com/api/character?page=${i + 1}`
          ).then((res) => res.json())
        );

        const results = await Promise.all(requests);
        const allCharacters = results.flatMap((result) => result.results);

        const uniqueValues = allCharacters.reduce(
          (acc, character) => {
            acc.status.add(character.status.toLowerCase());
            acc.gender.add(character.gender.toLowerCase());
            acc.species.add(character.species.toLowerCase());

            return acc;
          },
          { status: new Set(), gender: new Set(), species: new Set() }
        );

        setOptions({
          status: Array.from(uniqueValues.status).map((value) => ({
            value,
            title: value.charAt(0).toUpperCase() + value.slice(1)
          })),
          gender: Array.from(uniqueValues.gender).map((value) => ({
            value,
            title: value.charAt(0).toUpperCase() + value.slice(1)
          })),
          species: Array.from(uniqueValues.species).map((value) => ({
            value,
            title: value.charAt(0).toUpperCase() + value.slice(1)
          }))
        });
      } catch (error) {
        console.error('Error fetching all characters:', error);
      }
    };

    fetchAllCharacters();
  }, []);

  const handleStatusChange = useCallback(
    (value) => {
      setFilters({ status: value });
    },
    [setFilters]
  );

  const handleGenderChange = useCallback(
    (value) => {
      setFilters({ gender: value });
    },
    [setFilters]
  );

  const handleSpeciesChange = useCallback(
    (value) => {
      setFilters({ species: value });
    },
    [setFilters]
  );

  const handleNameChange = useCallback(
    (e) => {
      setFilters({ name: e.target.value });
    },
    [setFilters]
  );

  const handleTypeChange = useCallback(
    (e) => {
      setFilters({ type: e.target.value });
    },
    [setFilters]
  );

  const handleApply = useCallback(() => {
    applyFilters(filters);
  }, [applyFilters, filters]);

  const handleReset = useCallback(() => {
    resetUrlFilters();
    resetFilters();
  }, [resetFilters, resetUrlFilters]);

  return (
    <GridContainer>
      <Select
        placeholder={'Status'}
        selected={getSelectedOption(filters.status, options.status)}
        options={options.status}
        onChange={handleStatusChange}
      />
      <Select
        placeholder={'Gender'}
        selected={getSelectedOption(filters.gender, options.gender)}
        options={options.gender}
        onChange={handleGenderChange}
      />
      <Select
        placeholder={'Species'}
        selected={getSelectedOption(filters.species, options.species)}
        options={options.species}
        onChange={handleSpeciesChange}
      />
      <StyledInput
        type="text"
        placeholder="Name"
        value={filters.name}
        onChange={handleNameChange}
      />
      <StyledInput
        type="text"
        placeholder="Type"
        value={filters.type}
        onChange={handleTypeChange}
      />

      <ButtonGroup>
        <StyledButton onClick={handleApply}>Apply</StyledButton>
        <StyledButton onClick={handleReset}>Reset</StyledButton>
      </ButtonGroup>
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 16px;
  padding: 20px;
  max-width: 800px;

  @media (max-width: 530px) {
    grid-template-columns: 1fr;
    gap: 12px;
    width: 100%;
    padding: 16px;
  }
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #83bf46;
  border-radius: 8px;
  background-color: #263750;
  color: #fff;
  font-size: 14px;
  box-sizing: border-box;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  :hover {
    background-color: #334466;
  }
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  border: 1px solid #83bf46;
  border-radius: 8px;
  background-color: transparent;
  color: #83bf46;
  font-size: 14px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #83bf46;
    color: #fff;
  }

  &:last-child {
    color: #ff5152;
    border-color: #ff5152;
    &:hover {
      background-color: #ff5152;
      color: #fff;
    }
  }
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  grid-column: span 1;

  @media (max-width: 530px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    gap: 12px;
  }
`;
