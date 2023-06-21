const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const deterministicPartitionKey = (event) => {
  let candidate = getPartitionKeyCandidate(event);

  if (!candidate) return TRIVIAL_PARTITION_KEY;

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = hash(candidate);
  }

  return candidate;
};

function getPartitionKeyCandidate(event) {
  if (!event) return null;

  if (typeof event.partitionKey !== "string") {
    return JSON.stringify(event.partitionKey) || hash(JSON.stringify(event));
  }

  return event.partitionKey || hash(JSON.stringify(event));
}

function hash(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

module.exports = {
  deterministicPartitionKey,
  getPartitionKeyCandidate,
  hash,
};
