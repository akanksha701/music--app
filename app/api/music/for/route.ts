 
import Music from "@/lib/models/Music";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { MusicDocument } from "@/common/types/types";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "../../user/route";

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);

        const type = searchParams.get("type");
        const id = searchParams.get("id");
    const user: any = await currentUser();

        if (!type || !id) {
            return NextResponse.json(
                { message: "Both 'type' and 'id' parameters are required." },
                { status: 400 }
            );
        }

        // Construct the query dynamically
        let filter = {};
        switch (type) {
            case "genre":
                filter = { "musicDetails.genreId": new mongoose.Types.ObjectId(id) };
                break;
            case "playlist":
                filter = { "musicDetails.playlistId": new mongoose.Types.ObjectId(id) };
                break;
            case "artistId":
                filter = { "musicDetails.artistId": new mongoose.Types.ObjectId(id) };
                break;
            default:
                return NextResponse.json(
                    { message: "Invalid 'type' parameter." },
                    { status: 400 }
                );
        }

        // Query the database
        const musics = await db.collection("musics").aggregate([
            { $match: filter },
            {
                $lookup: {
                    from: "artists", // The artists collection
                    let: { artistsIds: "$musicDetails.artistId" }, // Use artistId array from musicDetails
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ["$_id", "$$artistsIds"] // Match artistIds
                                }
                            }
                        },
                        {
                            $project: { userId: 1, _id: 0 } // Only fetch the userId field from artists
                        }
                    ],
                    as: "artistInfo" // Add matched artists as artistInfo
                }
            },
            {
                $lookup: {
                    from: "users", // The users collection
                    localField: "artistInfo.userId", // Match userId from artistInfo
                    foreignField: "_id", // Match against _id in users collection
                    as: "userInfo" // Add user details as userInfo
                }
            },
            {
                $addFields: {
                    "artists": {
                        $reduce: {
                            input: "$userInfo", // Map over the userInfo array
                            initialValue: "",
                            in: {
                                $cond: {
                                    if: { $eq: ["$$value", ""] }, // If initial value is empty, just return the first name
                                    then: { $concat: ["$$this.firstName", " ", "$$this.lastName"] },
                                    else: { $concat: ["$$value", ", ", "$$this.firstName", " ", "$$this.lastName"] }
                                }
                            }
                        }
                    }
                }
            },
            {
                $lookup: {
                  from: 'users',
                  pipeline: [
                    {
                      $match: { clerkUserId: user.id },
                    },
                    {
                      $project: { likedMusics: 1 },
                    },
                  ],
                  as: 'loggedInUser',
                },
              },
              {
                $unwind: {
                  path: '$loggedInUser',
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $addFields: {
                  liked: { $in: ['$_id', '$loggedInUser.likedMusics'] },
                },
              },
        ]).toArray() as MusicDocument[];

        if (!musics || musics.length === 0) {
            return NextResponse.json(
                { message: `No music found for type: ${type} and id: ${id}.` },
                { status: 404 }
            );
        }

        console.log("musics", musics.length);

        // Format the response to include nested fields as needed
        const formattedResults = musics.map((doc: MusicDocument) => ({
            _id: doc._id,
            name: doc.musicDetails?.name,
            description: doc.musicDetails?.description,
            duration: doc.musicDetails?.duration,
            artists: doc.artists || "", // Single string with artist names
            genreId: doc.musicDetails?.genreId,
            languageId: doc.musicDetails?.languageId,
            releaseDate: doc.musicDetails?.releaseDate,
            audioUrl: doc.audioDetails?.audioUrl,
            imageUrl: doc.audioDetails?.imageUrl,
            playTime: doc.playTime,
            liked: doc.liked,
            price: {
                amount: doc.price?.amount,
                currency: doc.price?.currency,
            },
            isDeleted: doc.isDeleted,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
            type
        }));

        return NextResponse.json({ status: 200, data: formattedResults });
    } catch (error) {
        console.error("Error in GET handler:", error);
        return NextResponse.json(
            { error: "An error occurred while processing the request." },
            { status: 500 }
        );
    }
};


