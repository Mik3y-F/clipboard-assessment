const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  // Test when event is provided but partitionKey is not
  it("generates a hash of the event when event has no partition key", () => {
    const event = { data: "data" };
    const expected = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(event))
      .digest("hex");
    const result = deterministicPartitionKey(event);
    expect(result).toBe(expected);
  });

  // Test when event is provided and partitionKey is a string
  it("uses event partition key when it is a string", () => {
    const event = { partitionKey: "key" };
    const result = deterministicPartitionKey(event);
    expect(result).toBe(event.partitionKey);
  });

  it("stringifies event partition key when it is not a string", () => {
    const event = { partitionKey: { key: "key" } };
    const result = deterministicPartitionKey(event);
    expect(result).toBe(JSON.stringify(event.partitionKey));
  });

  it("hashes partition key when it is too long", () => {
    const longKey = "a".repeat(300);
    const event = { partitionKey: longKey };
    const expected = crypto
      .createHash("sha3-512")
      .update(longKey)
      .digest("hex");
    const result = deterministicPartitionKey(event);
    expect(result).toBe(expected);
  });

  it("uses partition key when its length is equal to the maximum", () => {
    const maxKey = "a".repeat(256);
    const event = { partitionKey: maxKey };
    const result = deterministicPartitionKey(event);
    expect(result).toBe(maxKey);
  });

  it("uses partition key when its length is less than the maximum", () => {
    const shortKey = "a".repeat(255);
    const event = { partitionKey: shortKey };
    const result = deterministicPartitionKey(event);
    expect(result).toBe(shortKey);
  });
});
