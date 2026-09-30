/**
 * Import Node's built-in test functions.
 */
import { describe, test, expect } from "vitest";

/**
 * Import the function being tested.
 */
import { subtractMonths } from "../src/date-utils.js";


/**  Unit 1 testing  */
/**
 * Test the subtractMonths function.
 */
describe("subtractMonths()", () => {

  /**
   * Test normal month subtraction.
   */
  test("subtracts six months from a date", () => {

    const date = new Date(2026, 7, 28);

    const result = subtractMonths(date, 6);

    expect(result.getFullYear()).toBe(2026);

    expect(result.getMonth()).toBe(1);

    expect(result.getDate()).toBe(28);
  });


  /**
   * Test subtracting one month.
   * with edge cases
   */
  test("subtracts one month correctly", () => {

    const date = new Date(2026, 7, 28);

    const result = subtractMonths(date, 1);

    expect(result.getFullYear()).toBe(2026);

    expect(result.getMonth()).toBe(6);

    expect(result.getDate()).toBe(28);
  });


  /**
   * Test subtracting twelve months.
   * with edge cases
   */
  test("subtracts twelve months correctly", () => {

    const date = new Date(2026, 7, 28);

    const result = subtractMonths(date, 12);

    expect(result.getFullYear()).toBe(2025);

    expect(result.getMonth()).toBe(7);

    expect(result.getDate()).toBe(28);
  });


  /**
   * Test a zero-month calculation.
   * with edge cases
   */
  test("zero months returns the same date", () => {

    const date = new Date(2026, 7, 28);

    const result = subtractMonths(date, 0);

    expect(result.getTime()).toBe(date.getTime());
  });


  /**
   * Test that the original Date object is not changed.
   */
  test("does not modify the original date", () => {

    const date = new Date(2026, 7, 28);

    subtractMonths(date, 6);

    expect(date.getFullYear()).toBe(2026);

    expect(date.getMonth()).toBe(7);

    expect(date.getDate()).toBe(28);
  });

});




/** Unit test 2 added */

/**
 * Import the Vitest testing functions.
 */
import { describe, test, expect } from "vitest";

/**
 * Import the functions being tested.
 */
import {
  subtractMonths,
  formatDate
} from "../src/date-utils.js";


/**
 * Tests for subtractMonths().
 */
describe("subtractMonths()", () => {

  /**
   * Test six-month subtraction.
   */
  test("subtracts six months from a date", () => {

    const date = new Date(2026, 7, 28);

    const result = subtractMonths(date, 6);

    expect(result.getFullYear()).toBe(2026);

    expect(result.getMonth()).toBe(1);

    expect(result.getDate()).toBe(28);
  });


  /**
   * Test one-month subtraction.
   */
  test("subtracts one month correctly", () => {

    const date = new Date(2026, 7, 28);

    const result = subtractMonths(date, 1);

    expect(result.getFullYear()).toBe(2026);

    expect(result.getMonth()).toBe(6);

    expect(result.getDate()).toBe(28);
  });


  /**
   * Test twelve-month subtraction.
   * WIth Edge cases
   */
  test("subtracts twelve months correctly", () => {

    const date = new Date(2026, 7, 28);

    const result = subtractMonths(date, 12);

    expect(result.getFullYear()).toBe(2025);

    expect(result.getMonth()).toBe(7);

    expect(result.getDate()).toBe(28);
  });


  /**
   * Test zero months.
   * With edge cases
   */
  test("zero months returns the same date", () => {

    const date = new Date(2026, 7, 28);

    const result = subtractMonths(date, 0);

    expect(result.getTime()).toBe(date.getTime());
  });


  /**
   * Test that the original date remains unchanged.
   * WIth edge cases
   */
  test("does not modify the original date", () => {

    const date = new Date(2026, 7, 28);

    subtractMonths(date, 6);

    expect(date.getFullYear()).toBe(2026);

    expect(date.getMonth()).toBe(7);

    expect(date.getDate()).toBe(28);
  });

});


/**
 * Tests for formatDate().
 * With edge cases
 */
describe("formatDate()", () => {

  /**
   * Test a normal date.
   */
  test("formats a normal date correctly", () => {

    const date = new Date(2026, 7, 28);

    expect(formatDate(date)).toBe("2026-08-28");
  });


  /**
   * Test a single-digit month.
   */
  test("adds a leading zero to a single-digit month", () => {

    const date = new Date(2026, 1, 5);

    expect(formatDate(date)).toBe("2026-02-05");
  });


  /**
   * Test a single-digit day.
   */
  test("adds a leading zero to a single-digit day", () => {

    const date = new Date(2026, 7, 5);

    expect(formatDate(date)).toBe("2026-08-05");
  });


  /**
   * Test January.
   */
  test("formats January correctly", () => {

    const date = new Date(2026, 0, 1);

    expect(formatDate(date)).toBe("2026-01-01");
  });


  /**
   * Test December.
   */
  test("formats December correctly", () => {

    const date = new Date(2026, 11, 31);

    expect(formatDate(date)).toBe("2026-12-31");
  });

});


