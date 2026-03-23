# Clean Architecture Rules

This project enforces strict unidirectional dependencies across four layers.

## Dependency Direction

```
Interface  →  UseCase  →  Entity
Repository  ────────────→  Entity
```

| Layer | Package path | Can import |
|-------|-------------|-----------|
| Entity | `src/entity/` | nothing from this project |
| UseCase | `src/use_case/` | `src/entity/`, `src/use_case/repository/` (interfaces only) |
| Repository | `src/repository/` | `src/entity/`, `src/use_case/repository/` (interfaces only) |
| Interface | `src/interface/` | `src/entity/`, `src/use_case/` |

**Forbidden imports — never do these:**
- Entity importing from any other layer
- UseCase importing from `src/interface/` or `src/repository/`
- Interface importing from `src/repository/` (concrete implementations)
- Repository importing from `src/interface/` or `src/use_case/` (only interfaces allowed)

## Layer Responsibilities

**Entity (`src/entity/<domain>/`)** — Pure domain. No framework dependencies. Contains structs, `Validate()` methods, state machine interfaces/implementations, and domain sentinel errors (`var ErrInvalid<Domain>Data = errors.New(...)`).

**UseCase (`src/use_case/`)** — Business logic only. Orchestrates repositories via interfaces. Never queries databases or calls external APIs directly. All methods accept `ctx context.Context` as first parameter.

**Repository (`src/repository/<domain>_repository/`)** — Data access. Implements interfaces from `src/use_case/repository/`. Each domain gets its own package. Every package provides at least two implementations: a real one (e.g. `postgres_gorm.go`) and a `dummy.go` stub.

**Interface (`src/interface/`)** — Translation only. No business logic. Converts external request/response formats to/from use case inputs/outputs. Must use `helper.ErrorHandler(c, err)` for all errors, `c.UserContext()` for context, and `helper.GetIdentityFromHeader(c)` for identity.
