import express from "express";
import dotenv from "dotenv";
import { connectdb } from "./config/db.js";
import productRoutes from "./routes/products.routes.js";
import path from "path";
const __dirname = path.resolve();
dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/products", productRoutes);
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/frontend/dist')))
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
}
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectdb();
  console.log("Server is running on http://localhost:" + PORT);
});
