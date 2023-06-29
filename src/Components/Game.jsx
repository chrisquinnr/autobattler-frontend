import React, { useMemo } from 'react';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { Texture, AlphaFilter } from 'pixi.js';
import { hpStyle, strStyle, defStyle, deadStyle } from './Styles';
// import useWebSocket from 'react-use-websocket';

export const Game = ({
  // webSocketId,
  team = [],
  opposition = [],
  result,
  steps = [],
  index,
}) => {
  // const { sendMessage, lastMessage, readyState } = useWebSocket(webSocketId, {
  const base = 150;
  const appWidth = 1200;
  const appHeight = 1200;
  const filter = useMemo(() => new AlphaFilter(0.5), []);
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
          console.log(steps.at(-1), 'current step');
          const isDefender = steps.at(-1)?.defender === char.name;
          return (
            <>
              {isDefender ? (
                <Text
                  position={{ x: pos + 20, y: base - 200 }}
                  text="DEFENDER"
                />
              ) : (
                <Text position={{ x: pos + 20, y: base - 200 }} text="NOT" />
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
          return (
            <>
              {isDefender ? (
                <Text
                  position={{ x: pos + 20, y: base - 200 }}
                  text="DEFENDER"
                />
              ) : (
                <Text position={{ x: pos + 20, y: base - 200 }} text="NOT" />
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
          <Container x={0} y={i * 30}>
            {remaining_hp > 0 ? (
              <Text
                text={`${attacker} dealt ${damage} damage to ${defender}`}
              />
            ) : (
              <Text
                text={`${attacker} dealt ${damage} damage and killed ${defender}!`}
              />
            )}
          </Container>
        ))}
      </Container>
      <Container y={900}>
        <Text text={result} />
      </Container>
    </Stage>
  );
};
