import * as wol from "wol";
import { promisify } from "util";
import { App } from "@slack/bolt";

const wake = promisify(wol.wake);

console.log(process.env);

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.command("/wakeonlan", async ({ command, ack, respond }) => {
  await ack();

  const allowedUserIds = process.env.SLACK_USER_IDS?.split(",")?.map((id) =>
    id.trim()
  );
  if (allowedUserIds && !allowedUserIds.includes(command.user_id)) {
    await respond("This user is not allowed to use wake on LAN.");
    return;
  }

  const macAddress = command.text || process.env.MAC_ADDRESS;
  if (!macAddress) {
    await respond("Please specify MAC address.");
    return;
  }

  await wake(macAddress);
  await respond(`Sent wake-on-LAN packet to ${macAddress}.`);
});

(async () => {
  await app.start();
  console.log("App started");
})();
