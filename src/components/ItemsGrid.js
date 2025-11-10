import styled from 'styled-components';
import { useData } from './providers';
import { Card } from './card';
import { usePopup } from './popup';

export function ItemsGrid() {
  const { characters } = useData();
  const { setPopupSettings } = usePopup();

  const createCardClickHandler = (character) => {
    return () => {
      setPopupSettings({
        visible: true,
        content: { ...character }
      });
    };
  };

  if (!characters.length) {
    return null;
  }

  return (
    <Container>
      {characters.map((character) => (
        <Card
          key={character.id}
          onClickHandler={createCardClickHandler(character)}
          {...character}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  gap: 30px;
`;
