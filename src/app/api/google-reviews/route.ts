import { NextResponse } from "next/server";
import { mockData, GoogleReview, GoogleReviewsSummary } from "@/data/mockData";

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (apiKey && placeId) {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,url&key=${apiKey}`;
      const response = await fetch(url, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === "OK" && data.result) {
          const result = data.result;
          const summary: GoogleReviewsSummary = {
            status: result.rating >= 4.5 ? "EXCELLENT" : "GREAT",
            rating: result.rating || 4.9,
            totalReviews: result.user_ratings_total || 200,
            profileUrl: result.url || mockData.googleReviewsSummary.profileUrl,
          };

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const reviews: GoogleReview[] = (result.reviews || []).map((r: any, idx: number) => ({
            id: `g-${idx}`,
            authorName: r.author_name || "Google Reviewer",
            authorImage: r.profile_photo_url || "",
            relativeTime: r.relative_time_description || "Recently",
            rating: r.rating || 5,
            text: r.text || "",
            verified: true,
          }));

          return NextResponse.json({
            summary,
            reviews: reviews.length > 0 ? reviews : mockData.googleReviews,
            source: "google-places-api",
          });
        }
      }
    } catch (err) {
      console.error("Error fetching Google Reviews:", err);
    }
  }

  // Fallback to placeholder/curated data
  return NextResponse.json({
    summary: mockData.googleReviewsSummary,
    reviews: mockData.googleReviews,
    source: "placeholder",
  });
}
