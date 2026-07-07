import { RiskOracle } from './RiskOracle';

export class StubOracle implements RiskOracle {
  async getScore(destination: string): Promise<number> {
    return 0;
  }
}
