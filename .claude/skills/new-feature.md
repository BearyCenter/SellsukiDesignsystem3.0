---
description: Scaffold a complete new feature for the domain named $ARGUMENTS. Use when the user asks to add a new domain, entity, or feature end-to-end following Clean Architecture.
---

Scaffold a complete new feature for the domain named: $ARGUMENTS

Follow Clean Architecture strictly. The domain name is the Go package name (snake_case, e.g. `widget`).

Read `agents.md` first to understand project conventions, then complete all steps below in order.

---

## Step 1 — Entity: `src/entity/<domain>/`

Create `src/entity/<domain>/<domain>.go` with:
- A struct named with PascalCase (e.g. `Widget`) containing domain fields
- Slug-formatted string fields use the `validate:"required,min=2,max=64,slug"` tag
- A `Validate() error` method using `go-playground/validator/v10` — register the `slug` custom validator (copy the pattern from `src/entity/store/store.go`)
- Package-level sentinel: `var ErrInvalid<Domain>Data = errors.New("invalid <domain> data")`

Create `src/entity/<domain>/<domain>_test.go` with table-driven tests for all validation paths (positive + each negative case).

---

## Step 2 — Repository Interface: `src/use_case/repository/repository.go`

Add a new `<Domain>Repository` interface with:
```go
type <Domain>Repository interface {
    HealthChecker
    Create<Domain>(ctx context.Context, d <domain>.<Domain>) (string, error)
    Create<Domain>WithTransaction(ctx context.Context, d <domain>.<Domain>) (string, Transaction, error)
    List<Domain>(ctx context.Context, f FilterOption, l ListOption, s SortOption) ([]<domain>.<Domain>, error)
    Count<Domain>(ctx context.Context, f FilterOption) (int, error)
    Get<Domain>ById(ctx context.Context, id string) (<domain>.<Domain>, error)
    Update<Domain>ById(ctx context.Context, id string, d <domain>.<Domain>) error
}
```

Import the new entity package at the top of the file.

---

## Step 3 — Repository Mock: `src/use_case/repository/mock_<domain>_repository.go`

Create a mock struct following the exact pattern of an existing mock in that directory.

---

## Step 4 — Repository Implementation: `src/repository/<domain>_repository/`

Create these files following the exact pattern of an existing repository:

**`<domain>_repository.go`** — tracer var:
```go
package <domain>_repository
import "go.opentelemetry.io/otel"
var tracer = otel.Tracer("<domain>_repository")
```

**`postgres_gorm_model.go`** — GORM model struct + `To<Domain>()` + `<domain>ToGorm<Domain>()` conversion functions.

**`postgres_gorm.go`** — `gormPostgres` struct implementing the `<Domain>Repository` interface using GORM. Include `HealthCheck`, `Name`, and all CRUD methods. Use `g.db.WithContext(ctx)`.

**`postgres_gorm_options.go`** — `applyPgFilterOption`, `applyPgListOption`, `applyPgSortOption` switch functions.

**`dummy.go`** — no-op stub implementing all interface methods, returning zero values.

---

## Step 5 — UseCase: `src/use_case/<domain>.go`

Create use case methods:
```go
func (uc UseCase) Create<Domain>(ctx context.Context, id identity.Identity, d <domain>.<Domain>) (string, error) {
    ctx, sp := tracer.Start(ctx, "use_case.Create<Domain>")
    defer sp.End()
    // 1. checkPermission
    // 2. d.Validate()
    // 3. uc.<domain>Repository.Create<Domain>(ctx, d)
    // 4. sp.AddEvent at each step
}
```

---

## Step 6 — Wire: `src/use_case/use_case.go`

Add `<domain>Repository repository.<Domain>Repository` field to `UseCase` struct and to `New(...)` signature.

---

## Step 7 — Wire: `cmd/generics_server/`

Instantiate `<domain>_repository.NewDummy()` and pass it to `use_case.New(...)`.

---

## Step 8 — HTTP Route (optional, if an API is needed)

In `src/interface/fiber_server/route/typespec/`:
1. Add request/response structs in a new `model_<domain>.go`
2. Add handler methods to `route.go` following the handler pattern

---

## Step 9 — Domain Errors

If new domain errors are needed, add them to `src/use_case/model/errors.go` and register HTTP mappings in `src/interface/fiber_server/helper/errors.go` `errorList` map.

---

After all files are created, run:
```bash
make unit-test
```
Fix any compilation or test errors before finishing.
