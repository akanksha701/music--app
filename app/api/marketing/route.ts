import { NextResponse } from "next/server";

export async function GET() {
  try {
    const coverTitle = {
      title: "Amplify your music authenticity, visit",
      description: "Stream millions of songs and podcasts, anytime, anywhere.",
    };
    const faqDescription = {
      description:
        "Beat licensing can be confusing. You might have a bunch of questions about it. We want to make sure that you're informed correctly. If you still have questions, don't hesitate to contact us. We're always here to help.",
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
          "✓ Limited skips",
          "✓ Access to curated playlists",
        ],
      },
      {
        id: 2,
        title: "Basic",
        description: "Ideal for casual music lovers",
        price: "$5/month",
        features: [
          "✓ Ad-free listening",
          "✓ High-quality audio",
          "✓ Unlimited skips",
          "✓ Access to all playlists",
          "✓ Offline listening (up to 10 playlists)",
        ],
      },
      {
        id: 3,
        title: "Premium",
        description: "For the true music enthusiast",
        price: "$15/month",
        features: [
          "✓ All features from Basic plan",
          "✓ Premium audio quality (320kbps)",
          "✓ Download unlimited music for offline listening",
          "✓ No ads and no interruptions",
          "✓ High-fidelity audio streaming (Hi-Fi)",
          "✓ Access to exclusive content (Live sessions, interviews)",
        ],
      },
      {
        id: 4,
        title: "Family",
        description: "Perfect for music lovers with family or friends",
        price: "$20/month",
        features: [
          "✓ All features from Premium plan",
          "✓ Up to 6 accounts per family",
          "✓ Family-friendly playlist recommendations",
          "✓ Family plan management tools",
          "✓ Customizable user profiles",
        ],
      },
      {
        id: 5,
        title: "Student",
        description: "For students who want all the music for a lower price",
        price: "$7/month",
        features: [
          "✓ All features from Premium plan",
          "✓ 50% discount on Premium plan",
          "✓ Unlimited skips and offline listening",
          "✓ Access to exclusive student-only content",
        ],
      },
      {
        id: 6,
        title: "VIP",
        description: "For serious music lovers and audiophiles",
        price: "$30/month",
        features: [
          "✓ All features from Premium plan",
          "✓ Lossless audio streaming (FLAC)",
          "✓ VIP-only content (Early access to albums and concerts)",
          "✓ Personal music assistant",
          "✓ Priority customer support",
          "✓ Virtual concerts and exclusive events",
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
    const users = [
      "data:image/png;base64,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",
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NDQ8NDQ8PDQ0OEA8QDQ0NDQ8QEBAPFRIWFxURFhgYHSghGhwlGxMWITEhMTUrLi4vFx8/ODMsNyktLisBCgoKDg0OGhAQGC0lICUrLS0tLSstLS0tLSstLS0tLy0rLSstLSstLS0tLS0rLSstLSstLS0rKy0tLS0tLS0tK//AABEIAOEA4QMBEQACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAAAQUGBwQDAv/EAEYQAAEEAQEEBgUIBQsFAAAAAAEAAgMRBBIFBiExBxNBUWGBFCI1cZEyNHJzdLGysxUjUoKhJTNCYmODhKK0wcIWJESSw//EABoBAQEAAwEBAAAAAAAAAAAAAAABAwQFAgb/xAA5EQEAAgECAgYHBwMFAQEAAAAAAQIDBBESIQUxMkFRcRMiM2GBscE0cpGh0eHwFMLxIyRCUqJiFf/aAAwDAQACEQMRAD8A6Et982ICAgiAgIIgIgVREEREQRVEREKCKoiIFB+UREQQRVBBCiCCICAg96xtoQEBAQRUFARBBFQREQRVEKCFERBCqiIiFERBEREBVBBEREBAQEHuXhtCAgKAqCiCAgioIiICCKoiD8lEERCqiIIUREEREVREBERAQRUEBB71ibIgICAqCCICIIIgIIiIghVRERFREREREEREVERBBEREBAQEQQe5eGyIoiIgICAgICCICIiCEqoiCKohREREQRERVEQRERAQFURAQEBB7VjbIgICAgICIWgWqIoCqJaCIiKiIiIiFBERFURBEREBERUEERBAQEHtXhsCKWgKBaqCKIiIFoFoIgIiEqiWiPySiIiJaoIiWiIgiIioIIiCCWgWgWgWg9lrwzloFoCKIggWgIIgWgWqJaIloiWgiIlqoloJaIloiWqIgIiWgWiIgICoWgWg9drwzloFoFqDUd/t73bNayHHa12VMC4OeLZFGDWojtJN0OXA+44suTh5Q3dJpvSzM26oaLFlbfyojlxyZr4RZ1xPbG0gcy1ja1Dh2ArDvkmN+bfmulpPBMRuy+4u/OS/KixMx/XxznRHMWtEjHkeqCQBqBPDvs816x5Z32lh1ejpFJvSNtmV6UdtZWH6J6LO+DrOv16Az1tPV1dg/tH4r3mtMbbMOgxUycXFG/V9WqO3y2nPix48D53yxiR+VkQxl0pBe7QLYPUaG1x4Ent4ccXpLTG0Nz+lw1vNrbbd0S/O7G/WViTD0mWXLxnXrZI/rHjhwcxzuPOuF1SUyzE81z6Ol6+rG0vLtXerak7hkOmyMeJ5/UiHrIYa/Za4Vr5dt9qlsl55vWPTYaxw7RM9+/Of2b10bbzzZzZcfKd1ksAa9k1AF8ZJFOrhYNce2/M58N5tylztdp645i1eqe58d/t9ZMOX0PD0icNDppnAO6vULaxoPDVVGzwAI4G+Ey5ZrO0PWj0cZI479XdDVJcnbwh9NdJmiDSH9Z1ga0MP9LqweDfGqWLfJtvzbkV0nFwREb/zv/ds3R9vjPlzeh5hEjyxzoZw1rXHTxLHAcDw4g+BWXFlm07S09bpK468dPjD19IG8GbhSY7cMAtkbIZCYDJxBbQ8OZXrLe1dtmPRYMWWLcfz2ajJv7tVotxY0crdi6ePmsPprt6NBp56vmz+4m9ebnZphyCx0Qhe86Ig0hwcwDiPpFZMWS1rbS1dbpcWLHxV69/F9N/d8pMWT0PDIbMADPMQHdXYsMaDw1VRJPIEeVzZZrO0POi0UZI9Jfq7oas+fbcMIznS5jYXaXCR82ptOqnGMk0DY5ilh3yRHFzbsV0lrejiK7+X1/dvG429Z2ix8U4a3KiAcS0U2WPlrA7CDwI8R30NjFk4+U9bma3SehmLV6p/Jru/+8GZjbQdDj5D4YxFE4MYGVZuzxCxZslottEtzQ6fFfDxWrvO8sZtXe3aGTG3qHzshgiibPNA1zS6XQNckj2j1RquhwFfw82y3mOTNi0eGk+tEbzM7RPh3bRPW924u9mT6XHi5Mr8iKc6GmU6nxvolpDjxINVRvmPP1hy24tpYtdo8fo5vSNpjw73UFuOEloFoCAg9drwzloFoFoNX30fsqFrZ9owsmlcCyJrW3M8N40KIoAu5kgC/FYsnBHOzb0vp7Tw4p2jv8GuYvSJJQg2fsxzo4WtYxjZJJC1gFNBaxhrl3rHGaeqtW1bQR2smTr/AJ3y0vd03tLDNVeZjmu79c3gsNO1Hm383sreU/JuvTH/AOD/AIn/AOSz6juc/oz/AJfD6sr0TRtbs1zwKc/IkLj2nS1oC9YI9Vh6RmfS7e5zLbULf0hlRgU30zIYAOFN69woeS1rdqfN18U/6VZ90fJ1vpGiaNkZDQ0BrOp0ADg2pWAV3cFt5o9SXE0Np9PX4/Jp/RD88yfs4/MCw6frlvdJ9ivm2HfWfY+O/XmYzMjLlAdojb+tc0eqHPNgAcK4864XSy5Jxx1xzamkjUXjaltoj8GEy+kDIyoZo4NnExOZJG94fJKGNLSCTpYAKBtY5zTMcqtiugpS0TbJz+EfVgejr2tje6b8l68Ye3DZ1/sLfD5u0PkDQXEhrQCXEmgAOJJW8+d63Fd8d4H7TywI9ToGHq8WMc3kmtdftONV4V4rQyX455PotJp4wY+fX3/z3Olbl7vDZ2MGuo5MtOyHjv7Iwe5t+Zs9q28WPgj3uNrNT6a+8dUdX6/FyTarzkZ85fx63LkDvomUtryFDyWlbnafN38UcGKu3dWPk7TvFC1+DlxkeqcecV3VGa+5b949WXzWntMZaz74+bku4E5j2rjVykMkbvFpjca+LQfJaeGfXh39fWJ09vdt83q6TPajvqYfuKuftvHRvsI85dA3JxmM2VisAGmSLXIP2nSW51/GvctrFHqQ4+tvM6i0+E/JyjdsVtHEA5DJhA93WBaWPtx5u/qeeG/lPyd0tdF8qWqFoFqBao9NrGzFoFoFoONdJ0j3bVkDrpkULYx2aC2+H7xctPN23f6PiPQRt4y3PdreHAw9jwuEsTXRxAyQNe3rn5FW4aOZJd293gs1L1rRz8+DLkzzG09fX3bOW7JyxDl4+RJyjnilk02eDZA51fArVrO0xLs5KcVJrHhMN56XJWyNwHscHseJ3Mc02HNIiIIPdSz6juc3o2JibxPu+rN9FZ/kv+/m/wCKyYOw1+kfbfCHNNse1Mn7fP8A6hy1bdufN18fsa/dj5OsdIx/krK/uvzmLczdiXE0Pt6/H5NN6I/neT9Q38wLBp+1Lf6U9nXza1vlI9+0s0vvX10jR9Fvqs/yhqx5O1Lb0kRGGm3g6RtjeLBg2S5mNLCQ/HMWPBE9pcC5mni0cW1dm/vWza9YpycjFp818+94nr3mXO9zc6PF2jjTSkNiDnNe88mh7HNDj4W4X4LWxTEWiZdbV45yYbVr1tx6Udvuja3Z0VgysEmQ7+zJIbGPeWm/AAdpWfPfb1Yc7o3Txb/Vnu6vPxaZuvtWHByRkywHIcwfqgHhoY4838QbNcByqz4Vgx2is7zDo6nDbLTgrbbxdP3e3yxc94hYJIZyCRFK0esALOlzSQeHZwK3KZa2nZxNRosmGOKeceMOY73YL8TaOQ3lqkdPCTyLZHF7T5EkfulaeSvDeXb0mSMmGs+7afhydC27vdiP2bK+KeN008DmMgDwZWve3TTm8xV8T4LavlrwcpcfBossZ4i1Z2ievu5e9p/Rrs9020GzUerxWue53Zrc0sa3+Lj+6sGCu99/B0ekssVw8PfP+U6S/ajvqYfuKajtnRv2ePOXRdz/AGZhfZ4vwrbxdiHF1nt7+cuSbu+0cT7VD+YFo4+3Hm+i1HsLeU/J3JdJ8oIJaBaBaD02vDMWgWgWg17endODael73OhnYNLZowDbeelwPMWSewiysd8UXbWn1d8PKOceDBYHRjAx4dkZEk7Af5tjBEHeBNk17q96xxp475bN+lLzHq12/Nk8rcLBky25OksiAGvEYAInuaKB8BQ4jtr337nDWZ3Ya6/LWnD3+Pem8u7se2IsZ+PkxxxQiQMdExssbmu0ihpcAK0JfHF4jaTT6mdPNotXnPwZPdXYv6OxfRjJ1x6x7y/Ro+VXCrPcvWOnBGzDqc/pr8W2zWczo6MuXJk+lhoknfPo9HsjVIXlt6/GrWKcG9t925XpLhxxTg6o26/dt4Nr3j2Z6diTYwf1Rl00/Tq0lrw7lYv5KzXrxRs0NPl9Fki+2+zC7n7oHZkssrsgT9ZGGACEx1Trv5RvkvGPFwTvu2NXrYz1iIrtt7363m3Kg2hL14e7HnIAe9rQ5slCgXNNcQBV2rfDFp3TT66+GOHbeHh2T0c40MgkyJXZWk2IywRxk/1hZLvddd9rzXTxE7yyZek72jasbfN7cfcbDZmOy6L2k648ZwHVMkJsu8R3N5D4V6jBWLbsVukMs4+D8+94t8ti4L8oZm0MswR9UxjYWUHvLXOJI4FxHrcgPNectK78VpZdHqM0U9HipvO/X/P1YMS7tfJDJz/XvM+Pyv8AZY98H83bW3SHXvH/AJbBu7upixZEG0cKeR8BY8sjeNQIc0t4EgEVZ4EE8Flx4qxMWrLS1GsyWpbDkrG7Mbxbv4+0Yw2cFr2X1c0dB7L5jjwIPcVkvji8c2tp9VfBO9fwaozoybr9bMcY+5sAD695cR/BYP6b3t+el525U5+f7Nz2PsqDChEGO3Sy7cSbc93a5x7StitIrG0OZmz3zW4ry1zejcp20Mo5LckQ2xjCwwl/yb43qHesWTBx233bul6QjBj4Jrvz8f2bJsfC9FxoMfVr6mNkeutOrSKuuxZq14YiGjmyekyWvt1zu0/Z3R66DKiyPSw5sUrZNHo5BOl11evwWvXT7W33dLJ0pF8c04OuNuv9m92tpyC0EtAtAtB6LXllLQLQLQLQLQLQartjdmVsjsvZMxw8lx1SxA/9vOe8tIIDvGq9x4rDbHO+9J2lu4dXWYimeOKPHvhicff+fFf1G1MR8cg5vh4Ej9rS40R4hxC8RnmOV4bFuj6ZI4sN949/8+cNk2fvbs/Jrq8mNrjyZMTE6+6n1fks1ctJ72lk0eenXWfhz+TMteHC2mx3g2F7a08i1U3LQ3RE3ePO2tjY4ueeGLwfI0HyHMrzNqx1yyUw5MnZrM/BqG1t8NnPlBgxP0hlEaI3HHaLqyGgubrPM8gsFs1N+Uby6OLQ54r61+Gvn+nL83n3saf0OZczEx8bLkmjbAyFrS9rdQdRP7WlrwQPD3CZfZ72jaXvSTH9Tw47zNYid9/547Nw3dwzjYONA7g+OJgeP65Fu/zErYx14axDmanJGTLa0d8sha9sBaBaCWgWglohaBaBaBaoWg+9rwylohaBaCWgWqFoJaG7zbQwIcpnV5ETJmdge26PeDzB8QvM1i0bS948t8c70nZpe1OjaJ9nEmdD/ZzDrGe4O4OHnawW00d0uli6VtHtK7+XL9vk16TczamLxhbq8cTJ0/eWlYvQ5K9X5NyNfpsnan8Y/wAvnW3IeF7SH708g/3U/wBWPF630V/+n5Q/Tcnbr+AO0f8A0lZ/GgrvlnxSa6KP+v5P2zd7bWTwkOQGntycw6fhqJ/gkY8tuv5vM6rR4+rb4V/Zldm9GpvVlZAHaY8ZvE/vuH+yyV03jLXy9L92Ov4/pH6tz2RsPFwhWNE1jiKdIbdI73uPHy5LYrjrXqhy82pyZp9ef0/B89pbHblZONNK64sXU9kFcHTGtL3HuaBwHf8ABLU4piZ7lxaiceO1axzt3+7w+LKWvbXLRC0EtUEBEEEQEC0C0C0H3teWRLQLQLQLQS0QtAtBLVEtELQS0C0RLQLQLQS0QtUEHMZOkXKExeI4vRg41EWnWY/pX8qvClozqbb79z6GOicXBtMzxePdv5eDpodYBHbxW8+eLQEQQEBBEBAQfa1GQtRC1VS1EebM2lBj0J54YC69PXTMj1VzrURfNSbRHXLJTFe/YrM+Ubvo/IY1nWuexsdausc9oZp79XKvFXeOt5itpnhiOfgxEm9+zmnScuMnvYHvb8WghY/TU8WzGh1ExvwSymHmxZDBJBIyWM8NUbg4X3cOR8Fki0TzhrXpak8N42l8NobYxsXhkTxRE8Q17xrI7w3mVLXrXrl7x4MuTsVmXjxt6sCVwYzKj1E0A/VHZ7gXAC15jLSe9kvotRWN5pPz+TMWsjU3fOWdjK1vYy+WpwbfxTeFisz1Q/TXggEEEHiCDYIRJ5Lao+TcmMu0iRhddaQ9pdfdSm8Lw2232fW1Xli87eLCx3Fk2TG14+UwEvc09xDbIXi2WleuWzj0mfJG9aTt/PF88bejAlIazKiBPACQmOz3DWApGWk9630Worzmk/P5MuHdo8isjVa2/dfZhyTKWt6wv1GHr/UMl38i+/s5eCw+hx8W7fjXaqMfDvy269ue3n9WyWszQfmSQNaXOIa0C3OcQAB3knkhETM7Qw029uz2GjlRn6AfIPi0ELHOakd7broNTP8Awn5fN6sDbeJknTBkRSP56A+n19E0Va5K26pYsmmzY43vWYj8vxZC17YBAQEBB9LUey0C0C0HNulX5xjfUv8AxrT1PXDvdEdi/nHyfPYu62TtKCCTJyizFY0Nx4h65DG+qKHBrTw58SlMNrxEzPJc+uxae9q0p63fP85shndHMQicceeYzBpLBL1ZY4j+idLQRffxXq2mjblLBj6XtxRx1jb3b/q0/d7Ky2y9RhSGKTKqM8QB33ZB0kAHjz4la+Obb7V73U1NMU148sbxXm3DF6OWn1srKkfI7i7qQ0cfFz7LvfwWxGmjvlyr9LzHLHSNvf8Ats1/fDdcbO6t8cjpYZSWfrA3W14F0a4EEX3cisWbFwdTe0Ou/qN4mNpjw8G59Hu0Hz4GmQlzoJHQhxNksDWub8A+vJbOntM059zk9KYox59698b/AM/BrnSmAcrHsX+oP4ysOq7UN/oef9O3n9G37mezMT6s/jctnD7OHJ1/2m/mzTTxCyNSXHN3QP0vAaF+lHj5uXNx+0jzfWaqf9pb7re+kHasmLhtbC4sfkP6vW005rNJLqPYTQF+JW3qLzWvLvcXozBXLlmbdURu1jdLc5mbB6RNK+Nhc5sbIdIcdJouJcD23wrsWDFgi8bzLo63pGcF+Ctd597M5HRzjkHqsidruzrBG9vwAass6WvdLUr0zk39akfDeP1bVsfD9Fxoccu1mGNrNdVddtdiz0rw1iHMz5fS5LX223ndx7JA/SMhoX6a/j/iCudPb+P1fV0n/bx9z+12x7gLJNAWSTyAXUfHw5Ht/bU21ckRRajCXhmNAOAdx4PcO88+PIea52TJOS20fB9TptNTSY+K3Xtzn6fzrbBhdHLdIORkv19rYGtDR4W6799BZq6XxloZOmZ39SnL3/s9mBuIzGyYciPIe4RPDyySNpJoHgHAivgvVdNFbRMSxZelbZMdqWp1x3S2+1suSWgWgWgWg+lry9loFoFoOb9KnzjG+pf+Naeq7UO90P7O/nHybZuT7MxfoO/MctjD2IczX/ab/wA7mbtZWm43ur7Vxvr3fc5c3F7SPN9XrPst/L9HY7XSfJtM6UfmkH2kflSLW1XZjzdfof2tvu/WDov+Zz/aT+VGml7M+adMe2r936yxHSh86x/qD+MrHqu1Da6G9lbz+jbtzfZmL9WfxuWzh9nDk6/7TfzZpvMLK05ce3e9rQfaT97lzcftI831uq+y2+66JvjsV2di6I666JwkiBNBxogsvssE+dLczY+OvJwNBqowZd7dU8paDsfeHL2U50DmWzUXPxpwWkHkXNPMXXiD/FalMtsfL8ndz6PDq4i8T8Y+v8iW67J33xMghkhdjSHgBNWgnweOHxpbVNRS3XycbP0Zmx849aPd1/h+m7ZrWdznFcn2jJ9tf/qCuXPb+P1fY0+zx9z+11XeyUs2fluBo9TI0H6Xq/8AJdDLO1JfL6GOLUUifGP1aB0cxB20QSL6uCV7fB1tZfwefitPTR6/wd3pa0xp/OYj5z9HU10HzAgICAgICD6Wo9loJaBaDnHSl84xvqX/AI1parrh3+h/Z384+Ta9yvZmL9B343LYw9iHL6Q+03/nczaytNx3db2rjfXu+5y5uL2keb6zWfZb+X6Ow2um+Sab0ofNIPtI/KkWrquzHm6/Q3tbfd+sHRh8zn+0n8qNXS9mfNOmfbV+79ZYnpP+dY/1J/GVi1XahtdDeyt5/Rtm5jgdmYtcaY4eYe4EfELZwezhyukI21N/P6QzbeYWVpS4/u97Vg+0n73Lm4/aR5vrtV9kt912C10nyTz5uFDkN0TxMlb2CRodXiO5S1YtymGTHlvjnelpjyc/313VhxIhk4xc1mtrHwucXAarotJ49nI3/BaWfDFY4od7o7X3zX9Hk69t9/1Z7o5zXy4JY8l3USmNhJs6NLXBvlqI91LNprTNNp7mj0tjrTPvHfG/x6mgZPtB/wBtf/qCtOe38fq71Ps8fc/tdZ3jxjNhZUTRb3wyaB3uAto+IC6OSN6TD5TSXimalp6omHNdws1sO0Iy402Zj4QTyDnU5vxLAPMLR09oi76PpPFN9PO3dO/4f5dZXRfKiIICoKAgKj9ry9iAgWg0XpE2Vk5M2O7HhfM1sb2uLADR1A0Vq6ilrTG0Oz0XqMWOlovbbm2PdTHfDgY8UrSyRrTqY7mLe48fis2KJikRLn629b57WrO8MssjVcv3d2DmR7Rgkkx5WRsmc5z3AaQKdxtaOPHeLxMw+l1WrwW09q1vEzMOnrffMtW6QdnzZONE2CN0rmzhzmsqw3q3i/iQtfUVm1Y2jvdPovNjxZbTeduX1g6P8CbGxZWzxuic6cua19WW9WwX8QU09ZrWd47zpXNTLlrNJ35fWXz3+2FJlxxzQNL5YNQMY5vjdV13kEcvEpqMc2jeO5ei9XXDaaXnaJ7/AHtO2RvFmbPBgYBpLiepnidbXHnQsEX3LVplvTlDsajRYNT68/jE/wCYZqOXbO0/U44kDvlPDHQNrz9d3lwWWJzZPdDSmug0vPtT57/tHxeDY2w8nH2rE0wzGOKcjr+peI3MF0/VyAIo8+1eKY7VyRy72xqNViyaW0xaN5jq3jffw8W3b5Oz2Nhk2eX0wydc2NrHkj1dPqkHUODuXetnNxxtNHJ6PjTTNq59ue22/wCrV/8ArrPi9WaOG/7WCSN3mNQWv/U3jrh0/wD8nTX50mfhMT9Hly8zaO2XMjEZdG021sUZZCDy1Ocb40T2+4LzNsmXlsy0xaXRRNt+fvnefhDoO7WyBg4rYLDnkl8rxyMh514AADyW7ix8Fdnz+s1M6jLN+7qjycsyfaLx2+mu4dv8+Vz59p8fq+pp9mif/j+12gniuo+Mc53q3OlbI/Iw2GSJ5LnQt+XG48TpH9Jt9g4haWbTzE71fRaHpOk1imWdpjv7p8/ex8G920cVoje7Vp4AZULtY8L4E+drxGfJXlP5s9ujdLlnij/zPL6wymxtu7VzMmAaXCDrGmYx44bH1d+tbnX2eNrJTJlvaPBrajSaPBitz9bblvPPfyj9HQVuvnxAQEBB+15ehBEBAQEQtURAQRAQEQtAQEBAtAtAQLVEQERbQQlAQEBAtAtB+1HsQLREtAQEBAQRAQEBEEBAQFQQRARBAQEEQEBAQEBAVR+15exAQEBAQRAQEBAQEBARBAQRVBAQRAQEBARBAQEBAQftR7EBBEBAQEBAQEBAQEBARBBEEVQQEBEEBBEBUEBBEBB9F5exAQEBAQEBAQEBAQEBARBBEEVQQEQQRAQFREBAQEBB9F5exAQEBAQEBAQEBAQEBARBBEEVQQEREBUEEUBUEBAQEH0Xl7EBAQEBAQEBAQEBAQEBEEEQRVBAREVBQRAQFQQRAQEH1Xl7EBAQEBAQEBAQEBAQEBEEEREVBAREQEEQEBURAQEBB9V5exAQEBAQEBAQEBAQEBARBURREVBAKIioKCICoFBEBAQEH//Z",
    ];
    const views = [
      { title: "Explore the world's leading Halal library for soundtracks" ,viewImg:"https://plus.unsplash.com/premium_photo-1663957831645-e683bddec89a?q=80&w=2930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
      {
        views: [
          { title: "Views", views: "4.5B",color:'bg-indigo-600' },
          { title: "Streams", views: "5M",color:'bg-green-600' },
          { title: "Projects", views: "1M+" ,color:'bg-blue-600'},
          { title: "Countries", views: "220+", color:'bg-yellow-600' },
        ],
      },
      {
        points: [
          "100% Vocals only",
          "No musical instruments",
          "No copyright strikes",
        ],
      },
    ];
    return NextResponse.json({
      status: 200,
      coverTitle,
      features,
      pricingPlans,
      questions,
      footerContent,
      popularTrackVideos,
      faqDescription,
      users,
      views
    });
  } catch (error) {
    console.error("Error fetching marketing data:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
