# Third-party notice: shein-cart

The direct SHEIN shared-cart reader in `tools/shein-direct-reader.mjs` is an adaptation of the link-resolution, shared-cart endpoint, and `armorUuid` retry approach in `shein-cart` by Ibrahim Hajjaj, upstream revision `e0476ec1fdeced753f0009566aa1c920282f2a34`.

- Upstream: https://github.com/ibrahimhajjaj/shein-cart
- License: MIT; full license text is in `vendor/shein-cart/LICENSE`.
- Changes in this project: strict HTTPS/host/path allowlists, guarded redirects, request and response-size limits, no cart cache or persistence, no share URLs or raw request/response bodies in logs, returned data restricted to normalized product fields, no purchase or cart mutation, currency validation, and quantity omission until the customer enters it.

The original project is not bundled as a dependency. This project uses an adapted, reduced implementation for KB's server-side read-only path.
