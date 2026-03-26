---
description: Regenerate the HTTP Fiber server interface from TypeSpec sources. Use when TypeSpec (.tsp) files have been modified and the OpenAPI spec and Go interface need to be updated.
---

Regenerate the HTTP Fiber server interface from TypeSpec sources.

Pipeline:
```
TypeSpec (.tsp files)  →  OpenAPI (openapi.yaml)  →  Go Fiber interface (spec.gen.go)
```

---

## Step 1 — Edit TypeSpec sources (if needed)

TypeSpec source files live in `cmd/typespec_openapi_generator/v1/`:

| File | What to change |
|------|---------------|
| `v1/main.tsp` | Service title, auth, add new model/route imports |
| `v1/model/api-response.model.tsp` | Generic wrappers: `ApiResponseModel<T>`, `ErrorResponse`, etc. |
| `v1/model/<domain>.model.tsp` | Domain models: requests, responses, payloads |
| `v1/route/<domain>.route.tsp` | Domain routes |

**To add a new domain:** create `v1/model/<domain>.model.tsp` and `v1/route/<domain>.route.tsp`, then add both imports to `v1/main.tsp`.

---

## Step 2 — Run gen-all

```bash
make gen-all
```

**IMPORTANT — never manually edit `openapi.yaml` or `spec.gen.go`.** Both are always overwritten by `make gen-all`.

---

## Step 3 — Reconcile route.go

After running `make gen-all`, check `src/interface/fiber_server/route/typespec/route.go` against the updated `ServerInterface`:

- **New routes added** → add stub implementations:
  ```go
  func (r routeDemoV1) NewEndpoint(c *fiber.Ctx, ...) error {
      panic("implement me")
  }
  ```
- **Routes removed** → delete the corresponding method from `route.go`
- **Models changed** → update `model_<domain>.go` conversion functions

---

## Step 4 — Compile check

```bash
make unit-test
```

Fix any type mismatches before finishing.
