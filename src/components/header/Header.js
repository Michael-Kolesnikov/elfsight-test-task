import styled from 'styled-components';
import { Logo } from './Logo';
import { Search } from '../filters';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <Search />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 0 100px;
  @media (max-width: 950px) {
    flex-direction: column;
  }
`;
