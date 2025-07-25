require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const fs = require("fs");
const path = require("path");
const { message } = require("telegraf/filters");
import { StudentData } from "./StudentData/StudentSchema";

// bot setup
const bot = new Telegraf(process.env.BOT_TOKEN);

// start command
bot.start((ctx) => {
  console.log(ctx.from.id);
  ctx.reply(
    "Welcome! ICS is here for your help. \n ",
    "Please verify your mail",
    Markup.keyboard([["Verify"]])
      .resize()
      .oneTime()
  );
});

bot.hears("Verify", (ctx) => {
  ctx.reply("We need to ver");
});

// additional handlers
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => console.log(ctx.from));

// launch
bot.launch();

// graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
