export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).send('ok');

  const text = req.body.message?.text || "";
  const statusApiUrl = `https://${req.headers.host}/api/status`; 

  if (text.toLowerCase() === "kirim") {
    await fetch(statusApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: "paid" })
    });
  }

  if (text.toLowerCase() === "stop") {
    await fetch(statusApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: "waiting" })
    });
  }

  if (text.toLowerCase() === "gagal") {
    await fetch(statusApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: "failed" })
    });
  }

  res.status(200).send("ok");
}
