import { NextResponse } from "next/server";

export async function GET() {
  try {
    const features = [
      {
        id: 1,
        title: "High Quality Audio",
        description:
          "Experience crystal clear sound with our HD streaming quality",
        image: "/images/Audio Waves.png",
      },
      {
        id: 2,
        title: "Offline Mode",
        description: "Download your favorite tracks and listen offline",
        image: "/images/offline.png",
      },
      {
        id: 3,
        title: "Smart Playlists",
        description: "Personalized playlists based on your taste",
        image: "/images/video-file.png",
      },
    ];

    const pricingPlans = [
      {
        id: 1,
        title: "Free",
        description: "Perfect for casual listeners",
        price: "$0",
        features: [
          "✓ Ad-supported listening",
          "✓ Basic audio quality",
          "✓ Shuffle play",
        ],
      },
    ];
    const questions = [
      {
        question: " What type of vocals do we use?",
        description:
          " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
      },
      {
        question:
          " I received a Tik Tok claim, copyright strike..etc now what?",
        description:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.  ",
      },
      {
        question: " What is included in the monthly subscription content?",
        description:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
      },
      {
        question: "Can I see the membership agreement by beatstars?",
        description:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
      },
    ];
    const footerContent = [
      {
        title: "Explore",
        links: [
          "Browse Beathr",
          "Custom Beats",
          "Commercial Streaming",
          "Subscribe now",
          "Merch",
        ],
      },
      {
        title: "Support",
        links: [
          " Hello@halalbeats.io",
          "FAOS",
          "Privacy Policy",
          "Received a Claim",
          "Contact Us",
        ],
      },
      {
        title: "Learn",
        links: ["About Us", "Licenses", "Terms of Use", "Halal Policy"],
      },
      {
        title: "Let's Work",
        links: [
          "I'm an Artist/Producer",
          "Ambassador",
          "Let's Collaborate",
          "I Can Help",
        ],
      },
    ];
    
    return NextResponse.json({
      status: 200,
      features,
      pricingPlans,
      questions,
      footerContent
    });
  } catch (error) {
    console.error("Error fetching marketing data:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
