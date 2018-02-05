/**
 * WordpressTelegramBot.js
 * =====================
 * Wordpress Telegram Bot made with love and nodejs
 *
 * @author:     Patryk Rzucidlo [@ptkdev] <support@ptkdev.io> (https://ptkdev.it)
 * @file:       bot.js
 * @version:    0.1
 *
 * @license:    Code and contributions have 'GNU General Public License v3'
 *              This program is free software: you can redistribute it and/or modify
 *              it under the terms of the GNU General Public License as published by
 *              the Free Software Foundation, either version 3 of the License, or
 *              (at your option) any later version.
 *              This program is distributed in the hope that it will be useful,
 *              but WITHOUT ANY WARRANTY; without even the implied warranty of
 *              MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *              GNU General Public License for more details.
 *              You should have received a copy of the GNU General Public License
 *              along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @link        Homepage:     https://wordpress-telegram-bot.js.ptkdev.io
 *              GitHub Repo:  https://github.com/social-manager-tools/wordpress-telegram-bot.js
 */

/**
 * Libs
 * =====================
 * telegraf and other open source library
 *
 * @author:     Patryk Rzucidlo [@ptkdev] <info@ptkdev.it> (https://ptkdev.it)
 * @license:    This code and contributions have 'GNU General Public License v3'
 * @version:    0.1
 * @link:       https://github.com/telegraf/telegraf
 * @changelog:  0.1 initial release
 *
 */
const Telegraf = require('telegraf');
const config = require(__dirname + '/config');
const path = require('path');
const request = require('request');

/**
 * Init
 * =====================
 * Get token and username of bot from /config.js
 * If not exist rename config.js.tmpl to config.js and change strings
 *
 * @author:     Patryk Rzucidlo [@ptkdev] <info@ptkdev.it> (https://ptkdev.it)
 * @license:    This code and contributions have 'GNU General Public License v3'
 * @version:    0.1
 * @changelog:  0.1 initial release
 *
 */
const bot = new Telegraf(config.bot_token, {username: config.bot_username});

/**
 * Webhook
 * =====================
 * Webhook Socket.
 * If in config.js you enabled webhook. If webhook is enabled polling is disabled.
 *
 * @author:     Patryk Rzucidlo [@ptkdev] <info@ptkdev.it> (https://ptkdev.it)
 * @license:    This code and contributions have 'GNU General Public License v3'
 * @link:       http://telegraf.js.org/#/?id=startwebhook 
 * @version:    0.1
 * @changelog:  0.1 initial release
 *
 */
if(config.webhook){
    // npm install -g localtunnel && lt --port 3000
    bot.telegram.setWebhook(config.webhook_host+config.webhook_secretpath);
}

/**
 * Router
 * =====================
 * Commands and hears (reply message). Core of bot.
 *
 * @author:     Patryk Rzucidlo [@ptkdev] <info@ptkdev.it> (https://ptkdev.it)
 * @license:    This code and contributions have 'GNU General Public License v3'
 * @version:    0.1
 * @changelog:  0.1 initial release
 *
 */
require(__dirname + '/routes/commands')(bot, config, request);
require(__dirname + '/routes/email')(bot, config, request);

/**
 * Polling
 * =====================
 * Telegraf Socket.
 * If in config.js you enabled webhook this polling is disabled.
 *
 * @author:     Patryk Rzucidlo [@ptkdev] <info@ptkdev.it> (https://ptkdev.it)
 * @license:    This code and contributions have 'GNU General Public License v3'
 * @link:       http://telegraf.js.org/#/?id=startpolling
 * @version:    0.1
 * @changelog:  0.1 initial release
 *
 */
if(!config.webhook){
    bot.startPolling();
}

/**
 * Command: start
 * =====================
 * Send "Hello!" and help message
 *
 * @author:     Patryk Rzucidlo [@ptkdev] <info@ptkdev.it> (https://ptkdev.it)
 * @license:    This code and contributions have 'GNU General Public License v3'
 * @version:    0.1
 * @changelog:  0.1 initial release
 *
 */
function start(ctx) {
    ctx.reply('Hello!');
    help(ctx);
}
bot.command('start', start);