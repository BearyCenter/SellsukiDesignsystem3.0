Implement a new HTTP route handler in the Fiber server.

Route to implement: $ARGUMENTS
Format: `<MethodName>` — the name of the method on `ServerInterface` in `spec.gen.go`
Example: `CompanyStoreCreateStore`

Read `agents.md` first, then follow these steps.

---

## Step 1 — Understand the generated interface

Read `src/interface/fiber_server/route/typespec/spec.gen.go` and find the method signature:
```go
<MethodName>(c *fiber.Ctx, ...) error
```
Note all parameters (path params, query params, request body type).

---

## Step 2 — Understand the use case

Read the use case method this route will call:
- `src/use_case/*.go` — find the corresponding use case method
- Understand input parameters, return values, and possible errors

---

## Step 3 — Add request/response models (if needed)

If the route uses new request/response structs not already in `model_*.go` files:
- Add to `src/interface/fiber_server/route/typespec/model_<domain>.go`
- Implement `from<Entity>Request()` and `to<Entity>Response()` conversion functions
- Keep all business logic out of these conversion functions

---

## Step 4 — Implement the handler

In `src/interface/fiber_server/route/typespec/route.go`, replace the `panic("implement me")` stub with a real implementation:

```go
func (r routeDemoV1) <MethodName>(c *fiber.Ctx, ...) error {
    // 1. Extract identity (if auth required)
    id, err := helper.GetIdentityFromHeader(c)
    if err != nil {
        return helper.ErrorHandler(c, err)
    }

    // 2. Parse request body (if applicable)
    var req <RequestType>
    if err := c.BodyParser(&req); err != nil {
        return helper.ErrorHandler(c, err)
    }

    // 3. Convert to domain/use case model
    input, err := fromRequest(req)
    if err != nil {
        return helper.ErrorHandler(c, err)
    }

    // 4. Call use case — always pass c.UserContext() for trace context
    result, err := r.useCase.<UseCaseMethod>(c.UserContext(), id, ...)
    if err != nil {
        return helper.ErrorHandler(c, err)
    }

    // 5. Return response
    return c.JSON(<ResponseType>{...})
}
```

Rules:
- NEVER add business logic here — route handlers are pure translation
- ALWAYS use `c.UserContext()` (not `context.Background()`)
- ALWAYS use `helper.ErrorHandler(c, err)` for errors
- ALWAYS use `helper.GetIdentityFromHeader(c)` for identity extraction

---

## Step 5 — Register new domain errors (if needed)

If the use case returns errors not yet in the `errorList` in `src/interface/fiber_server/helper/errors.go`, add the HTTP mappings.

---

## Step 6 — Compile and test

```bash
make unit-test
```

All tests must pass. If the route is expected to be called directly, also run the integration tests:
```bash
make integration-test
```
