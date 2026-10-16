import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function optimizeImagesInDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let totalBefore = 0;
  let totalAfter = 0;
  let count = 0;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const res = await optimizeImagesInDir(fullPath);
      totalBefore += res.totalBefore;
      totalAfter += res.totalAfter;
      count += res.count;
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const originalBuffer = fs.readFileSync(fullPath);
        const originalSize = originalBuffer.length;
        totalBefore += originalSize;

        try {
          const image = sharp(originalBuffer);
          const metadata = await image.metadata();

          let pipeline = sharp(originalBuffer);
          // Scale to max 800x800 for high density mobile/desktop retina while keeping tiny size
          if ((metadata.width && metadata.width > 800) || (metadata.height && metadata.height > 800)) {
            pipeline = pipeline.resize(800, 800, {
              fit: 'inside',
              withoutEnlargement: true
            });
          }

          if (ext === '.png') {
            pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
          } else {
            pipeline = pipeline.jpeg({ quality: 75, mozjpeg: true, progressive: true });
          }

          const buffer = await pipeline.toBuffer();
          // Only overwrite if it actually saved space
          if (buffer.length < originalSize) {
            fs.writeFileSync(fullPath, buffer);
            totalAfter += buffer.length;
          } else {
            totalAfter += originalSize;
          }
          count++;
        } catch (err) {
          console.error(`Error processing ${entry.name}:`, err.message);
          totalAfter += originalSize;
        }
      }
    }
  }
  return { totalBefore, totalAfter, count };
}

async function run() {
  console.log('Optimizing images in public/products...');
  const res = await optimizeImagesInDir(path.join(__dirname, '../public/products'));
  const savedMB = ((res.totalBefore - res.totalAfter) / 1024 / 1024).toFixed(2);
  const beforeMB = (res.totalBefore / 1024 / 1024).toFixed(2);
  const afterMB = (res.totalAfter / 1024 / 1024).toFixed(2);
  const percent = (((res.totalBefore - res.totalAfter) / res.totalBefore) * 100).toFixed(1);
  console.log(`Optimized ${res.count} images.`);
  console.log(`Original size: ${beforeMB} MB`);
  console.log(`New size: ${afterMB} MB`);
  console.log(`Saved: ${savedMB} MB (${percent}% reduction)`);
}

run();
