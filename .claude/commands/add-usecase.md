Add a new use case method to an existing domain.

Target: $ARGUMENTS
Format: `<domain> <MethodName>`
Example: `order CancelOrder`

Read `agents.md` and `src/use_case/<domain>.go` first to understand the existing patterns, then implement the new method.

---

## Step 1 — Understand the domain

Read:
- `src/entity/<domain>/<domain>.go` — domain struct and validation
- `src/use_case/repository/repository.go` — available repository methods
- `src/use_case/<domain>.go` — existing use case methods for context

---

## Step 2 — Add the method signature

Append to `src/use_case/<domain>.go`:
```go
func (uc UseCase) <MethodName>(ctx context.Context, id identity.Identity, ...) (..., error) {
    ctx, sp := tracer.Start(ctx, "use_case.<MethodName>")
    defer sp.End()

    // 1. checkPermission (always first if auth is required)
    if err := uc.checkPermission(ctx, id, access_control.Permission..., ...); err != nil {
        sp.RecordError(err)
        return ..., err
    }
    sp.AddEvent("check permission, allowed")

    // 2. Validate input
    if err := input.Validate(); err != nil {
        sp.RecordError(err)
        return ..., err
    }
    sp.AddEvent("validate data")

    // 3. Repository call(s)
    // sp.AddEvent at each step

    return result, nil
}
```

Rules:
- `ctx` is always the first parameter
- `identity.Identity` is always second if auth is required
- Use `sp.RecordError(err)` before every `return ..., err`
- Use `sp.AddEvent("...")` at each meaningful checkpoint
- If modifying state: use `WithTransaction` variant and defer rollback

---

## Step 3 — Add missing repository methods (if needed)

If the use case needs a repository method that does not exist yet:
1. Add it to the interface in `src/use_case/repository/repository.go`
2. Add a mock implementation in `src/use_case/repository/mock_<domain>_repository.go`
3. Add the implementation to `src/repository/<domain>_repository/postgres_gorm.go`
4. Add the dummy stub to `src/repository/<domain>_repository/dummy.go`

---

## Step 4 — Add domain errors (if needed)

If new sentinel errors are needed, add them to `src/use_case/model/errors.go` and register in `src/interface/fiber_server/helper/errors.go`.

---

## Step 5 — Write tests

Add tests to `src/use_case/<domain>_test.go` (create it if it doesn't exist).
Use mock repositories from `src/use_case/repository/mock_<domain>_repository.go`.
Cover: happy path, permission denied, validation error, repository error.

---

## Step 6 — Compile and test

```bash
make unit-test
```

All tests must pass before finishing.
