"use strict";

const SAFE_TRANSPORT_CODES = new Set([
  "ECONNABORTED",
  "ECONNREFUSED",
  "ECONNRESET",
  "EAI_AGAIN",
  "ENOTFOUND",
  "ETIMEDOUT",
  "UND_ERR_CONNECT_TIMEOUT",
  "UND_ERR_HEADERS_TIMEOUT",
  "UND_ERR_SOCKET",
]);

function createSheinReaderSafeLogger(write = (...args) => console.warn(...args)) {
  return function logSheinReaderFailure({
    response = null,
    error = null,
    hasData = false,
    providerError = false,
  } = {}) {
    const status = Number.isInteger(response?.status)
      && response.status >= 100
      && response.status <= 599
      ? response.status
      : null;

    let category;
    let code;
    if (error) {
      const timedOut = error.name === "TimeoutError"
        || error.name === "AbortError"
        || error.code === "ETIMEDOUT"
        || error.code === "UND_ERR_CONNECT_TIMEOUT"
        || error.code === "UND_ERR_HEADERS_TIMEOUT";
      category = timedOut ? "timeout" : "network_error";
      code = timedOut
        ? "TIMEOUT"
        : SAFE_TRANSPORT_CODES.has(error.code)
          ? error.code
          : "NETWORK_ERROR";
    } else if (!response) {
      category = "no_response";
      code = "NO_RESPONSE";
    } else if (!response.ok) {
      category = "http_error";
      code = status === null ? "HTTP_ERROR" : `HTTP_${status}`;
    } else if (!hasData) {
      category = "invalid_response";
      code = "INVALID_RESPONSE";
    } else if (providerError) {
      category = "provider_error";
      code = "UPSTREAM_ERROR";
    } else {
      return;
    }

    write("[shein-reader]", JSON.stringify({ category, status, code }));
  };
}

module.exports = createSheinReaderSafeLogger;
