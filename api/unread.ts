import type { VercelRequest, VercelResponse } from "@vercel/node";

import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";

export default function (request: VercelRequest, response: VercelResponse) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.status(200).json(generateData());
}

function generateMessage() {
  return {
    id: uuidv4(),
    from: faker.internet.email(),
    subject: `Hello from ${faker.person.firstName()} ${faker.person.lastName()}!`,
    body: `Long message body here`,
    received: faker.date
      .between({ from: Date.now() - 5, to: Date.now() })
      .getTime(),
  };
}

function generateData() {
  const messages = Array.from({ length: 10 }, generateMessage);
  return {
    status: "ok",
    timestamp: Date.now(),
    messages: messages,
  };
}
