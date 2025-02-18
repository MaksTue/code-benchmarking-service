const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post("/run", (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  const codeFilePath = path.join(__dirname, "code.cpp");
  fs.writeFileSync(codeFilePath, code);

  // Копируем код в контейнер `gcc`
  exec(`docker cp ${codeFilePath} gcc:/app/code.cpp`, (error) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Failed to copy file to container" });
    }

    // Компилируем и запускаем код внутри `gcc`
    const dockerCommand = `docker exec gcc sh -c "g++ /app/code.cpp -o /app/code && /app/code"`;

    exec(dockerCommand, (error, stdout, stderr) => {
      if (error) {
        return res.json({ error: stderr || error.message });
      }
      res.json({ output: stdout });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
