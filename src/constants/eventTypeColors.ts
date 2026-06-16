export const colorBasedOnEventType = new Map<string, string>([
  ["fun", "#FFB703"],
  ["meeting", "#219EBC"],
  ["family", "#8ECAE6"],
  ["others", "#9B9B9B"],
]);

export const getEventTypeColor = (eventType?: string) =>
  colorBasedOnEventType.get(eventType || "fun") ?? "#9B9B9B";
