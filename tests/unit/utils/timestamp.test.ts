import { describe, it, expect, beforeEach } from 'bun:test'
import { getTimestamp, getTimestampNumber } from '../../../src/utils/timestamp.js'

describe('Timestamp Utils', () => {
  describe('getTimestamp', () => {
    it('應該返回字串格式的時間戳', () => {
      const timestamp = getTimestamp()
      expect(typeof timestamp).toBe('string')
      expect(timestamp.length).toBeGreaterThan(0)
    })

    it('應該返回 Unix 時間戳（秒）', () => {
      const timestamp = getTimestamp()
      const timestampNum = Number.parseInt(timestamp, 10)
      const now = Math.floor(Date.now() / 1000)

      // 允許 1 秒的誤差
      expect(Math.abs(timestampNum - now)).toBeLessThanOrEqual(1)
    })

    it('應該返回純數字字串', () => {
      const timestamp = getTimestamp()
      expect(/^\d+$/.test(timestamp)).toBe(true)
    })
  })

  describe('getTimestampNumber', () => {
    it('應該返回數字格式的時間戳', () => {
      const timestamp = getTimestampNumber()
      expect(typeof timestamp).toBe('number')
      expect(Number.isInteger(timestamp)).toBe(true)
    })

    it('應該返回 Unix 時間戳（秒）', () => {
      const timestamp = getTimestampNumber()
      const now = Math.floor(Date.now() / 1000)

      // 允許 1 秒的誤差
      expect(Math.abs(timestamp - now)).toBeLessThanOrEqual(1)
    })

    it('應該返回正整數', () => {
      const timestamp = getTimestampNumber()
      expect(timestamp).toBeGreaterThan(0)
    })
  })

  describe('一致性測試', () => {
    it('getTimestamp 和 getTimestampNumber 應該返回相同的值', () => {
      const timestampStr = getTimestamp()
      const timestampNum = getTimestampNumber()

      expect(Number.parseInt(timestampStr, 10)).toBe(timestampNum)
    })

    it('連續呼叫應該返回遞增的值', () => {
      const timestamp1 = getTimestampNumber()
      // 等待一小段時間
      Bun.sleepSync(10) // 10ms
      const timestamp2 = getTimestampNumber()

      // 由於時間很短，可能相同或相差 1 秒
      expect(timestamp2).toBeGreaterThanOrEqual(timestamp1)
    })
  })
})

