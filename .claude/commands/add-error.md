Add a new domain error and wire it to an HTTP response code.

The error to add: $ARGUMENTS

Format of $ARGUMENTS: `<ErrorName> <http_status_code> <error_key_string>`
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

Read the file first, then insert the new entry keeping alphabetical order within the map.

---

## Step 3 — Verify the wiring

Read `src/interface/fiber_server/helper/errors.go` fully to confirm:
- The `ErrorHandler` function looks up `errorList` via `errors.Is()` (it loops the map)
- The new entry will be correctly matched when the error propagates from use case → route handler → `helper.ErrorHandler()`

---

## Step 4 — Compile check

Run:
```bash
make unit-test
```

Confirm no compilation errors. If the error is not yet returned anywhere in use case code, that is fine — the sentinel is ready for use.

---

## Output

Confirm:
- Which file each change was made to
- The exact lines added
- The HTTP status code and key the error will return to clients
