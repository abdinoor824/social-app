import { connectToDb } from "@/lib/utils";
import { post } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (req, context) => {
  try {
    const { params } = context; // ✅ Correct way
    await connectToDb();

    const postId = params.id;

    if (!postId) {
      return NextResponse.json({ message: "Missing post ID" }, { status: 400 });
    }

    const singlePost = await post.findById(postId);

    if (!singlePost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(singlePost, { status: 200 });

  } catch (err) {
    console.error("Error fetching single post:", err);
    return NextResponse.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
};
