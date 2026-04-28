import { getDistance } from "geolib";
import coordinates from "#data/coordinates.json" with { type: "json" };

export function createPrompt(data) {
  const now = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });

  const minutes = now.getHours() * 60 + now.getMinutes();

  const time = now.toLocaleTimeString("en-IN", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });

  const officeDistance = getDistance(coordinates.office, {
    latitude: parseFloat(data.latitude),
    longitude: parseFloat(data.longitude),
  });

  const homeDistance = getDistance(coordinates.home, {
    latitude: parseFloat(data.latitude),
    longitude: parseFloat(data.longitude),
  });

  const prompt = [`It's currently ${time}.`];

  if (parseInt(data.batteryLevel) < 20) {
    prompt.push(`My phone battery is critically low at ${data.batteryLevel}%.`);
    prompt.push("Please don't start overthinking if my phone dies.");
  }

  if (minutes < 10 * 60 + 30 && homeDistance < 250) {
    prompt.push("I am leaving home for office.");
    prompt.push(`I will reach office in ${data.officeTime}.`);
  } else if (minutes > 17 * 60 + 30 && officeDistance < 250) {
    prompt.push("I am leaving office for home.");
    prompt.push(`I will reach home in ${data.homeTime}.`);
  } else if (homeDistance > 250 && officeDistance > 250 && minutes > 20 * 60) {
    prompt.push(`I am currently in transit near "${data.address}".`);
    prompt.push(`I will reach home in ${data.homeTime}.`);
  }

  prompt.push("Write a WhatsApp message to Chiku with lot of emojis.");

  return prompt.join(" ");
}
