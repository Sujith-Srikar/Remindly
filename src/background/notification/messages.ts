const RETRY_MESSAGES = [
  "Hey. The thing. Remember the thing? Yeah, that.",
  "Your future self sent me. They're concerned.",
  "Just checking in before procrastination wins.",
  "Not to be dramatic, but now would be a great time.",
  "Quick side quest unlocked.",
  "Low-key important. High-key easy to ignore.",
  "Friendly reminder before future you gets annoyed."
];

const GOODBYE_MESSAGES = [
  "Fine. Ignore me. Future-you is already drafting the complaint.",
  "Can't wait to hear 'I totally forgot' later.",
  "You're free. Do with that freedom what you will.",
  "Whatever happens next is character development.",
  "I tried. History will remember that I tried.",
  "This feels like a mistake, but it's your mistake now.",
  "The rest is between you and future-you."
];

const randomMessage = (messages: string[]) =>
  messages[Math.floor(Math.random() * messages.length)];

export const randomRetryMessage = () => {
    return randomMessage(RETRY_MESSAGES);
}

export const randomGoodByeMessage = () => {
    return randomMessage(GOODBYE_MESSAGES);
}