import { RiskOracle } from './RiskOracle';

const SCORES: Readonly<Record<string, number>> = {
  'GAKNOWNWASHTRADERWALLETEXAMPLE': 95,
  'GAKNOWNCLEANWALLETEXAMPLE': 5,
  'XLM/USDC:GASUSPICIOUSASSETISSUEREXAMPLE': 60,
};

// Unrecognized destinations are treated as low-risk rather than unscored,
// so the extension always has a number to render.
const DEFAULT_SCORE = 0;

export class StubOracle implements RiskOracle {
  async getScore(destination: string): Promise<number> {
    return SCORES[destination] ?? DEFAULT_SCORE;
  }
}
