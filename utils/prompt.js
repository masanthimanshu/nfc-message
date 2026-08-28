import { getDistance } from "geolib";
import coordinates from "#data/coordinates.json" with { type: "json" };

function resolveLocationState(data, minutes, homeDistance, officeDistance) {
  const isAtHome = homeDistance < 250;
  const isAtOffice = officeDistance < 250;

  if (isAtHome) {
    return minutes < 10.5 * 60
      ? `I am leaving home for office. I will reach office in ${data.officeTime}.`
      : "I am currently at home and thinking about you.";
  }

  if (isAtOffice) {
    return minutes > 17.5 * 60
      ? `I am leaving office for home. I will reach home in ${data.homeTime}.`
      : "I am currently in office and thinking about you.";
  }

  return minutes > 20 * 60
    ? `I am currently in transit near "${data.address}". I will reach home in ${data.homeTime}.`
    : `I am currently somewhere near "${data.address}".`;
}

export function createPrompt(data) {
  const now = new Date();
  const time = now.toLocaleTimeString("en-IN", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });

  const kolkataDate = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  );

  const minutes = kolkataDate.getHours() * 60 + kolkataDate.getMinutes();

  const coords = {
    latitude: parseFloat(data.latitude),
    longitude: parseFloat(data.longitude),
  };

  const homeDistance = getDistance(coordinates.home, coords);
  const officeDistance = getDistance(coordinates.office, coords);

  const parts = [
    `It's currently ${time}.`,
    `Weather is currently "${data.weather}" at my place.`,
  ];

  if (parseInt(data.batteryLevel, 10) < 20) {
    parts.push(
      `My phone battery is critically low at ${data.batteryLevel}%
      Please don't start your overthinking if my phone dies 😘.`,
    );
  }

  parts.push(resolveLocationState(data, minutes, homeDistance, officeDistance));
  parts.push("Write a WhatsApp message to Chiku with lot of emojis.");

  return parts.join(" ");
}
