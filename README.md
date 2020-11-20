# API team technical assessment

Hello! Thanks for applying to M1 Finance. Below is a small project that is intended to give you an opportunity to showcase your skills to us. Please complete and send it back to your contact within 24 hours. Thanks!

Please complete as much of the project as you are capable of achieving. Use whatever architecture pattern you would like. Third-party libraries for common tasks are encouraged.

## Project

Create a Node API app with three endpoints, listed below.

### Get transactions list

This endpoint should allow the user to request a list of transactions. Source data should be requested from the data endpoint below and may be re-requested on each user request.

The response can differ slightly from the source data, but should generally return the data as-is.

The endpoint should provide a few params that can be used to modify how the data is returned.

- Allow user to filter transactions to return only credits (isCredit = true) or debits (isCredit = false).
- Allow user to sort transactions by date or amount.
  - Only have to support one type of sort at a time.

### Get one transaction details

This endpoint show allow the user to request details for a single transaction. Source data should be requested from the data endpoint below and can be re-requested on each user request.

The endpoint should also augment the response payload with transaction notes (added via the third endpoint listed below).

### Update one transaction notes

The endpoint should allow the user to add notes on a specific transaction. These notes should be a simple string. Each update can overwrite the previously set notes. These notes can be stored in memory (no need to setup any database).

## Data endpoint

```
https://m1-production-client-assets.s3.amazonaws.com/project-data/transactions-v1.json
```

## Notes

- This assessment isn't intended to test your memorization of various APIs. Do feel free to look up documentation, etc. Treat it as you would a task you were assigned to do while on the job.
- You will, however, be expected to be able to speak to your solution!
- Included is a very simple "out-of-the-box" [Express](https://expressjs.com/) setup. While it's provided for convenience, you don't have to use it if you prefer a different setup. If you change it, please include documentation on how to run your app.
- Feel free to import other third-party dependencies if you are comfortable using a specific library.
