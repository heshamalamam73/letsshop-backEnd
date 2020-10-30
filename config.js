export default {
  MONGODB_URL:
    process.env.MONGODB_URL ||
    "mongodb://mido:mido2014@ds129801.mlab.com:29801/amazona",
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "somethingscert",
};
