import { describe, expect, it } from 'vitest';
import { StubOracle } from '../src/StubOracle';

describe('StubOracle', () => {
  it('returns a score within 0-100 for known and unknown destinations', async () => {
    const oracle = new StubOracle();

    const destinations = [
      'GAKNOWNWASHTRADERWALLETEXAMPLE',
      'GAKNOWNCLEANWALLETEXAMPLE',
      'XLM/USDC:GASUSPICIOUSASSETISSUEREXAMPLE',
      'GSOMEUNRECOGNIZEDDESTINATION',
    ];

    for (const destination of destinations) {
      const score = await oracle.getScore(destination);
      expect(typeof score).toBe('number');
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    }
  });
});
