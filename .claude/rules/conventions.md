# Code Conventions

## Naming

- **Packages**: `snake_case` — `use_case`, `order_repository`, `fiber_server`
- **Constructors**: `New()` or `NewXxx()` — `New(...)`, `NewGormPostgres(...)`, `NewDummy()`
- **Repository implementations**: named by technology — `postgres_gorm.go`, `ory_keto_grpc.go`, `dummy.go`
- **GORM models**: `postgresGorm<Entity>Model` — private struct in `postgres_gorm_model.go`
- **HTTP DTOs**: `<Entity>Request`, `<Entity>Response`, `<Entity>ListResponse`
- **Repository packages**: always use `_repository` suffix to avoid conflicts with entity names

## Error Handling

Define sentinel errors at the correct layer:
- Domain validation errors: `var ErrInvalid<Domain>Data = errors.New(...)` in `src/entity/<domain>/`
- Business rule errors: `var Err<Condition> = errors.New(...)` in `src/use_case/model/errors.go`
- Wrap with context: `fmt.Errorf("create order: %w", err)`
- Check with: `errors.Is(err, model.ErrOrderNotFound)`
- Register HTTP status mapping in `src/interface/fiber_server/helper/errors.go` `errorList` map
- In use cases: always call `sp.RecordError(err)` before returning an error

## Tracing (mandatory in every use case method)

```go
func (uc UseCase) MethodName(ctx context.Context, ...) (..., error) {
    ctx, sp := tracer.Start(ctx, "use_case.MethodName")
    defer sp.End()

    // checkpoint after each significant operation:
    sp.AddEvent("check permission, allowed")
    sp.AddEvent("validate data")
    sp.AddEvent("create <entity>")

    // before every return with error:
    sp.RecordError(err)
    return ..., err
}
```

## Transaction Safety

Use the `WithTransaction` repository variant and always guard `Rollback` with a committed flag:

```go
id, tx, err := uc.repo.CreateWithTransaction(ctx, entity)
if err != nil {
    return "", err
}
committed := false
defer func() {
    if !committed {
        tx.Rollback()
    }
}()

// ... additional operations ...

if err := tx.Commit(); err != nil {
    return "", fmt.Errorf("commit: %w", err)
}
committed = true
```

## Repository Options Pattern

Queries use composable marker interfaces — never raw parameters:

```go
type FilterOption interface{ FilterOption() }
type ListOption  interface{ ListOption() }
type SortOption  interface{ SortOption() }
```

Concrete option structs live in `src/use_case/repository/option_*.go`. Repository implementations use a `switch f.(type)` to handle each concrete type.

## HTTP Handler Pattern

```go
func (r routeDemoV1) HandlerName(c *fiber.Ctx, ...) error {
    // 1. Extract identity (if auth required)
    id, err := helper.GetIdentityFromHeader(c)
    if err != nil {
        return helper.ErrorHandler(c, err)
    }

    // 2. Parse body
    var req RequestType
    if err := c.BodyParser(&req); err != nil {
        return helper.ErrorHandler(c, err)
    }

    // 3. Call use case — ALWAYS c.UserContext() to propagate traces
    result, err := r.useCase.Method(c.UserContext(), id, ...)
    if err != nil {
        return helper.ErrorHandler(c, err)
    }

    return c.JSON(ResponseType{...})
}
```

**Never** put business logic in handlers. **Never** use `context.Background()` — always `c.UserContext()`.
