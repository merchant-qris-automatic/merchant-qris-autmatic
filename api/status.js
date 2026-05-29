// Objek global untuk menyimpan status command dari Telegram
global.userStatus = global.userStatus || {};

export default function handler(req, res) {
  const { session } = req.query;
  const status = global.userStatus[session] || "waiting";
  
  // Hapus status jika sudah diambil (untuk mencegah loop)
  if (status === "kirim" || status === "stop") {
      delete global.userStatus[session];
  }

  res.status(200).json({ status });
}
