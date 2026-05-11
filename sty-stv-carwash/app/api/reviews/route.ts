import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=ChIJxdpqw7vXUkcREenEdz_m3Nk` +
      `&fields=reviews,rating,user_ratings_total,name` +
      `&language=ro` +
      `&key=${process.env.GOOGLE_PLACES_API_KEY}`,
    {
      next: { revalidate: 86400 },
    }
  );

  const data = await res.json();

  return NextResponse.json(data.result ?? {});
}