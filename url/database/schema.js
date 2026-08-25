// MongoDB/Mongoose schema reference.
// Collection: urls
// Indexed fields:
//   shortCode: unique index for O(log n)-style indexed lookup
//   createdAt: descending index for recent records
//
// Example document:
// {
//   longUrl: "https://example.com/very/long/path",
//   shortCode: "aB3xYz9",
//   clicks: 12,
//   createdAt: ISODate(...),
//   lastClickedAt: ISODate(...)
// }
