import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { writeFileSync, existsSync, mkdirSync } from 'fs'

const { mockProgram, mockActions, mockFs } = vi.hoisted(() => {
  const mockActions: Record<string, Function> = {}
  let currentCommand = 'root'

  const mockProgram: any = {
    name: vi.fn(() => mockProgram),
    description: vi.fn(() => mockProgram),
    version: vi.fn(() => mockProgram),
    command: vi.fn((name) => {
      currentCommand = name
      return mockProgram
    }),
    option: vi.fn(() => mockProgram),
    action: vi.fn((cb) => {
      mockActions[currentCommand] = cb
      return mockProgram
    }),
    parse: vi.fn(),
  }

  const mockFs = {
    writeFileSync: vi.fn(),
    existsSync: vi.fn(),
    mkdirSync: vi.fn(),
  }

  return { mockProgram, mockActions, mockFs }
})

vi.mock('commander', () => ({
  program: mockProgram,
}))

vi.mock('fs', () => mockFs)

describe('CLI', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    vi.spyOn(console, 'log').mockImplementation(() => {})

    // Dynamic import to execute the file code
    await import('../../src/cli/index.js')
  })

  afterEach(() => {
    vi.resetModules()
    vi.restoreAllMocks()
  })

  describe('init command', () => {
    it('應註冊 init 指令', () => {
      expect(mockProgram.command).toHaveBeenCalledWith('init')
      expect(mockActions['init']).toBeDefined()
    })

    it('當設定檔不存在時應建立設定檔', () => {
      const initAction = mockActions['init']
      mockFs.existsSync.mockReturnValue(false)

      initAction({ file: '.env.test' })

      expect(mockFs.existsSync).toHaveBeenCalledWith(expect.stringContaining('.env.test'))
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining('.env.test'),
        expect.stringContaining('NEWEBPAY_MERCHANT_ID'),
      )
    })

    it('當設定檔已存在時應略過', () => {
      const initAction = mockActions['init']
      mockFs.existsSync.mockReturnValue(true)

      initAction({ file: '.env.test' })

      expect(mockFs.writeFileSync).not.toHaveBeenCalled()
    })
  })

  describe('express command', () => {
    it('應註冊 express 指令', () => {
      expect(mockProgram.command).toHaveBeenCalledWith('express')
      expect(mockActions['express']).toBeDefined()
    })

    it('當目錄不存在時應建立範例專案', () => {
      const expressAction = mockActions['express']
      mockFs.existsSync.mockReturnValue(false)

      expressAction({ output: 'test-dir' })

      expect(mockFs.mkdirSync).toHaveBeenCalledWith(expect.stringContaining('test-dir'), {
        recursive: true,
      })
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining('package.json'),
        expect.any(String),
      )
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining('index.js'),
        expect.any(String),
      )
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining('.env.example'),
        expect.any(String),
      )
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining('README.md'),
        expect.any(String),
      )
    })

    it('當目錄已存在時應略過', () => {
      const expressAction = mockActions['express']
      mockFs.existsSync.mockReturnValue(true)

      expressAction({ output: 'test-dir' })

      expect(mockFs.mkdirSync).not.toHaveBeenCalled()
    })
  })
})
