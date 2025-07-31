// import {user} from "@/lib/models";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import {connectToDb}from "@/lib/utils"



// export async function POST(request) {
//   try {
//     await connectToDb();
//     const { username, password } = await request.json();

//     const existingUser = await user.findOne({ username });
//     if (!existingUser) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }
//     const isPasswordValid = await bcrypt.compare(password, existingUser.password);
//     if (!isPasswordValid) {
//         return NextResponse.json({ error: "Invalid password" }, { status: 401 });
//         }
//     // If the user is found and password is valid, return success response
//     return NextResponse.json({ message: "Login successful" }, { status: 200 });
//     }
//     catch (error) {
//     console.error("Login error:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }
