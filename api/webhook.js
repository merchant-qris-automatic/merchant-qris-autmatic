export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  // Baca pesan dari Telegram
  const message = req.body.message?.text || "";
  global.userStatus = global.userStatus || {};

  // Deteksi jika Anda mengetik "kirim [SESSION]" atau "Stop [SESSION]"
  if (message.toLowerCase().startsWith("kirim ")) {
    const session = message.split(" ")[1].toUpperCase();
    global.userStatus[session] = "kirim";
  } else if (message.toLowerCase().startsWith("stop ")) {
    const session = message.split(" ")[1].toUpperCase();
    global.userStatus[session] = "stop";
  }

  res.status(200).send("OK");
}
