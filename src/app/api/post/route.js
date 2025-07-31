import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { post } from "@/lib/models";
import formidable from "formidable";
import path from "path";
import fs from "fs";
import { Readable } from "stream";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Replace or define inline below if missing

// If you don’t have authOptions defined, you can define it here instead:
// import GitHubProvider from "next-auth/providers/github";
// export const authOptions = { providers: [GitHubProvider({ clientId: "xxx", clientSecret: "xxx" })] };

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper: Convert Fetch Request into a Node-compatible readable stream
const getFormidableCompatibleRequest = async (req) => {
  const headers = {};
  for (const [key, value] of req.headers.entries()) {
    headers[key.toLowerCase()] = value;
  }

  const buffer = Buffer.from(await req.arrayBuffer());
  const stream = Readable.from(buffer);

  return {
    headers,
    on: stream.on.bind(stream),
    pipe: stream.pipe.bind(stream),
    resume: stream.resume.bind(stream),
    pause: stream.pause.bind(stream),
  };
};

export const GET = async () => {
  try {
    await connectToDb();
    const posts = await post.find();
    return NextResponse.json(posts, { status: 200 });
  } catch (err) {
    console.error("API /api/posts GET error:", err);
    return NextResponse.json(
      { message: "Failed to fetch posts", error: err.message },
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  try {
    await connectToDb();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formReq = await getFormidableCompatibleRequest(req);

    const uploadDir = path.join(process.cwd(), "/public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
      multiples: false,
      uploadDir,
      keepExtensions: true,
    });

    const data = await new Promise((resolve, reject) => {
      form.parse(formReq, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const title = Array.isArray(data.fields.title) ? data.fields.title[0] : data.fields.title;
    const desc = Array.isArray(data.fields.desc) ? data.fields.desc[0] : data.fields.desc;

    if (!title || !desc) {
      return NextResponse.json({ message: "Missing title or description" }, { status: 400 });
    }

    const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "");

    const imageFile = Array.isArray(data.files.image)
      ? data.files.image[0]
      : data.files.image;

    const imageUrl = imageFile?.filepath
      ? "/uploads/" + path.basename(imageFile.filepath)
      : "";

    const newPost = new post({
      title: String(title),
      desc: String(desc),
      img: imageUrl || null,
      slug,
      userId: session.user.id,
    });

    await newPost.save();
    console.log("New post created:", newPost);

    return NextResponse.json({ message: "Post created", post: newPost }, { status: 201 });
  } catch (err) {
    console.error("API /api/posts POST error:", err);
    return NextResponse.json(
      { message: "Failed to create post", error: err.message },
      { status: 500 }
    );
  }
};


export const DELETE = async (req) => {
  try {
    await connectToDb();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { postId } = await req.json();

    if (!postId) {
      return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
    }

    const existingPost = await post.findById(postId);

    if (!existingPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    if (existingPost.userId !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Remove image file if exists
    if (existingPost.img) {
      const imagePath = path.join(process.cwd(), existingPost.img.replace(/^\/public/, ''));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await post.findByIdAndDelete(postId);

    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("API /api/posts DELETE error:", err);
    return NextResponse.json(
      { message: "Failed to delete post", error: err.message },
      { status: 500 }
    );
  }
};
