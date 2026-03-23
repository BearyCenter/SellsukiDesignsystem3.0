# Testing Rules

## Structure

Unit tests are co-located with source files: `src/entity/order/order_test.go`, `src/use_case/store_test.go`, etc.

Integration tests are in `test/` and require a running database.

## Test Priority Order

1. **Entity tests** (highest) — cover every `Validate()` path and every state machine transition
2. **UseCase tests** — inject mock repositories, test every business logic branch
3. **Repository tests** — test model conversion functions and query correctness with `go-sqlmock`
4. **Interface adapter tests** — test request/response DTO transformation

## Table-Driven Tests (required pattern)

```go
func TestFunctionName(t *testing.T) {
    type args struct { /* inputs */ }
    type want struct { /* expected outputs */ }

    tests := []struct {
        name    string
        args    args
        want    want
        wantErr bool
    }{
        {name: "success - valid input", ...},
        {name: "error - missing required field", ...},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := FunctionUnderTest(tt.args...)
            if tt.wantErr {
                assert.Error(t, err)
                return
            }
            assert.NoError(t, err)
            assert.Equal(t, tt.want.result, got)
        })
    }
}
```

## Mock Repositories for UseCase Tests

Use the mocks in `src/use_case/repository/mock_<domain>_repository.go`:

```go
func TestUseCase_Method(t *testing.T) {
    uc := use_case.New(
        &repository.MockPermissionRepository{
            CheckPermissionFn: func(...) error { return nil },
        },
        // ... other mocks
    )
    result, err := uc.Method(context.Background(), identity, input)
    assert.NoError(t, err)
}
```

Always test these branches per use case method: happy path, permission denied, validation error, repository error.

## Coverage Threshold

**CI requires ≥ 70% test coverage.** Check with:
```bash
make check-coverage   # fails the build if below threshold
make coverage-test-html  # open visual report in browser
```

Run before committing: `make unit-test`

## Commands

```bash
make unit-test          # run all unit tests (./src/...)
make integration-test   # run integration tests sequentially (-p 1)
make coverage-test      # generate cover.out
make check-coverage     # verify 70% threshold
make benchmark-test     # run benchmarks
```
