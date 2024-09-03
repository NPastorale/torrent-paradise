const express = require("express");
const pug = require("pug");
const fs = require("fs");
const path = require("path");

const app = express();

// Compile Pug templates
const compiledTemplate = (templateName) => {
  const templatePathPug = path.join(process.cwd(), `${templateName}.pug`); // Path to Pug template
  if (fs.existsSync(templatePathPug)) {
    return pug.compileFile(templatePathPug);
  } else {
    return null;
  }
};

// Serve HTML files directly
const serveHtml = (req, res) => {
  const templateName = req.url.replace(/^\//, ""); // Get the template name from URL
  const templatePathHtml = path.join(process.cwd(), `${templateName}.html`); // Path to HTML file

  if (fs.existsSync(templatePathHtml)) {
    fs.createReadStream(templatePathHtml).pipe(res);
  } else {
    res.status(404).send("Not Found");
  }
};

// Set up Express server
app.use(express.static("public")); // Serve static files from the public directory

// Route for serving HTML files and compiling Pug templates
app.get("*", (req, res) => {
  const templateName = req.url.replace(/^\//, ""); // Get the template name from URL

  if (!templateName) {
    serveHtml(req, res);
  } else {
    const compiledPugTemplate = compiledTemplate(templateName);

    if (compiledPugTemplate !== null) {
      const html = compiledPugTemplate(); // Render the HTML
      res.send(html);
    } else {
      serveHtml(req, res);
    }
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
