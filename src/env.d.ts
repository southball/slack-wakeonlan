declare namespace NodeJS {
  interface ProcessEnv {
    readonly SLACK_APP_TOKEN: string;
    readonly SLACK_BOT_TOKEN: string;
    readonly SLACK_SIGNING_SECRET: string;
    readonly SLACK_USER_IDS: string | undefined;
    readonly MAC_ADDRESS: string | undefined;
  }
}
