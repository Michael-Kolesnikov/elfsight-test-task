import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowDown } from '../../assets/arrow-down-svgrepo-com.svg';
import { ReactComponent as ArrowUp } from '../../assets/arrow-up-svgrepo-com.svg';
import { ReactComponent as Cross } from '../../assets/cross-svgrepo-com.svg';
import { Option } from './Option';

export const Select = ({
  placeholder,
  options,
  selected,
  onClose,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);

  const handleOptionClick = useCallback(
    (value) => {
      setIsOpen(false);
      onChange?.(value);
    },
    [onChange]
  );
  const handlePlaceHolderClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  const handleCrossClick = useCallback(() => {
    onChange?.(null);
  }, [onChange]);

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target instanceof Node && !rootRef.current?.contains(e.target)) {
        isOpen && onClose?.();
        setIsOpen(false);
      }
    };
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isOpen, onClose]);

  return (
    <SelectWrapper>
      <StyledSelect ref={rootRef} onClick={handlePlaceHolderClick}>
        <SelectedText hasSelected={!!selected}>
          {selected?.title || placeholder}
        </SelectedText>
        {selected?.title ? (
          <StyledCross onClick={handleCrossClick} />
        ) : isOpen ? (
          <StyledArrowUp />
        ) : (
          <StyledArrowDown />
        )}
      </StyledSelect>
      {isOpen && (
        <SelectGrid>
          {options.map((option) => (
            <Option
              key={option.value}
              option={option}
              onClick={handleOptionClick}
              selected={selected?.title}
            />
          ))}
        </SelectGrid>
      )}
    </SelectWrapper>
  );
};

const SelectWrapper = styled.div`
  position: relative;
  border-radius: 12px;
`;

const StyledSelect = styled.div`
  position: relative;
  padding: 10px;
  border: 1px solid #83bf46;
  border-radius: 8px;
  background-color: #263750;
  color: #a0a0a0;
  font-size: 14px;
  width: 100%;
  cursor: pointer;
  :hover {
    background-color: #334466;
  }
`;

const SelectGrid = styled.ul`
  display: grid;
  position: absolute;
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  z-index: 10;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  overflow: hidden;
  max-height: 150px;
  overflow-y: auto;
`;

const StyledArrowDown = styled(ArrowDown)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  path {
    fill: #a0a0a0;
  }
  pointer-events: none;
`;

const StyledCross = styled(Cross)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  path {
    fill: #fff;
  }
`;

const StyledArrowUp = styled(ArrowUp)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  path {
    fill: #a0a0a0;
  }
`;

const SelectedText = styled.span`
  color: ${(props) => (props.hasSelected ? '#fff' : '#a0a0a0')};
  display: block;
  padding-right: 30px; /* Чтобы текст не заезжал под иконку */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
