import React, { useMemo, useCallback } from 'react';
import { Container, Graphics, Sprite, Text, useTick } from '@pixi/react';
import { AlphaFilter } from 'pixi.js';
import { logStyle } from './Styles';

export const Character = ({ char, pos, base, isDead }) => {
  const filter = useMemo(() => new AlphaFilter(0.5), []);
  const drawCharacterBg = useCallback((g) => {
    g.clear();
    g.beginFill(0xffc0cb, 0.65);
    g.drawRoundedRect(-40, 20, 100, 100, 0.6);
    g.endFill();
  }, []);
  return (
    <Container>
      <Sprite
        image={char.src}
        filters={isDead ? [filter] : []}
        position={{ x: pos }}
      />
      <Text position={{ x: pos - 10, y: base - 10 }} text={char.name} />
      <Text
        style={logStyle}
        position={{ x: pos - 10, y: base + 20 }}
        text={char.special_move}
      />
    </Container>
  );
};
