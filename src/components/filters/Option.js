import { useCallback } from 'react';
import styled from 'styled-components';

export const Option = ({ option, onClick, selected }) => {
  const { value, title } = option;
  const handleClick = useCallback(
    (clickedValue) => () => onClick(clickedValue),
    [onClick]
  );

  return (
    <OptionItem
      value={value}
      onClick={handleClick(value)}
      selected={selected}
      currentTitle={title}
    >
      {title}
    </OptionItem>
  );
};

const OptionItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 30px;
  padding: 5px;
  border: 1px;
  cursor: pointer;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  background-color: rgba(255, 255, 255, 1);
  color: rgb(0, 0, 0);
  font-weight: ${({ selected, currentTitle }) =>
    selected === currentTitle ? 'bold' : 'normal'};
  :hover {
    background-color: #83bf4633;
  }
`;
