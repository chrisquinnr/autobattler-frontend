import React, { useCallback } from 'react';
import { Container, Text, Graphics } from '@pixi/react';
import { hpStyle, strStyle, defStyle, deadStyle } from './Styles';
import { Character } from './Character.jsx';

export const Team = ({ base, char, steps, i, index }) => {
  const drawDefenceIndicator = useCallback((g) => {
    g.clear();
    g.beginFill(0xff0000, 0.65);
    g.drawRoundedRect(-40, 20, 100, 100, 0.8);
    g.endFill();
  }, []);

  const drawAttackIndicator = useCallback((g) => {
    g.clear();
    g.beginFill(0x0021f3, 0.65);
    g.drawRoundedRect(-40, 20, 100, 100, 0.8);
    g.endFill();
  }, []);

  const drawHealIndicator = useCallback((g) => {
    g.clear();
    g.beginFill(0xffc0cb, 0.65);
    g.drawRoundedRect(-40, 20, 100, 100, 0.8);
    g.endFill();
  }, []);

  const pos = base * i;
  const isDead = !!char.stats.hp < 1;
  const latestStep = steps.at(-1);
  // console.log(latestStep, ' -----');
  const isDefender = latestStep?.defender === char.name;
  const isAttacker = latestStep?.attacker === char.name;
  const hasHealed =
    latestStep?.attacker === char.name && latestStep?.healed > 0;

  return (
    <Container>
      {!hasHealed && isDefender && (
        <Graphics
          position={{ x: pos + 30, y: base - 200 }}
          draw={drawDefenceIndicator}
        />
      )}
      {!hasHealed && isAttacker && (
        <Graphics
          position={{ x: pos + 30, y: base - 200 }}
          draw={drawAttackIndicator}
        />
      )}
      {hasHealed && (
        <Graphics
          position={{ x: pos + 30, y: base - 200 }}
          draw={drawHealIndicator}
        />
      )}
      <Character char={char} pos={pos} base={base} isDead={isDead} />
      {isDead ? (
        <Text
          position={{ x: pos, y: base - 190 }}
          text="Dead"
          style={deadStyle}
        />
      ) : (
        <Text
          position={{ x: pos + 20, y: base - 200 }}
          text={char.stats.hp}
          style={hpStyle}
        />
      )}
      <Text
        position={{ x: pos - 10, y: base - 50 }}
        text={char.stats.str}
        style={strStyle}
      />
      <Text
        position={{ x: pos + 60, y: base - 50 }}
        text={char.stats.def}
        style={defStyle}
      />
    </Container>
  );
};
