import { RiskOracle } from './RiskOracle';

/**
 * Decorator that de-duplicates concurrent `getScore(destination)` calls.
 *
 * While a request for a given destination is in-flight, subsequent callers
 * return the same promise instead of issuing a new underlying request.
 */
export class CoalescingOracle implements RiskOracle {
  private readonly inFlightByDestination = new Map<string, Promise<number>>();

  constructor(private readonly inner: RiskOracle) {}

  async getScore(destination: string): Promise<number> {
    const existing = this.inFlightByDestination.get(destination);
    if (existing) {
      return existing;
    }

    const p = this.inner.getScore(destination);
    this.inFlightByDestination.set(destination, p);

    // Ensure the entry is removed after success or failure so a later call
    // can retry.
    p.finally(() => {
      // Only delete if it's still the same promise instance.
      if (this.inFlightByDestination.get(destination) === p) {
        this.inFlightByDestination.delete(destination);
      }
    });

    return p;
  }
}

