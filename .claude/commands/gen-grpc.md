Regenerate gRPC Go code from all `.proto` files.

Execute:
```bash
make generate-grpc
```

This installs `protoc-gen-go` and `protoc-gen-go-grpc` then runs `protoc` on all proto files under `src/interface/grpc_server/`.

Generated files (never manually edit these):
- `*.pb.go` — protobuf message definitions
- `*_grpc.pb.go` — gRPC service stubs

After running:
1. List which `.proto` files were processed
2. Check if any service implementations in `*_grpc_server.go` files no longer satisfy the updated generated server interface
3. If new RPC methods were added to a proto:
   - Add stub implementations in the corresponding `*_grpc_server.go` file following the existing pattern in `src/interface/grpc_server/order_service/order_service_grpc_server.go`
   - Add a model mapper function in `*_grpc_model.go` if new message types are involved
4. Run `make unit-test` to confirm everything compiles
