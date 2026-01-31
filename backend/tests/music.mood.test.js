import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";

import User from "../modules/user/user.model.js";
import MoodSpace from "../modules/music/music.model.js";
import { generateAccessToken } from "../utils/jwt.js";

describe("Music Mood Space API", () => {
    let testUser;
    let accessToken;
    let moodSpaceId;

    beforeAll(async () => {
        // Connect to database
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/my-music-space-test');

        // Clean up and create a test user
        await User.deleteMany({});
        await MoodSpace.deleteMany({});


        testUser = await User.create({
            name: "Test User",
            email: "test@example.com",
            password: "Password123"
        });

        accessToken = generateAccessToken({
            userId: testUser._id,
            email: testUser.email
        });
    });

    afterAll(async () => {
        await User.deleteMany({});
        await MoodSpace.deleteMany({});
        await mongoose.connection.close();
    });


    describe("POST /api/v1/music", () => {
        it("should create a new mood space", async () => {
            const response = await request(app)
                .post("/api/v1/music")
                .set("Authorization", `Bearer ${accessToken}`)
                .send({
                    name: "Focus Mood",
                    description: "Songs for studying"
                })
                .expect(201);

            expect(response.body.success).toBe(true);
            expect(response.body.data.name).toBe("Focus Mood");
            moodSpaceId = response.body.data._id;
        });

        it("should fail to create mood space with duplicate name for same user", async () => {
            await request(app)
                .post("/api/v1/music")
                .set("Authorization", `Bearer ${accessToken}`)
                .send({
                    name: "Focus Mood",
                    description: "Duplicate"
                })
                .expect(400);
        });
    });

    describe("GET /api/v1/music", () => {
        it("should retrieve all mood spaces for the user", async () => {
            const response = await request(app)
                .get("/api/v1/music")
                .set("Authorization", `Bearer ${accessToken}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBe(1);
        });
    });

    describe("POST /api/v1/music/:spaceId/songs", () => {
        it("should add a song to the mood space", async () => {
            const songData = {
                videoId: "12345",
                title: "Study Beats",
                thumbnail: "https://example.com/thumb.jpg",
                channelTitle: "Lofi Girl",
                mode: "audio"
            };

            const response = await request(app)
                .post(`/api/v1/music/${moodSpaceId}/songs`)
                .set("Authorization", `Bearer ${accessToken}`)
                .send(songData)
                .expect(201);

            expect(response.body.success).toBe(true);
            expect(response.body.data.songs.length).toBe(1);
            expect(response.body.data.songs[0].videoId).toBe("12345");
        });

        it("should not allow duplicate songs in the same mood space", async () => {
            const songData = {
                videoId: "12345",
                title: "Study Beats",
                thumbnail: "https://example.com/thumb.jpg",
                channelTitle: "Lofi Girl",
                mode: "audio"
            };

            await request(app)
                .post(`/api/v1/music/${moodSpaceId}/songs`)
                .set("Authorization", `Bearer ${accessToken}`)
                .send(songData)
                .expect(400);
        });
    });

    describe("PATCH /api/v1/music/:spaceId/songs/:videoId", () => {
        it("should update song playback mode", async () => {
            const response = await request(app)
                .patch(`/api/v1/music/${moodSpaceId}/songs/12345`)
                .set("Authorization", `Bearer ${accessToken}`)
                .send({ mode: "video" })
                .expect(200);

            expect(response.body.success).toBe(true);
            const song = response.body.data.songs.find(s => s.videoId === "12345");
            expect(song.mode).toBe("video");
        });
    });

    describe("DELETE /api/v1/music/:spaceId/songs/:videoId", () => {
        it("should remove a song from the mood space", async () => {
            const response = await request(app)
                .delete(`/api/v1/music/${moodSpaceId}/songs/12345`)
                .set("Authorization", `Bearer ${accessToken}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.songs.length).toBe(0);
        });
    });

    describe("DELETE /api/v1/music/:spaceId", () => {
        it("should delete the entire mood space", async () => {
            await request(app)
                .delete(`/api/v1/music/${moodSpaceId}`)
                .set("Authorization", `Bearer ${accessToken}`)
                .expect(200);

            const check = await MoodSpace.findById(moodSpaceId);
            expect(check).toBeNull();
        });
    });
});
