Run all unit tests for the project and report the results.

Execute:
```bash
make unit-test
```

This runs `go test -v ./src/...` which covers all four architecture layers:
- `src/entity/` — domain entity validation and state machine tests
- `src/use_case/` — business logic tests with mock repositories
- `src/repository/` — data access model conversion and query tests
- `src/interface/` — adapter transformation tests (if any)

After running:
1. Report how many tests passed, failed, or were skipped per package
2. Show the full output of any failures with the test name, expected vs actual, and file location
3. If all tests pass, show total count and confirm coverage
4. If there are failures, identify the root cause and suggest a fix — then apply it if it is straightforward

Do NOT mark this task complete until all tests pass.
