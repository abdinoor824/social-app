import {user} from "@/lib/models";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {connectToDb}from "@/lib/utils"


export async function POST(request) {
  try {
    await connectToDb();
    const { username, email, password } = await request.json();


    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }
 
    const hashedPassword = await bcrypt.hash(password, 10);
 
    const newUser = new user({
      username,
      email,
      password: hashedPassword,
    });
 
    await newUser.save();
    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } 
}
