---
description: Add a new domain error and wire it to an HTTP response code. Arguments format: `<ErrorName> <http_status_code> <error_key_string>`. Use when a new business rule failure needs a named sentinel and an HTTP status mapping.
---

Add a new domain error and wire it to an HTTP response code.

The error to add: $ARGUMENTS
Format: `<ErrorName> <http_status_code> <error_key_string>`
Example: `ErrStoreNotFound 404 store_not_found`

---

## Step 1 — Define the error sentinel

Add to `src/use_case/model/errors.go`:
```go
var <ErrorName> = errors.New("<human readable message>")
```

Read the file first to understand the existing pattern, then append the new error.

---

## Step 2 — Register the HTTP mapping

Add to the `errorList` map in `src/interface/fiber_server/helper/errors.go`:
```go
model.<ErrorName>: {<http_status_code>, "<error_key_string>"},
```

Read the file first, then insert keeping alphabetical order within the map.

---

## Step 3 — Verify the wiring

Confirm the `ErrorHandler` function loops `errorList` via `errors.Is()` — the new entry will be correctly matched when the error propagates from use case → handler → `helper.ErrorHandler()`.

---

## Step 4 — Compile check

```bash
make unit-test
```

Confirm:
- Which file each change was made to
- The exact lines added
- The HTTP status code and key the error will return to clients
