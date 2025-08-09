"use server";


import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/User";

export async function POST(request: Request) {
    await connect();
    try {
        const { email, durationMinutes } = await request.json();

        if (!email || !durationMinutes) {
            return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
        }

        const today = new Date().toISOString().split("T")[0];

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }


        const recordIndex = user.loginHistory.findIndex(
            (r: { date: string; duration: number }) => r.date === today
        );

        if (recordIndex !== -1) {
            // Update existing record
            user.loginHistory[recordIndex].duration += durationMinutes;
        } else {
            // Add new record for today
            user.loginHistory.push({ date: today, duration: durationMinutes });
        }

        await user.save();

        return NextResponse.json({ message: "Login duration updated" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
