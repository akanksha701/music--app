import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
const AboutPage = () => {
  return (
    <div className="p-4 sm:p-8">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-primary">
            About Music App
          </CardTitle>
          <CardDescription className="text-center text-lg text-muted">
            Your one-stop music streaming platform to discover, play, and enjoy
            music like never before.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="mb-4 text-xl">
            Welcome to the Music App! We bring the best music right to your
            fingertips, with a seamless experience for discovering your favorite
            songs, albums, and artists. Whether you're at home, at the gym, or
            on the go, we're here to make sure you never miss a beat.
          </p>

          <p className="mb-4 text-lg">
            Our app offers a huge library of songs from various genres,
            personalized playlists, and curated recommendations. We focus on
            providing a smooth, enjoyable experience, so you can get lost in the
            music without interruptions.
          </p>

          <Button className="mt-4 w-full sm:w-auto mx-auto">Explore Now</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
