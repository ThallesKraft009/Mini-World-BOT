import config from './client.js';
import c from 'colors';
const token = config.token

export default async function (endpoint, options) {
  const url = `https://discord.com/api/v10/${endpoint}`;

  if (options.body) options.body = JSON.stringify(options.body);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${token}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
    },
    ...options
  });

  if (!res.ok) {
    const data = await res.json();
    console.log(`${res.status}\n`, c.red(JSON.stringify(data)));
    // throw new Error(JSON.stringify(data));
  }

  return res;
      }
        