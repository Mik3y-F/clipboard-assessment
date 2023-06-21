const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  let candidate = getPartitionKey(event);

  if (!candidate) return TRIVIAL_PARTITION_KEY;

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = hash(candidate);
  }

  return candidate;
};

function getPartitionKey(event) {
  if (!event) return null;

  return event.partitionKey || hash(JSON.stringify(event));
}

function hash(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}
