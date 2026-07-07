export interface RiskOracle {
  getScore(destination: string): Promise<number>;
}
