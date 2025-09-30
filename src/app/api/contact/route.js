import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "submissions.json");

export async function GET() {
  try {
    const file = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(file || "[]");
    return new Response(JSON.stringify(data), { status: 200 });
  } catch {
    return new Response(JSON.stringify([]), { status: 200 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    let submissions = [];
    try {
      const file = await fs.readFile(filePath, "utf-8");
      submissions = JSON.parse(file || "[]");
    } catch {}

    const newSubmission = {
      ...body,
      date: new Date().toISOString(),
    };

    submissions.push(newSubmission);

    await fs.writeFile(filePath, JSON.stringify(submissions, null, 2));

    return new Response(JSON.stringify({ success: true, message: "Form saqlandi!" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, message: "Server xatosi!" }), { status: 500 });
  }
}
