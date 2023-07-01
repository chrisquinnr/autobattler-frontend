import React, { useMemo, useCallback, useState } from 'react';
import { Container, Graphics, Sprite, Text, AnimatedSprite } from '@pixi/react';
import { AlphaFilter, Texture } from 'pixi.js';
import { logStyle, deadStyle, hpStyle, strStyle, defStyle } from './Styles';
import { Animations } from './Animations';

export const Character = ({ char, steps, pos, base, who, type = 'knight' }) => {
  console.log(`--------------------------- render ${char.name}`);
  const filter = useMemo(() => new AlphaFilter(0.5), []);

  const attackImages = Animations[type].attack;
  const attackAnimation = [];
  for (let i = 0; i < attackImages.length; i++) {
    const texture = Texture.from(attackImages[i]);
    attackAnimation.push(texture);
  }

  const gigaImages = Animations[type].giga;
  const gigaAnimation = [];
  for (let i = 0; i < gigaImages.length; i++) {
    const texture = Texture.from(gigaImages[i]);
    gigaAnimation.push(texture);
  }

  const idleImages = Animations[type].idle;
  const idleAnimation = [];
  for (let i = 0; i < idleImages.length; i++) {
    const texture = Texture.from(idleImages[i]);
    idleAnimation.push(texture);
  }

  const hitImages = Animations[type].hit;
  const hitAnimation = [];
  for (let i = 0; i < hitImages.length; i++) {
    const texture = Texture.from(hitImages[i]);
    hitAnimation.push(texture);
  }

  const deathImages = Animations[type].death;
  const deathAnimation = [];
  for (let i = 0; i < deathImages.length; i++) {
    const texture = Texture.from(deathImages[i]);
    deathAnimation.push(texture);
  }
  const deathStatic = deathImages.at(-1);

  const healImages = Animations.heal;
  const healAnimation = [];
  for (let i = 0; i < healImages.length; i++) {
    const texture = Texture.from(healImages[i]);
    healAnimation.push(texture);
  }

  const characterX = -10;
  const characterY = pos - 10;

  const drawCharacterBg = useCallback(
    (g) => {
      g.clear();
      g.beginFill(0xffc0cb, 0.15);
      g.drawRoundedRect(characterX, characterY, base, base, 0.9);
      g.endFill();
    },
    [base, characterX, characterY]
  );

  const drawDefenceIndicator = useCallback(
    (g) => {
      g.clear();
      g.beginFill(0xff0000, 0.65);
      g.drawRoundedRect(characterX, characterY, base, base, 0.9);
      g.endFill();
    },
    [base, characterX, characterY]
  );

  const drawAttackIndicator = useCallback(
    (g) => {
      g.clear();
      g.beginFill(0x0021f3, 0.65);
      g.drawRoundedRect(characterX, characterY, base, base, 0.9);
      g.endFill();
    },
    [base, characterX, characterY]
  );

  const drawHealIndicator = useCallback(
    (g) => {
      g.clear();
      g.beginFill(0xffc0cb, 0.65);
      g.drawRoundedRect(characterX, characterY, base, base, 0.9);
      g.endFill();
    },
    [base, characterX, characterY]
  );

  const isDead = !!char.stats.hp < 1;
  console.log(`${char.name} has ${char.stats.hp} hp`);
  const latestStep = steps.at(-1);
  // console.log(latestStep, ' -----');
  const isDefender = latestStep?.defender === char.name;
  const isAttacker = latestStep?.attacker === char.name;
  const hasHealed = isAttacker && latestStep?.healed > 0;
  const hasDied = latestStep?.remaining_hp < 1;

  let play = 'idle';
  let nonce = true;

  const isPlaying = (event) => {
    const isPlaying = event === play && nonce;
    nonce = false;
    return isPlaying;
  };

  const setPlay = (newPlay) => {
    play = newPlay;
  };

  if (isAttacker) {
    if (hasHealed) {
      console.log(`${char.name} is healing`);
      setPlay('heal');
    } else {
      if (latestStep?.is_special) {
        console.log(`${char.name} UNLEASHES GIGA`);
        setPlay('giga');
      } else {
        console.log(`${char.name} is attacking`);
        setPlay('attack');
      }
    }
  } else {
    if (isDead) {
      console.log(`${char.name} is dead`);
      setPlay('dead');
    } else {
      if (isDefender) {
        if (hasDied) {
          console.log(`${char.name} has died!`);
          setPlay('death');
        } else {
          console.log(`${char.name} is defending`);
          setPlay('hit');
        }
      } else {
        console.log(`${char.name} is idle`);
        setPlay('idle');
      }
    }
  }

  const isOppo = who === 'opposition';
  const xScale = isOppo ? -1.7 : 1.7;
  const yScale = 1.7;

  return (
    <Container>
      <Graphics draw={drawCharacterBg} />
      {!hasHealed && isDefender && <Graphics draw={drawDefenceIndicator} />}
      {!hasHealed && isAttacker && <Graphics draw={drawAttackIndicator} />}
      {hasHealed && <Graphics draw={drawHealIndicator} />}
      {isDefender && !hasHealed && (
        <AnimatedSprite
          position={{ x: isOppo ? base : -base, y: pos }}
          textures={hitAnimation}
          isPlaying={isPlaying('hit')}
          animationSpeed={0.1}
          scale={{ x: xScale, y: yScale }}
        />
      )}
      {isAttacker && !hasHealed && !latestStep?.is_special && (
        <AnimatedSprite
          position={{ x: isOppo ? base : -base, y: pos - 80 }}
          textures={attackAnimation}
          isPlaying={isPlaying('attack')}
          animationSpeed={0.1}
          scale={{ x: xScale, y: yScale }}
        />
      )}
      {isAttacker && latestStep?.is_special && !hasHealed && (
        <AnimatedSprite
          position={{ x: isOppo ? base : -base, y: pos - 80 }}
          textures={gigaAnimation}
          isPlaying={isPlaying('giga')}
          animationSpeed={0.1}
          scale={{ x: xScale, y: yScale }}
        />
      )}

      {hasHealed && (
        <>
          <AnimatedSprite
            position={{ x: isOppo ? base : -base, y: pos - 80 }}
            textures={healAnimation}
            isPlaying={isPlaying('heal')}
            animationSpeed={1}
            scale={{ x: xScale, y: yScale }}
          />
          <AnimatedSprite
            position={{ x: isOppo ? base : -base, y: pos }}
            textures={idleAnimation}
            isPlaying={isPlaying('idle')}
            animationSpeed={0.3}
            scale={{ x: xScale, y: yScale }}
          />
        </>
      )}
      {!isAttacker && !isDefender && !isDead && (
        <AnimatedSprite
          position={{ x: isOppo ? base : -base, y: pos }}
          textures={idleAnimation}
          isPlaying={isPlaying('idle')}
          animationSpeed={0.3}
          scale={{ x: xScale, y: yScale }}
        />
      )}
      {isDefender && hasDied && (
        <AnimatedSprite
          filters={isDead ? [filter] : []}
          position={{ x: isOppo ? base : -base, y: pos }}
          textures={deathAnimation}
          isPlaying={isPlaying('dead')}
          animationSpeed={0.1}
          scale={{ x: xScale, y: yScale }}
        />
      )}
      {isDead && (
        <Sprite
          position={{ x: isOppo ? base : -base, y: pos + 20 }}
          image={deathStatic}
          scale={{ x: xScale, y: yScale }}
        />
      )}
      <Text position={{ y: pos + base }} text={char.name} />
      <Text
        style={logStyle}
        position={{ y: pos + base + 30 }}
        text={char.special_move}
      />
      {isDead ? (
        <Text position={{ y: pos }} text="Dead" style={deadStyle} />
      ) : (
        <Text
          position={{ x: 60, y: pos - 40 }}
          text={char.stats.hp}
          style={hpStyle}
        />
      )}
      <Text
        position={{ y: pos + base + 25 }}
        text={char.stats.str}
        style={strStyle}
      />
      <Text
        position={{ x: 60, y: pos + base + 25 }}
        text={char.stats.def}
        style={defStyle}
      />
    </Container>
  );
};
