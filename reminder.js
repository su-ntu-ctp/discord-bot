require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const cron = require('node-cron');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  scheduleReminders();
});

function scheduleReminders() {
// Every minute
cron.schedule('* * * * *', () => {
  sendReminder();
});


  // Monday and Wednesday at 7:00 PM
  cron.schedule('0 19 * * 1,3', () => {
    sendReminder();
  });

  // Saturday at 10:00 AM
  cron.schedule('0 10 * * 6', () => {
    sendReminder();
  });
}

function sendReminder() {
  const channel = client.channels.cache.get(process.env.CHANNEL_ID);
  if (!channel) return console.error("Channel not found");

  const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle('Attendance Reminder')
    .setDescription('Please take your attendance by clicking on the link below:')
    .addFields({ name: 'Attendance Link', value: 'https://your-attendance-url.com' })
    .setTimestamp();

  channel.send({ embeds: [embed] });
}

client.login(process.env.TOKEN);