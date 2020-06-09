import * as mongoose from "mongoose";
const { MONGO_URI } = process.env;
mongoose.connect(`${MONGO_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.on("connected", () => {
  console.log("Mongo Db Conectado");
});
mongoose.connection.on("error", (err) => {
  console.log("Error con Mongoose");
  console.log(err);
});
mongoose.connection.on("disconnected", () => {
  console.log("Se ha perdido la conexion con mongo");
});
export default mongoose;
