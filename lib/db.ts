import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export async function connectToDatabase() {
  const mongodbUri = process.env.MONGODB_URI?.trim();

  if (!mongodbUri) {
    console.warn("MONGODB_URI environment variable is not defined or empty in process.env.");
    return null;
  }

  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached!.promise = mongoose.connect(mongodbUri, opts).then((mongooseInstance) => {
      console.log("Successfully connected to MongoDB");
      return mongooseInstance;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    console.error("MongoDB Connection Error:", e);
    throw e;
  }

  return cached!.conn;
}
