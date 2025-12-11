/**
 * 取得當前 Unix 時間戳（秒）。
 *
 * @returns Unix 時間戳字串
 */
export function getTimestamp(): string {
  return String(Math.floor(Date.now() / 1000));
}

/**
 * 取得當前 Unix 時間戳數字（秒）。
 *
 * @returns Unix 時間戳數字
 */
export function getTimestampNumber(): number {
  return Math.floor(Date.now() / 1000);
}
