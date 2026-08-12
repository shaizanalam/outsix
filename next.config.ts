import fs from 'fs';
import path from 'path';

// Automatically ensure uploaded images exist in public directory
try {
  const root = process.cwd();
  const pub = path.join(root, 'public');
  if (!fs.existsSync(pub)) fs.mkdirSync(pub, { recursive: true });
  
  if (fs.existsSync(path.join(root, 'logo.jpeg'))) {
    fs.copyFileSync(path.join(root, 'logo.jpeg'), path.join(pub, 'logo.jpeg'));
  }
  if (fs.existsSync(path.join(root, 'ed2.jpeg'))) {
    fs.copyFileSync(path.join(root, 'ed2.jpeg'), path.join(pub, 'ed2.jpeg'));
  }
  if (fs.existsSync(path.join(root, 'eg1.jpeg'))) {
    fs.copyFileSync(path.join(root, 'eg1.jpeg'), path.join(pub, 'eg1.jpeg'));
  }
  if (fs.existsSync(path.join(root, 'bgrem1.png'))) {
    fs.copyFileSync(path.join(root, 'bgrem1.png'), path.join(pub, 'bgrem1.png'));
  }
  if (fs.existsSync(path.join(root, 'bgrem2.png'))) {
    fs.copyFileSync(path.join(root, 'bgrem2.png'), path.join(pub, 'bgrem2.png'));
  }
} catch (e) {
  // ignore
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
