import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;
// app.use(express.json());

// Get the file path from the url of the current module
const __filename = fileURLToPath(import.meta.url);

// Get the directory name from the file path
const __dirname = dirname(__filename)
console.log("This is awesome");
// const data = ["Chris"];
app.use(express.static(path.join(__dirname, '../public')));

app.get("/", (req, res) => {
  res.sendStatus(200);
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
//   res.sendFile(path.join(dirname(fileURLToPath(import.meta.url)), 'public', 'index.html'));
});

// app.get("/dashboard", (req, res) => {
//   res.send("<h1>You are on the dashboard page</h1>");
// });

// app.get("/api/data", (req, res) => {
//   res.send(`
//         <body style="background: black; color: purple;">
//         <h1>Data resources</h1>
//         <p style="color: blue;">${data}</p>
//         </body>
//         `);
// });

// app.post("/api/data", (req, res) => {
//   newData = req.body;
//   data.push(newData.name);
//   console.log(data);
//   res.sendStatus(201);
// });

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
