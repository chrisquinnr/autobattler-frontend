import { Texture } from 'pixi.js';

export const Animations = {
  knight: {
    attack: [
      './assets/knight/attack/attack-0.png',
      './assets/knight/attack/attack-1.png',
      './assets/knight/attack/attack-2.png',
      './assets/knight/attack/attack-3.png',
      './assets/knight/attack/attack-4.png',
      './assets/knight/attack/attack-5.png',
      './assets/knight/attack/attack-6.png',
    ],
    giga: [
      './assets/knight/giga-attack/attack-2-0.png',
      './assets/knight/giga-attack/attack-2-1.png',
      './assets/knight/giga-attack/attack-2-2.png',
      './assets/knight/giga-attack/attack-2-3.png',
      './assets/knight/giga-attack/attack-2-4.png',
      './assets/knight/giga-attack/attack-2-5.png',
      './assets/knight/giga-attack/attack-2-6.png',
      './assets/knight/giga-attack/attack-2-7.png',
    ],
    idle: [
      './assets/knight/idle/idel-{n]-0.png',
      './assets/knight/idle/idel-{n]-1.png',
      './assets/knight/idle/idel-{n]-2.png',
      './assets/knight/idle/idel-{n]-3.png',
      './assets/knight/idle/idel-{n]-4.png',
      './assets/knight/idle/idel-{n]-5.png',
      './assets/knight/idle/idel-{n]-6.png',
      './assets/knight/idle/idel-{n]-7.png',
      './assets/knight/idle/idel-{n]-8.png',
      './assets/knight/idle/idel-{n]-9.png',
    ],
    hit: [
      './assets/knight/damage/damage-0.png',
      './assets/knight/damage/damage-1.png',
      './assets/knight/damage/damage-2.png',
    ],
    death: [
      './assets/knight/death/death-0.png',
      './assets/knight/death/death-1.png',
      './assets/knight/death/death-2.png',
      './assets/knight/death/death-3.png',
      './assets/knight/death/death-4.png',
      './assets/knight/death/death-5.png',
      './assets/knight/death/death-6.png',
    ],
  },
  // eslint-disable-next-line no-undef
  heal: Array.from(Array(60)).map(
    (_, i) => `./assets/general/heal/heal-${i}.png`
  ),
};

export const Build = (images) => {
  const textureArray = [];

  for (let i = 0; i < images.length; i++) {
    const texture = Texture.from(images[i]);
    textureArray.push(texture);
  }
  return textureArray;
};
