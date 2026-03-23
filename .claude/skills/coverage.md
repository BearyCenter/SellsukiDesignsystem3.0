---
description: Check test coverage and verify the 70% minimum threshold is met. Use before committing or when CI coverage gate needs to be satisfied. Writes missing tests if coverage is below threshold.
---

Check test coverage and verify the 70% minimum threshold is met.

Execute:
```bash
make check-coverage
```

This runs `go test -coverprofile cover.out ./src/...` then uses `go tool cover -func` to compute total coverage.

After running:
1. Report the total coverage percentage
2. If coverage is **≥ 70%**: confirm passing and list the top 3 packages with lowest coverage as candidates for improvement
3. If coverage is **< 70%**:
   - Identify which packages have the lowest coverage
   - Run `go tool cover -func cover.out` to show per-function coverage
   - Recommend which untested functions are most critical to test
   - Write the missing tests and re-run `make check-coverage` to confirm it now passes

The CI pipeline also runs this check — it must pass before a merge.
