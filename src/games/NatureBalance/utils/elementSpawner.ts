import { Element, GameState, ElementType } from '../types';
import { BIOME_CONFIGS, ELEMENT_SIZE, GAME_WIDTH } from '../config';

export function createElement(
  type: ElementType,
  speed: number,
  biome: GameState['biome']
): Element {
  const biomeConfig = BIOME_CONFIGS[biome];
  const elements = type === 'good' ? biomeConfig.elements.good : biomeConfig.elements.bad;
  const emoji = elements[Math.floor(Math.random() * elements.length)];

  return {
    id: Date.now(),
    type,
    x: Math.random() * (GAME_WIDTH - ELEMENT_SIZE),
    y: -ELEMENT_SIZE,
    speed,
    emoji,
  };
}

export function getRandomElementType(): ElementType {
  // 70% chance for good elements, 30% chance for bad elements
  return Math.random() < 0.7 ? 'good' : 'bad';
}