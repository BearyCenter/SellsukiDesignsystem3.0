---
description: Add a new use case method to an existing domain. Arguments format: `<domain> <MethodName>`. Use when the user needs to implement new business logic in an existing domain without scaffolding a full feature.
---

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

    if err := uc.checkPermission(ctx, id, ...); err != nil {
        sp.RecordError(err)
        return ..., err
    }
    sp.AddEvent("check permission, allowed")

    if err := input.Validate(); err != nil {
        sp.RecordError(err)
        return ..., err
    }
    sp.AddEvent("validate data")

    // repository call(s) with sp.AddEvent at each step

    return result, nil
}
```

Rules:
- `ctx` is always the first parameter
- `identity.Identity` is always second if auth is required
- Use `sp.RecordError(err)` before every `return ..., err`
- If modifying state: use `WithTransaction` variant and defer rollback

---

## Step 3 — Add missing repository methods (if needed)

1. Add to interface in `src/use_case/repository/repository.go`
2. Add mock in `src/use_case/repository/mock_<domain>_repository.go`
3. Add implementation in `src/repository/<domain>_repository/postgres_gorm.go`
4. Add dummy stub in `src/repository/<domain>_repository/dummy.go`

---

## Step 4 — Add domain errors (if needed)

Add to `src/use_case/model/errors.go` and register in `src/interface/fiber_server/helper/errors.go`.

---

## Step 5 — Write tests

Add tests to `src/use_case/<domain>_test.go`.
Cover: happy path, permission denied, validation error, repository error.

---

## Step 6 — Compile and test

```bash
make unit-test
```

All tests must pass before finishing.
