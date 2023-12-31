import { TextStyle } from 'pixi.js';

export const hpStyle = new TextStyle({
  align: 'center',
  fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
  fontSize: 40,
  fontWeight: '400',
  fill: ['#ffffff', '#00ff99'], // gradient
  stroke: '#01d27e',
  strokeThickness: 5,
  dropShadow: true,
  dropShadowColor: '#ccced2',
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
  wordWrap: true,
  wordWrapWidth: 440,
});

export const strStyle = new TextStyle({
  align: 'center',
  fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
  fontSize: 30,
  fontWeight: '400',
  fill: ['#FF0000'],
});

export const defStyle = new TextStyle({
  align: 'center',
  fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
  fontSize: 30,
  fontWeight: '400',
  fill: ['#0021f3'],
});

export const deadStyle = new TextStyle({
  align: 'center',
  fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
  fontSize: 30,
  fontWeight: '400',
  fill: ['#FF0000'],
});

export const logStyle = new TextStyle({
  align: 'left',
  fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
  fontSize: 14,
  fontWeight: '200',
  fill: ['#000000'],
});

export const splashStyle = new TextStyle({
  align: 'center',
  fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
  fontSize: 100,
  fontWeight: 400,
  fill: ['#000000'],
});

export const gigaStyle = new TextStyle({
  align: 'center',
  fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
  fontSize: 14,
  fontWeight: 800,
  fill: ['#000000'],
});
