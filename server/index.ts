import express from "express";
import cors from "cors";

import { getEmails } from "./EmailController";
import { ImapDataModel } from "@/shared/models/ImapDataModel";

const PORT = process.env.PORT || 5000;

async function createServer() {
  const app = express();
  app.use(cors());

  app.post("/getEmails", express.json(), async (req, res) => {
    const {
      startIndex,
      stopIndex,
      imapData,
    }: { startIndex: number; stopIndex: number; imapData: ImapDataModel } =
      req.body;
    const emails = await getEmails(
      { from: startIndex, to: stopIndex },
      imapData
    );
    res.json(emails);
  });

  app.get("/api/v1", (req, res) => {
    res.send({ message: "Hello from server!" });
  });

  return { app };
}

createServer().then(({ app }) => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
