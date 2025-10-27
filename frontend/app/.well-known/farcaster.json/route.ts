import { NextResponse } from 'next/server';

export async function GET() {
  const config = {
    accountAssociation: {
   "header": "eyJmaWQiOjcwODcwNywidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDQwMTJGRmQzQmE5ZTJiRjY3NDIzNTFEQzJDNDE1NWFDRjBEZjVhZWUifQ",
    "payload": "eyJkb21haW4iOiJiZXlvbmQtYmFudGVyLnZlcmNlbC5hcHAifQ",
    "signature": "+LpfEKjrx88xkAMp2GJxbhk6rzUTjBeIjeDZtkbgrHYBE5UnRZW+w23jG6El0DhcvUDMGQxwak+DzM+b0qSRERs="
    },
    frame: {
      version: '1',
      name: 'Beyond Banter',
      iconUrl: 'https://beyond-banter.vercel.app/icon.png',
      splashImageUrl: 'https://beyond-banter.vercel.app/splash.png',
      splashBackgroundColor: '#A93445',
      homeUrl: 'https://beyond-banter.vercel.app/',
      imageUrl: 'https://beyond-banter.vercel.app/image.png',
      buttonTitle: 'Start Earning',
      heroImageUrl:
        'https://beyond-banter.vercel.app/image.png',
      webhookUrl: 'https://beyond-banter.vercel.app/api/webhook',
      subtitle: 'Fair play meets fair pay',
      description: 'Fair play meets fair pay',
      "screenshotUrls": [
      "https://beyond-banter.vercel.app/IMG_1781.jpg",
      "https://beyond-banter.vercel.app/IMG_1782.jpg",
      "https://beyond-banter.vercel.app/IMG_1780.jpg"
    ],
      primaryCategory: 'finance',
     tags: [
      "prediction",
      "earning",
      "claim",
      "earn"
    ],
      tagline: 'Fair play meets fair pay',
      ogTitle: 'Beyond Banter',
        ogDescription: 'Fair play meets fair pay',
      ogImageUrl:
        'https://beyond-banter.vercel.app/og-image.png',
      castShareUrl: 'https://beyond-banter.vercel.app/',
    },
   baseBuilder: {
    "allowedAddresses": ["0xEdf7eA4b9e224d024D421e97736344FfBe00F8e2"]
    },
  };

  return NextResponse.json(config);
}

export const runtime = 'edge';