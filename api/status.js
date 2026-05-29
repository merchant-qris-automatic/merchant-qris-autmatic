global.paymentState = global.paymentState || { mode: "waiting", expireAt: null };

export default async function handler(req, res) {
  // Ambil waktu sekarang
  const sekarang = Date.now();

  // Validasi otomatis: Jika status masih loading tetapi waktu 8 menit di server sudah terlewati
  if (global.paymentState.mode === "loading" && global.paymentState.expireAt && sekarang > global.paymentState.expireAt) {
    global.paymentState.mode = "failed";
  }

  // Respon ke frontend dengan mengirim data URL rahasia dari sisi server
  if (global.paymentState.mode === "paid") {
    res.status(200).json({
      mode: "paid",
      redirectUrl: "https://download-file-video.edgeone.app/" // LINK DI SISI GITHUB BACKEND
    });
    // Kembalikan status ke default setelah berhasil dibaca frontend
    global.paymentState.mode = "waiting";
    return;
  }

  if (global.paymentState.mode === "failed") {
    res.status(200).json({ mode: "failed" });
    global.paymentState.mode = "waiting";
    return;
  }

  res.status(200).json({ mode: global.paymentState.mode });
}
