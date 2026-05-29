global.statusMode = global.statusMode || "waiting";
global.expireAt = global.expireAt || null;

export default async function handler(req, res) {
  const sekarang = Date.now();

  // VALIDASI TIMER KADALUARSA 8 MENIT DI SISI BACKEND
  if (global.statusMode === "loading" && global.expireAt && sekarang > global.expireAt) {
    global.statusMode = "failed";
  }

  // UPDATE STATUS INTERNAL (Melalui pemanggilan POST antar API internal)
  if(req.method === "POST"){
    global.statusMode = req.body.mode;
    if(req.body.mode === "loading") {
      global.expireAt = Date.now() + (8 * 60 * 1000);
    }
    return res.status(200).json({ success: true });
  }

  // GET STATUS (Dipanggil berkala oleh mekanisme polling di index.html)
  const responseData = { mode: global.statusMode };

  if (global.statusMode === "paid") {
    // LINK PENGALIHAN DI SISI BACKEND GITHUB GUNA KEAMANAN TOTAL
    responseData.downloadUrl = "https://download-file-video.edgeone.app/";
    
    // Auto-reset state ke default setelah data sukses terkirim ke client
    setTimeout(() => { global.statusMode = "waiting"; global.expireAt = null; }, 4000);
  } else if (global.statusMode === "failed") {
    setTimeout(() => { global.statusMode = "waiting"; global.expireAt = null; }, 4000);
  }

  res.status(200).json(responseData);
}
