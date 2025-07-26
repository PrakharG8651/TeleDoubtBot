import dotenv from "dotenv";
dotenv.config();

import checkMailFormat from "./utils/mailFormat.js";

import { Telegraf, Markup } from "telegraf";
import fs from "fs";
import path from "path";
import { message } from "telegraf/filters";
import { StudentData } from "./StudentData/StudentSchema.js";
import sendOtp from "./utils/mailsending.js";

// bot setup
const bot = new Telegraf(process.env.BOT_TOKEN);

//the maps needed for temporary authorization
const awaitingEmail = new Map();
const userIdMail = new Map();
const awaitOtp = new Map();

// start command
bot.start((ctx) => {
  console.log(ctx.from.id);
  ctx.reply(
    "Welcome! ICS is here for your help.\nPlease verify your mail",
    Markup.inlineKeyboard([
      [Markup.button.callback("Verify", "start_verification")],
    ])
  );
});

bot.command("menu", (ctx) => {
  ctx.reply(
    "Choose from the keyboard:",
    Markup.keyboard([["Help", "Settings"], ["About"]]).resize() // adjusts size
  );
});

bot.hears("Help", (ctx) => ctx.reply("You asked for Help!"));
bot.hears("Settings", (ctx) => ctx.reply("Here are your settings."));

bot.command("bitch", (ctx) => {
  ctx.reply(
    "Choose an option:",
    Markup.inlineKeyboard([[Markup.button.callback("Option 1", "opt1")]])
  );
});

bot.action("start_verification", async (ctx) => {
  const userId = ctx.from.id;

  await ctx.answerCbQuery();
  await ctx.reply("Please enter your IITK webmail:");

  // Mark this user as awaiting email
  awaitingEmail.set(userId, true);
});

bot.on("text", async (ctx) => {
  const userId = ctx.from.id;
  if (awaitingEmail.has(userId)) {
    let userEmail = ctx.message.text;
    if (checkMailFormat(userEmail)) {
      const mail = userEmail.trim();
      const otp = await sendOtp(mail);
      awaitOtp.set(userId, otp);
      awaitingEmail.delete(userId); // <-- clear email state
      console.log("The mail is succesfully send");
    }
  } else if (awaitOtp.has(userId)) {
    await ctx.reply("Please enter the otp: ");

    let userOtp = ctx.message.text;
    userOtp = userOtp.trim();
    if (awaitOtp.get(userId) === userOtp) {
      ctx.reply("You are verified welcome user.");
    } else {
      console.log("FUCK NO");
    }
  }
});

// bot.hears("Verify", (ctx) => {
//   ctx.reply("We need to ver");
// });

// additional handlers
bot.help((ctx) => ctx.reply("Send me a sticker"));

bot.hears("hi", (ctx) => console.log(ctx.from));

// launch
bot.launch();

// graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
