import React from 'react';
import { Container } from '@pixi/react';
import { Character } from './Character.jsx';

export const TeamMember = ({ char, steps, i, who, isPlaying }) => {
  const base = 120;
  const pos = base * i;
  // Do stuff with char type
  let type = char?.type;
  if (type === 'none') type = undefined;

  return (
    <Container y={pos}>
      <Character
        char={char}
        steps={steps}
        pos={pos}
        base={base}
        who={who}
        type={type}
        isPlaying
      />
    </Container>
  );
};
