# `<service-name>`

> **Boilerplate:** replace `<service-name>` and `<module-path>` throughout `.claude/` and `.opencode/` when cloning.

Go 1.23 microservice boilerplate following Clean Architecture.
Module: `<module-path>` (e.g. `gitlab.sellsuki.com/sellsuki/<team>/backend/<service-name>`)
Protocols: HTTP (Fiber v2), gRPC, Kafka. Storage: PostgreSQL (GORM), Redis.

## Architecture layers

```
Interface → UseCase → Entity
Repository ─────────→ Entity  (implements UseCase interfaces)
```

| Layer      | Path              | Rule                                |
| ---------- | ----------------- | ----------------------------------- |
| Entity     | `src/entity/`     | Zero project imports                |
| UseCase    | `src/use_case/`   | Only entity + repository interfaces |
| Repository | `src/repository/` | Only entity + repository interfaces |
| Interface  | `src/interface/`  | Only entity + use case              |

Full rules in `.claude/rules/` (auto-loaded):

- `architecture.md` — dependency rules, forbidden imports
- `conventions.md` — naming, error handling, tracing, transactions, HTTP handler pattern
- `testing.md` — table-driven tests, mock pattern, 70% coverage threshold
- `codegen.md` — TypeSpec → OpenAPI → Go pipeline, never-edit files
- `outline-collections.md` — Outline workspace collection IDs
- `project.md` — Jira project + team context for this repo (edit this when cloning)
- `jira.md` — **Jira MCP tool usage, rate limiting rules, correct parameter names, issue type IDs**

## Key source files

| File                                                    | Purpose                                  |
| ------------------------------------------------------- | ---------------------------------------- |
| `src/use_case/use_case.go`                              | UseCase struct + `New(...)` constructor  |
| `src/use_case/repository/repository.go`                 | All repository interfaces                |
| `src/use_case/model/errors.go`                          | Domain error sentinels                   |
| `src/interface/fiber_server/helper/errors.go`           | HTTP error code mapping (`errorList`)    |
| `src/interface/fiber_server/route/typespec/route.go`    | HTTP handler implementations             |
| `src/interface/fiber_server/route/typespec/spec.gen.go` | Generated `ServerInterface` (never edit) |
| `cmd/generics_server/`                                  | Main entry point + dependency wiring     |

## Code generation pipeline

```bash
make gen-all   # TypeSpec → openapi.yaml → spec.gen.go
```

TypeSpec sources: `cmd/typespec_openapi_generator/v1/`

- `model/<domain>.model.tsp` — domain models (namespace `DemoAPI.Model`)
- `route/<domain>.route.tsp` — routes (namespace `DemoAPI.Routes`)
- `main.tsp` — service def + imports
- `tspconfig.yaml` — outputs `openapi.yaml` to `src/interface/fiber_server/route/typespec/`

Never manually edit: `openapi.yaml`, `spec.gen.go`, `*.pb.go`, `*_grpc.pb.go`

## Make targets

| Command                 | What it does                                  |
| ----------------------- | --------------------------------------------- |
| `make run`              | Start HTTP + gRPC + Kafka server              |
| `make gen-all`          | TypeSpec → OpenAPI → Go Fiber interface       |
| `make generate-grpc`    | Regenerate gRPC stubs from .proto             |
| `make unit-test`        | Run all unit tests (`./src/...`)              |
| `make check-coverage`   | Verify ≥ 70% coverage (CI gate)               |
| `make integration-test` | Run tests in `test/` (-p 1)                   |
| `make run-migration`    | Interactive DB migration TUI                  |
| `docker compose up -d`  | Start Postgres:5432, Redis:6379, Jaeger:16686 |

## Slash commands (`.claude/commands/`)

| Command                               | Purpose                                                                       |
| ------------------------------------- | ----------------------------------------------------------------------------- |
| `/new-feature <domain>`               | Scaffold entity → repo interface → mock → GORM impl → use case → HTTP handler |
| `/add-usecase <domain> <Method>`      | Add one use case method with tracing, permission, tests                       |
| `/add-http-route <MethodName>`        | Implement a Fiber route handler from generated interface                      |
| `/add-error <ErrName> <status> <key>` | Add domain error + HTTP status mapping                                        |
| `/gen-http`                           | Run `make gen-all` and reconcile route.go                                     |
| `/gen-grpc`                           | Run `make generate-grpc` and reconcile gRPC server                            |
| `/gen-readme`                         | Generate README.md following Sellsuki README Standard                         |
| `/unit-test`                          | Run tests, report failures, suggest fixes                                     |
| `/coverage`                           | Check 70% threshold, write missing tests if needed                            |
| `/review-arch <path>`                 | Audit for layer violations, missing tracing, bad error handling               |

## Reference

Full architecture guide and conventions: `agents.md`
