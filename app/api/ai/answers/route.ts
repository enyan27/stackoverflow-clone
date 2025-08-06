import { NextResponse } from "next/server";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import { AIAnswerSchema } from "@/lib/validations";

export async function POST(req: Request) {
    const { question, content, userAnswer } = await req.json();

    try {
        const validatedData = AIAnswerSchema.safeParse({ question, content });

        if (!validatedData.success) {
            throw new ValidationError(validatedData.error.flatten().fieldErrors);
        }

        const prompt = `
Question: "${question}"

Consider the following context to help you answer:
Context: ${content}

Also, consider the user's answer below:
User's Answer: ${userAnswer}

If the user's answer is correct, rephrase it or briefly expand on it. If it's incomplete or incorrect, improve or correct it.

---
**Instruction for AI:**

1.  **Language:** Respond in the same language as the user's question (e.g., if the question is in Vietnamese, answer in Vietnamese).

2.  **If the question is about programming/coding:**
    -   Start with a simple, conversational phrase like "Here, you can try this" or "Hey, this is a solid start!"
    -   Provide a concise code solution. Use **Markdown code blocks** with the correct language identifier (e.g., \`\`\`js, \`\`\`ts).
    -   Follow up with a brief, friendly explanation of how it works. Avoid robotic, overly formal language like "Key features" or "Time complexity". Instead, explain the core concepts naturally, such as "this part 'bubbles' the largest numbers to the end" or "the 'swapped' check is a smart trick to make it faster if the array is already mostly sorted."

3.  **If the question is NOT about programming/coding:**
    -   Keep the response friendly, clear, and concise.
    -   Limit the response to a single, concise sentence (around 200-500 characters).
    -   **Do not use any markdown formatting.**
`;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
            },
            body: JSON.stringify({
                model: process.env.OPEN_ROUTER_MODEL,
                messages: [
                    {
                        role: "system",
                        content:
                            "You are a helpful assistant that provides informative responses in markdown format. Use appropriate markdown syntax for headings, lists, code blocks, and emphasis where necessary. For code blocks, use short-form smaller case language identifiers (e.g., 'js' for JavaScript, 'py' for Python, 'ts' for TypeScript, 'html' for HTML, 'css' for CSS, etc.).",
                    },
                    { role: "user", content: prompt },
                ],
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("OpenRouter Error:", data);
            throw new Error(data?.error?.message || "OpenRouter API error");
        }

        return NextResponse.json({ success: true, data: data.choices[0].message.content }, { status: 200 });
    } catch (error) {
        console.log("AI Generate Error:", error);
        return handleError(error, "api") as any;
    }
}
