import { SquareClient, SquareEnvironment } from "square";

const environment =
  process.env.SQUARE_ENVIRONMENT === "production" ? SquareEnvironment.Production : SquareEnvironment.Sandbox;

if (!process.env.SQUARE_ACCESS_TOKEN) {
  throw new Error("SQUARE_ACCESS_TOKEN is not set in environment variables");
}

if (!process.env.SQUARE_LOCATION_ID) {
  throw new Error("SQUARE_LOCATION_ID is not set in environment variables");
}

export const square = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment
});

export const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;

export const USE_MOCK_DATA = process.env.USE_MOCK_DATA === "true";

export const serialize = <T>(data: T): T =>
  JSON.parse(
    JSON.stringify(data, (_, value) => {
      if (typeof value === "bigint") return value.toString();
      return value;
    })
  ) as T;
