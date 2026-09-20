import { describe, expect, it } from 'vitest';
import { maximumDrawdown, profitFactor } from './calculations';
describe('trading metrics', () => { it('calculates profit factor', () => expect(profitFactor([100, -50, 40, -50])).toBe(1.4)); it('tracks maximum closed-trade drawdown', () => expect(maximumDrawdown([100, -40, -80, 50])).toBe(-120)); });
