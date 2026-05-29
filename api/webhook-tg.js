global.paymentState = global.paymentState || { mode: "waiting", expireAt: null };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).send('OK');

  const body = req.body;
  if (!body.message || !body.message.text) return res.status(200).send('OK');

  const perintah = body.message.text.trim().toLowerCase();

  if (perintah === "kirim") {
    global.paymentState.mode = "paid";
  } else if (perintah === "stop") {
    global.paymentState.mode = "waiting";
  } else if (perintah === "gagal") {
    global.paymentState.mode = "failed";
  }

  return res.status(200).send('OK');
}

