

const fs = require('fs');
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

let accountsData = {}; // Object to store user balances and vouch streaks

// Function to load user data from file
function loadAccounts() {
    try {
        const data = fs.readFileSync('accounts.json');
        accountsData = JSON.parse(data);
    } catch (err) {
        console.error("Error loading accounts:", err);
    }
}

// Function to save user data to file
function saveAccounts() {
    try {
        fs.writeFileSync('accounts.json', JSON.stringify(accountsData));
    } catch (err) {
        console.error("Error saving accounts:", err);
    }
}

// Load accounts when the bot is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    loadAccounts();
});

// Function to handle user messages
client.on('messageCreate', (message) => {
    const userId = message.author.id;
    const content = message.content.toLowerCase(); // Convert message content to lowercase
if (content === 'n help') {
