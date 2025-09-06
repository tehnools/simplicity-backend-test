const FORCAST_API_URL = "https://api.open-meteo.com/v1/forecast";

export interface WeatherApiOptions {
  currentWeather?: boolean;
  hourly?: string[];
  daily?: string[];
  timezone?: string;
  forecastDays?: number;
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: {
    time: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
  };
  current_units?: {
    time: string;
    interval: string;
    temperature_2m: string;
    wind_speed_10m: string;
  };
  current?: {
    time: string;
    interval: number;
    temperature_2m: number;
    wind_speed_10m: number;
  };
}

export class WeatherClient {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getForecast(
    latitude: number,
    longitude: number,
    opts: WeatherApiOptions = {},
  ): Promise<[WeatherResponse, undefined] | [undefined, Error]> {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    });
    const response = await fetch(`${FORCAST_API_URL}`);

    if (!response.ok) {
      console.error("Error response:", await response.text());
      return [
        undefined,
        new Error(`Weather API error: ${response.statusText}`),
      ];
    }

    return [await response.json(), undefined];
  }
}
