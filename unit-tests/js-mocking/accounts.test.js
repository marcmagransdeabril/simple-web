// accountModule.test.js
import { describe, it, expect, beforeEach, vi } from "vitest";
import { checkBalance } from "./accounts.js";

global.fetch = vi.fn();

describe("AccountModule - checkBalance (3 Main Cases)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return true when amountCredits (1000) > amountDebits (100)", async () => {
    const mockResponse = {
      amountCredits: 1000,
      amountDebits: 100,
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await checkBalance("account123");

    expect(result).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://www.example.com/deposits/account123"
    );
  });

  it("should return false when amountCredits (100) < amountDebits (1000)", async () => {
    const mockResponse = {
      amountCredits: 100,
      amountDebits: 1000,
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await checkBalance("account123");

    expect(result).toBe(false);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://www.example.com/deposits/account123"
    );
  });

  it("should return false when response has error instead of amounts", async () => {
    const mockResponse = {
      error: "this is non-conformant",
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await checkBalance("account123");

    // undefined > undefined evaluates to false
    expect(result).toBe(false);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://www.example.com/deposits/account123"
    );
  });
});
