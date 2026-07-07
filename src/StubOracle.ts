import { RiskOracle } from './RiskOracle';

const SCORES: Readonly<Record<string, number>> = {
  'GAKNOWNWASHTRADERWALLETEXAMPLE': 95,
  'GAKNOWNCLEANWALLETEXAMPLE': 5,
  'XLM/USDC:GASUSPICIOUSASSETISSUEREXAMPLE': 60,
};

export class StubOracle implements RiskOracle {
  async getScore(destination: string): Promise<number> {
    return SCORES[destination] ?? 0;
  }
}
