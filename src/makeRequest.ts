export const makeRequest = async (
  url: string,
  path: string,
): Promise<{ statusCode: number; data: unknown }> => {
  try {
    const response = await fetch(`${url}${path}`);
    const data = response.headers
      .get("content-type")
      ?.includes("application/json")
      ? await response.json()
      : null;

    return {
      statusCode: response.status,
      data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      data: null,
    };
  }
};
