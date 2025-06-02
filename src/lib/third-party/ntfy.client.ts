export const sendNtfyNotification = async (message: string) => {
  await fetch('https://ntfy.sh/hibarr-notifications', {
    method: 'POST',
    body: message,
  });
};