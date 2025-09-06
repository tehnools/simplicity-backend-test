export interface WeatherApiOptions {
  currentWeather?: boolean
  hourly?: string[]
  daily?: string[]
  timezone?: string
  forecastDays?: number
}

export interface WeatherResponse {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  hourly_units: {
    time: string
    temperature_2m: string
    relative_humidity_2m: string
    wind_speed_10m: string
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    relative_humidity_2m: number[]
    wind_speed_10m: number[]
  }
  current_units?: {
    time: string
    interval: string
    temperature_2m: string
    wind_speed_10m: string
  }
  current?: {
    time: string
    interval: number
    temperature_2m: number
    wind_speed_10m: number
  }
}

export const formatUrl = (url: string, params: Record<string, string | number | boolean>) => {
  const query = new URLSearchParams()
  for (const key in params) {
    query.append(key, params[key].toString())
  }
  return `${url}?${query.toString()}`
}

const FORCAST_API_URL = 'https://api.open-meteo.com/v1/forecast'
export class WeatherClient {
  constructor() {}

  private _client(init: RequestInit = {}, params?: URLSearchParams) {
    const url = formatUrl(FORCAST_API_URL, params ? Object.fromEntries(params) : {})

    return fetch(url, init)
  }

  async getForecast(
    latitude: number,
    longitude: number,
    opts: WeatherApiOptions = {}
  ): Promise<[WeatherResponse, undefined] | [undefined, Error]> {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      hourly: (opts.hourly || []).join(','),
      current_weather: (opts.currentWeather !== false).toString(),
      ...(opts.timezone ? { timezone: opts.timezone } : {}),
      ...(opts.daily ? { daily: opts.daily.join(',') } : {}),
      ...(opts.forecastDays ? { forecast_days: opts.forecastDays.toString() } : {})
    })

    const response = await this._client({ method: 'GET' }, params)
    if (!response.ok) {
      console.error('Error response:', await response.text())
      return [undefined, new Error(`Weather API error: ${response.statusText}`)]
    }

    return [await response.json(), undefined]
  }
}
