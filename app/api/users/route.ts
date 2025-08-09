"use server";

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/User";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    try {
        const user = await User.findOne({ email }).lean();
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
export async function POST(req: NextRequest) {
    try {
        await connect();

        const body = await req.json();
        const { email, name, uid, role } = body;

        if (!email || !name) {
            return NextResponse.json({ message: "Email and name are required" }, { status: 400 });
        }

        const userRole = role && ["student", "teacher"].includes(role) ? role : "student";


        let user = await User.findOne({ email });

        if (!user) {

            user = new User({
                email,
                name,
                firebaseUid: uid,
                role: userRole,
            });
            await user.save();
        } else if (uid && !user.firebaseUid) {

            user.firebaseUid = uid;
            await user.save();
        }

        return NextResponse.json({ message: "User logged in or registered", user });
    } catch (error: any) {
        return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
    }
}
