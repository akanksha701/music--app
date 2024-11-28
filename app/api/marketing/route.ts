import { NextResponse } from "next/server";

export async function GET() {
  try {
    const coverTitle = {
      title: "Amplify your music authenticity, visit",
      description: "Stream millions of songs and podcasts, anytime, anywhere.",
    };
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
        question: "What type of vocals do we use?",
        description:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      },
      {
        question: "I received a TikTok claim, copyright strike..etc now what?",
        description:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      },
      {
        question: "What is included in the monthly subscription content?",
        description:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      },
      {
        question: "Can I see the membership agreement by BeatStars?",
        description:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      },
      {
        question: "How do I download my purchased beats?",
        description:
          "Once you've completed your purchase, you can download your beats from your account dashboard. Just navigate to your 'Purchases' section and click the download link next to the beat you’ve purchased.",
      },
      {
        question: "Can I use the beats in my commercial projects?",
        description:
          "Yes, if you have purchased a commercial license for the beat, you are allowed to use it in commercial projects such as music releases, videos, and advertisements. Please review the licensing terms for specifics on usage rights.",
      },
      {
        question: "How do I get a refund for my purchase?",
        description:
          "Refunds are available for purchases made within 7 days. If you believe there is an issue with your purchase, please contact our support team, and they will assist you in processing your refund.",
      },
      {
        question: "Do I need to give credit when using the beats?",
        description:
          "Giving credit is not required for tracks that come with a commercial license, but it’s always appreciated. If you're using a beat under a non-exclusive license, you may need to credit the producer as specified in your license agreement.",
      },
      {
        question: "How can I contact customer support?",
        description:
          "You can contact our customer support team by visiting the 'Contact Us' page on our website. You can also reach out via email at support@beatstars.com or through our live chat during business hours.",
      },
      {
        question: "Can I resell or distribute the beats?",
        description:
          "Reselling or distributing the beats directly without modification is not allowed unless you’ve purchased a specific distribution license. Please check the terms of your license for the exact rights you’ve acquired.",
      },
      {
        question: "Are there any additional fees for licensing?",
        description:
          "No, once you purchase the beat and the appropriate license, there are no additional fees unless you decide to upgrade your license or purchase additional usage rights for more distribution or exclusivity.",
      },
      {
        question: "Can I make changes to a beat after purchasing?",
        description:
          "Yes, once you've purchased a beat, you have full rights to modify and customize it to fit your project. However, if you are distributing the modified track commercially, ensure you have the proper rights for the modifications.",
      },
      {
        question: "How long does it take for my license to be delivered?",
        description:
          "Your license agreement and download link are automatically sent to your email right after purchase. If you do not receive it within a few minutes, please check your spam folder or contact support.",
      },
      {
        question: "Can I share the beat with others for collaboration?",
        description:
          "Yes, you can share the beat with collaborators, but make sure everyone involved understands the terms of the license agreement. You should also ensure that any commercial usage of the track by collaborators is covered under the appropriate licensing.",
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
    const popularTrackVideos = [
      "https://tecdn.b-cdn.net/img/video/Tropical.mp4",
      "https://tecdn.b-cdn.net/img/video/forest.mp4",
      "https://tecdn.b-cdn.net/img/video/Agua-natural.mp4",
      "https://tecdn.b-cdn.net/img/video/Tropical.mp4",
      "https://tecdn.b-cdn.net/img/video/forest.mp4",
      "https://tecdn.b-cdn.net/img/video/Agua-natural.mp4",
    ];
    return NextResponse.json({
      status: 200,
      coverTitle,
      features,
      pricingPlans,
      questions,
      footerContent,
      popularTrackVideos,
    });
  } catch (error) {
    console.error("Error fetching marketing data:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
