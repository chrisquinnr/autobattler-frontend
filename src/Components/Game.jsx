import React, { useMemo, useCallback } from 'react';
import { Stage, Container, Sprite, Text, Graphics } from '@pixi/react';
import { Texture, AlphaFilter } from 'pixi.js';
import { logStyle, splashStyle, gigaStyle } from './Styles';
import { Team } from './Team.jsx';
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
  const filter = useMemo(() => new AlphaFilter(0.7), []);

  const drawBanner = useCallback((g) => {
    g.clear();
    g.beginFill(0xff0000, 0.65);
    g.drawRoundedRect(-500, -30, 1800, 190, 0);
    g.endFill();
  }, []);

  return (
    <Stage
      width={appWidth}
      height={appHeight}
      options={{
        backgroundColor: '0x222222',
        antialias: true,
        backgroundAlpha: 0,
      }}
    >
      <Sprite
        image={'./assets/bg.jpeg'}
        x={0}
        y={0}
        width={2400}
        height={320 * 2.5}
        filters={[filter]}
      />
      <Sprite texture={Texture.WHITE} width={1} height={1} />
      <Container x={400} y={100}>
        {opposition.map((char, i) => (
          <Team base={base} char={char} steps={steps} i={i} />
        ))}
      </Container>
      <Container x={450} y={600}>
        {team.map((char, i) => (
          <Team base={base} char={char} steps={steps} i={i} index={index} />
        ))}
      </Container>
      <Container x={100} y={0}>
        <Text text="Autobattler v0.1" />
      </Container>
      <Container x={0} y={100}>
        {steps.map(
          (
            { attacker, damage, defender, remaining_hp, healed, is_special },
            i
          ) => (
            <Container x={0} y={i * 20}>
              {healed < 1 && remaining_hp > 0 && (
                <Text
                  text={`${attacker} dealt ${damage} ${
                    is_special ? 'GIGA' : ''
                  } damage to ${defender}`}
                  style={is_special ? gigaStyle : logStyle}
                />
              )}
              {damage === 0 && healed > 0 && (
                <Text
                  text={`${attacker} healed ${healed} HP!`}
                  style={is_special ? gigaStyle : logStyle}
                />
              )}
              {damage > 0 && remaining_hp < 1 && (
                <Text
                  text={`${attacker} dealt ${damage} ${
                    is_special ? 'GIGA' : ''
                  } damage and killed ${defender}!`}
                  style={is_special ? gigaStyle : logStyle}
                />
              )}
            </Container>
          )
        )}
      </Container>
      {done && (
        <Container x={300} y={350}>
          <Graphics draw={drawBanner} />
          <Text text={result} style={splashStyle} />
        </Container>
      )}
    </Stage>
  );
};
