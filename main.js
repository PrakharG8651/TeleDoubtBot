import dotenv from "dotenv";
dotenv.config();

import { Telegraf, Markup } from "telegraf";
import fs from "fs";
import path from "path";
import { message } from "telegraf/filters";
import { StudentData } from "./StudentData/StudentSchema.js";

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

// greet new users when they join a group
bot.on("new_chat_members", async (ctx) => {
  const newMembers = ctx.message.new_chat_members;
  for (const member of newMembers) {
    const name = member.first_name || "there";
    await ctx.reply(
      `👋 Welcome to the group, ${name}!\nTo get started, please DM me and press "Verify".`
    );
  }
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
