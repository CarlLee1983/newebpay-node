export class MockNewebPayServer {
  // Simple in-memory mock server for testing Webhooks locally
  // Not implemented fully yet, just a placeholder as requested.
  // In real usage, this would start an express server that can be hit by the developer's app
  // and manually trigger "Send Notification" to localhost.
  start(port: number) {
    console.log(`Mock NewebPay Server started at port ${port}`)
  }
}
