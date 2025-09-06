import { describe, it, expect, beforeEach, vi } from 'vitest'
import { WeatherClient, WeatherResponse } from './weather.service.js'

describe('WeatherClient', () => {
  let client: WeatherClient
  const mockApiKey = 'test-api-key'

  beforeEach(() => {
    client = new WeatherClient(mockApiKey)
    vi.resetAllMocks()
  })

  it('should be defined', () => {
    expect(client).toBeDefined()
  })

  it('should initialize with API key', () => {
    expect(client).toBeInstanceOf(WeatherClient)
  })

  describe('getForecast', () => {
    const mockResponse: WeatherResponse = {
      latitude: 52.52,
      longitude: 13.41,
      generationtime_ms: 0.123,
      utc_offset_seconds: 0,
      timezone: 'GMT',
      timezone_abbreviation: 'GMT',
      elevation: 100,
      hourly_units: {
        time: 'iso8601',
        temperature_2m: '°C',
        relative_humidity_2m: '%',
        wind_speed_10m: 'km/h'
      },
      hourly: {
        time: ['2023-01-01T00:00'],
        temperature_2m: [20],
        relative_humidity_2m: [50],
        wind_speed_10m: [10]
      }
    }

    it('should fetch weather forecast successfully', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      })

      const [response, error] = await client.getForecast(52.52, 13.41)

      expect(error).toBeUndefined()
      expect(response).toEqual(mockResponse)
      expect(fetch).toHaveBeenCalledWith('https://api.open-meteo.com/v1/forecast')
    })

    it('should handle API errors', async () => {
      const errorMessage = 'API Error'
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        statusText: errorMessage,
        text: () => Promise.resolve('Error details')
      })

      const [response, error] = await client.getForecast(52.52, 13.41)

      expect(response).toBeUndefined()
      expect(error).toBeInstanceOf(Error)
      expect(error?.message).toBe(`Weather API error: ${errorMessage}`)
    })

    it('should handle network errors', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

      await expect(client.getForecast(52.52, 13.41)).rejects.toThrow('Network error')
    })
  })
})
