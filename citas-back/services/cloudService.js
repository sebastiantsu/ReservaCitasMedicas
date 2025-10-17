async function upload(file) {
  if (!file) throw new Error('No file provided');
  // simular URL devuelta
  return { url: `https://cloud.example.com/${file.originalname || 'file'}` };
}

module.exports = { upload };
