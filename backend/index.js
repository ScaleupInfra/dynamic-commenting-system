const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

const comments = [];

app.use(express.json());
app.use(cors());

app.get("/comments", (req, res) => {
  const commentHTML = `
    <ul>
    ${comments
      .map(
        (p) => `
      <li>
        <p>${p}</p>
      </li>
    `
      )
      .join("")}
    </ul>
  `;

  res.send(commentHTML);
});

app.get("/add-comments", (req, res) => {
  const newComment = req.query.comment;
  if (newComment) {
    comments.push(newComment);
    const commentHTML = `
    <ul>
      ${comments
        .map(
          (p) => `
        <li>
          <p>${p}</p>
        </li>
      `
        )
        .join("")}
      </ul>
    `;
    res.send(commentHTML);
  } else {
    res.status(400).json({ error: "Comment cannot be empty" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
