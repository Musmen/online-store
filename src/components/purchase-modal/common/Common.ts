class Common {
  public static isCharNumber(val: string | null | undefined): boolean {
    if (val === null || val === undefined || val === ' ') return false;
    const num = Number(val);
    return !isNaN(num) ? true : false;
  }
}

export default Common;
