import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
console.log("This is awesome");

// Get the file path from the url of the current module
const __filename = fileURLToPath(import.meta.url);

// Get the directory name from the file path
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get("/", (req, res) => {
  res.sendStatus(200);
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/auth', authRoutes);

app.use('/todos', todoRoutes);



app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
