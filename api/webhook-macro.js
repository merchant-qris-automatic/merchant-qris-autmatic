global.paymentState = global.paymentState || { mode: "waiting", expireAt: null };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Error');

  // Menandai transaksi berhasil otomatis
  global.paymentState.mode = "paid";

  // Teruskan informasi rincian mutasi uang masuk ke Telegram
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const { isiNotif } = req.body;

  const pesanTelegram = `✅ *Pemberitahuan DANA Masuk (MacroDroid):*\n\n"${isiNotif}"\n\nHalaman browser korban otomatis langsung dialihkan ke tautan download!`;

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: pesanTelegram, parse_mode: 'Markdown' })
  });

  return res.status(200).json({ status: "success" });
}
