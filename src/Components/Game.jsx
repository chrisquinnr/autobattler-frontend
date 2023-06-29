import React, { useMemo, useCallback } from 'react';
import { Stage, Container, Sprite, Text, Graphics } from '@pixi/react';
import { Texture, AlphaFilter } from 'pixi.js';
import {
  hpStyle,
  strStyle,
  defStyle,
  deadStyle,
  logStyle,
  splashStyle,
} from './Styles';
// import useWebSocket from 'react-use-websocket';

export const Game = ({
  // webSocketId,
  team = [],
  opposition = [],
  result,
  steps = [],
  index,
  done,
}) => {
  // const { sendMessage, lastMessage, readyState } = useWebSocket(webSocketId, {});
  const base = 150;
  const appWidth = 1200;
  const appHeight = 1200;
  const filter = useMemo(() => new AlphaFilter(0.5), []);

  const drawBanner = useCallback((g) => {
    g.clear();
    g.beginFill(0xff0000, 0.65);
    g.drawRoundedRect(-500, -30, 1800, 190, 0);
    g.endFill();
  }, []);

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

  return (
    <Stage
      width={appWidth}
      height={appHeight}
      options={{
        antialias: true,
        backgroundAlpha: 0,
      }}
    >
      <Sprite
        image={'./assets/bg.png'}
        x={500}
        y={30}
        width={367 * 2.5}
        height={320 * 2.5}
        filters={[filter]}
      />
      <Sprite texture={Texture.WHITE} width={1} height={1} />
      <Container x={600} y={100}>
        {opposition.map((char, i) => {
          const pos = base * i;
          const isDead = !!char.stats.hp < 1;
          const isDefender = steps.at(-1)?.defender === char.name;
          const isAttacker = steps.at(-1)?.attacker === char.name;
          return (
            <>
              {isDefender && (
                <Graphics
                  position={{ x: pos + 20, y: base - 200 }}
                  draw={drawDefenceIndicator}
                />
              )}
              {isAttacker && (
                <Graphics
                  position={{ x: pos + 20, y: base - 200 }}
                  draw={drawAttackIndicator}
                />
              )}
              <Sprite
                image={char.src}
                filters={isDead ? [filter] : []}
                position={{ x: pos }}
              />
              <Text position={{ x: pos - 10, y: base - 10 }} text={char.name} />
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
            </>
          );
        })}
      </Container>
      <Container x={700} y={600}>
        {team.map((char, i) => {
          const pos = base * i;
          const isDead = !!char.stats.hp < 1;
          const isDefender = steps.at(-1)?.defender === char.name;
          const isAttacker = steps.at(-1)?.attacker === char.name;
          return (
            <>
              {isDefender && (
                <Graphics
                  position={{ x: pos + 20, y: base - 200 }}
                  draw={drawDefenceIndicator}
                />
              )}
              {isAttacker && (
                <Graphics
                  position={{ x: pos + 20, y: base - 200 }}
                  draw={drawAttackIndicator}
                />
              )}
              <Sprite
                key={i}
                image={char.src}
                filters={isDead ? [filter] : []}
                position={{ x: pos }}
              />
              <Text position={{ x: pos - 10, y: base - 10 }} text={char.name} />
              {isDead ? (
                <Text
                  position={{ x: pos, y: base - 190 }}
                  text="Dead"
                  style={deadStyle}
                />
              ) : (
                <Text
                  position={{ x: pos + 10, y: base - 200 }}
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
            </>
          );
        })}
      </Container>
      <Container x={100} y={0}>
        <Text text="Autobattler v0.1" />
      </Container>
      <Container x={0} y={100}>
        {steps.map(({ attacker, damage, defender, remaining_hp }, i) => (
          <Container x={0} y={i * 20}>
            {remaining_hp > 0 ? (
              <Text
                text={`${attacker} dealt ${damage} damage to ${defender}`}
                style={logStyle}
              />
            ) : (
              <Text
                text={`${attacker} dealt ${damage} damage and killed ${defender}!`}
                style={logStyle}
              />
            )}
          </Container>
        ))}
      </Container>
      {done && (
        <Container x={300} y={600}>
          <Graphics draw={drawBanner} />
          <Text text={result} style={splashStyle} />
        </Container>
      )}
    </Stage>
  );
};
