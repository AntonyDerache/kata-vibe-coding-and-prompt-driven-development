export class WheelPickerService {
  private static readonly SPIN_DURATION = 3000;

  public static selectWinner(names: string[]): Promise<string> {
    if (names.length === 0) {
      throw new Error('Cannot select winner: No names available');
    }

    return new Promise(resolve => {
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * names.length);
        resolve(names[randomIndex]);
      }, this.SPIN_DURATION);
    });
  }
}