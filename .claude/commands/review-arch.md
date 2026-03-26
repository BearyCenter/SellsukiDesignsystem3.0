Review the code at: $ARGUMENTS

Perform a Clean Architecture compliance review based on the dependency rules for this project.

Read `agents.md` for the full layer rules, then check the target path for these violations:

---

## Dependency Rule Violations (CRITICAL)

The allowed dependency directions are:
```
Interface  → UseCase
Interface  → Entity
UseCase    → Entity
UseCase    → Repository interfaces (src/use_case/repository/)
Repository → Entity
Repository → UseCase interfaces ONLY (never concrete use cases)
Entity     → (nothing — zero imports from this project)
```

Flag any import that goes in the wrong direction, e.g.:
- An entity file importing from use_case or repository
- An interface adapter importing from a repository package (`src/repository/...`)
- A use case file importing from an interface package (`src/interface/...`)
- A repository implementation importing from another repository

---

## Business Logic in Wrong Layer

Flag any of:
- Business rules or domain validation inside `src/interface/` (HTTP handlers, gRPC services, Kafka workers)
- Database queries or external API calls directly in `src/use_case/` (should go through repository interfaces)
- Entity methods that make network calls or depend on frameworks

---

## Missing Observability

In use case methods, check for:
- Missing `tracer.Start(ctx, "use_case.MethodName")` + `defer sp.End()`
- Missing `sp.RecordError(err)` before returning errors
- Missing `sp.AddEvent(...)` at key checkpoints

---

## Error Handling

Check for:
- Bare `errors.New(...)` returned from a use case (should be a defined sentinel in `model/errors.go`)
- Errors from repository calls not being wrapped with `fmt.Errorf("context: %w", err)`
- HTTP-specific status codes or response structures inside use case or entity layers

---

## Transaction Safety

In use case methods that use `WithTransaction`:
- Is there a `defer tx.Rollback()` guarded by a `committed` bool?
- Is `tx.Commit()` called before the function returns on the happy path?

---

## Output Format

For each issue found:
1. File path and line number
2. Severity: CRITICAL / WARNING / SUGGESTION
3. Description of the violation
4. Suggested fix

End with a summary: total issues by severity, and an overall pass/fail verdict.
