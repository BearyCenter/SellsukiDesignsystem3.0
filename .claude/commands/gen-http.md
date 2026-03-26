Regenerate the HTTP Fiber server interface from TypeSpec sources.

This is a two-step pipeline managed by a single make target:

```
TypeSpec (.tsp files)  →  OpenAPI (openapi.yaml)  →  Go Fiber interface (spec.gen.go)
```

Run both steps with:
```bash
make gen-all
```

---

## Step 1 — Edit TypeSpec sources (if needed)

TypeSpec source files live in `cmd/typespec_openapi_generator/v1/`:

| File | What to change |
|------|---------------|
| `v1/main.tsp` | Service title, auth, add new model/route imports |
| `v1/model/api-response.model.tsp` | Generic wrappers: `ApiResponseModel<T>`, `ErrorResponse`, etc. |
| `v1/model/order.model.tsp` | Order domain models: requests, responses, payloads |
| `v1/model/store.model.tsp` | Store domain models: requests, responses |
| `v1/route/store.route.tsp` | `/company`, `/store`, `/store/{id}/order` routes |
| `v1/route/order.route.tsp` | `/order` routes |

**To add a new domain:** create `v1/model/<domain>.model.tsp` and `v1/route/<domain>.route.tsp`, then add both imports to `v1/main.tsp`.

**Naming conventions (follow umamu-api pattern):**
- Model files: `<domain>.model.tsp`
- Route files: `<domain>.route.tsp`
- Model namespace: `DemoAPI.Model`
- Route namespace: `DemoAPI.Routes`
- Request payloads: `<Action><Domain>Request`
- Responses: `<Domain>Response`, `<Domain>ListResponse`
- Routes: `@tag("<domain>")`, `@route("/<domain>")`, nested namespaces for sub-resources

---

## Step 2 — Run gen-all

```bash
make gen-all
```

This executes two commands in sequence:

**2a. TypeSpec compile:**
```bash
cd cmd/typespec_openapi_generator && npx tsp compile v1/ --output-dir ../../src/interface/fiber_server/route/typespec
```
Reads `v1/tspconfig.yaml` (emit: `@typespec/openapi3`, output-file: `openapi.yaml`) and writes:
- `src/interface/fiber_server/route/typespec/openapi.yaml`

**2b. Go code generation:**
```bash
go run cmd/generate_fiber_interface/main.go
```
Reads `src/interface/fiber_server/route/*/openapi.yaml` via `oapi-codegen` and overwrites:
- `src/interface/fiber_server/route/typespec/spec.gen.go` — `ServerInterface`, route registration, parameter structs

**IMPORTANT — never manually edit `openapi.yaml` or `spec.gen.go`**. Both are always overwritten by `make gen-all`.

---

## Step 3 — Reconcile route.go

After running `make gen-all`, check if `src/interface/fiber_server/route/typespec/route.go` still satisfies the updated `ServerInterface`:

**If new routes were added to TypeSpec** → add stub implementations to `route.go`:
```go
func (r routeDemoV1) NewEndpoint(c *fiber.Ctx, ...) error {
    //TODO implement me
    panic("implement me")
}
```

**If routes were removed** → delete the corresponding method from `route.go`.

**If request/response models changed** → update `model_<domain>.go` conversion functions (`from<Domain>Request`, `to<Domain>Response`).

---

## Step 4 — Compile check

```bash
make unit-test
```

Confirms the project compiles and all existing tests still pass. Fix any type mismatches before finishing.

---

## Quick reference: pipeline file locations

| Stage | File |
|-------|------|
| TypeSpec entry | `cmd/typespec_openapi_generator/v1/main.tsp` |
| TypeSpec config | `cmd/typespec_openapi_generator/v1/tspconfig.yaml` |
| TypeSpec models | `cmd/typespec_openapi_generator/v1/model/*.model.tsp` |
| TypeSpec routes | `cmd/typespec_openapi_generator/v1/route/*.route.tsp` |
| Generated OpenAPI | `src/interface/fiber_server/route/typespec/openapi.yaml` |
| Generated Go interface | `src/interface/fiber_server/route/typespec/spec.gen.go` |
| Route implementations | `src/interface/fiber_server/route/typespec/route.go` |
| Request/response DTOs | `src/interface/fiber_server/route/typespec/model_<domain>.go` |
