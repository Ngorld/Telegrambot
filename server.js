const TELEGRAM_BOT_TOKEN = "7038053462:AAHh5dzpS55z8eeMq0dG2wHPtKWPx13OSAs";
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/`;
const http = require("http");

const isDomain = (domain) => {
  const regex = /([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(\.(com|net|me|xyz|org))/g;
  const matches = message.match(regex);
  return matches ? domain.split(".") : false;
};

const getRDAP = async (domain) => {
  const rdap = require("./rdap.json"); // Đường dẫn tới tệp JSON
  const response = await fetch(`${rdap[domain[1]]}/${domain.json(".")}`);
  const data = await response.json();

  return data;
};

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/webhook") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const message = JSON.parse(body);
        console.log(message);
        res.writeHead(200);
        res.end();
      } catch (error) {}
    });
  }
  res.writeHead(404);
  res.end();
});

const PORT = process.env.PORT || 3005;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
