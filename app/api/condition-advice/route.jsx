// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//     try {
//         const { conditionScores, likelihoods, topCondition } = await request.json();

//         if (!conditionScores || !likelihoods || !topCondition) {
//             return NextResponse.json(
//                 { error: "Missing required parameters" },
//                 { status: 400 }
//             );
//         }

//         const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_AI_API_KEY);
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//         const prompt = `
//       Generate a personality disorder screening advice write-up for a web app. The app displays:
//       - Condition Scores and Likelihoods: ${Object.entries(conditionScores)
//                 .map(([c, s]) => `${c}: ${s}% (${likelihoods[c]})`)
//                 .join(", ")}
//       - Top Condition: ${topCondition} (Score: ${conditionScores[topCondition]}%, Likelihood: ${likelihoods[topCondition]})

//       Return a JSON object with two fields:
//       - "topConditionExplanation": A concise explanation (75-100 words) of ${topCondition} (score: ${conditionScores[topCondition]}%, likelihood: ${likelihoods[topCondition]}), describing its key characteristics in a supportive, empathetic tone. Do not mention other conditions. Emphasize that this is a screening tool, not a diagnosis, and professional evaluation is needed.
//       - "conditionAdvice": A concise write-up (100-125 words) providing actionable advice for managing ${topCondition}, including coping strategies (e.g., DBT for BPD, self-awareness for NPD) and recommendations to seek professional help (e.g., psychologists, support groups). Do not mention other conditions. Use a positive, encouraging tone.

//       CRITICAL CONSTRAINTS:
//       - "topConditionExplanation" must only describe ${topCondition} and its traits, avoiding other conditions.
//       - "conditionAdvice" must only provide advice for ${topCondition}, avoiding other conditions.
//       - Total length must be 175-225 words, formatted as valid JSON.
//       - Align with the app's UI, emphasizing informational purpose and the need for professional diagnosis.
//       - Avoid diagnostic language; use terms like "may indicate" or "suggests."
//     `;

//         let advice = null;
//         let attempts = 0;
//         const maxAttempts = 3;

//         while (attempts < maxAttempts && !advice) {
//             attempts++;
//             console.log(`Attempt ${attempts} to fetch valid LLM response`);

//             const result = await model.generateContent(prompt);
//             let responseText = result.response.text();

//             if (responseText.startsWith("```json") && responseText.endsWith("```")) {
//                 responseText = responseText.slice(7, -3).trim();
//             } else if (
//                 responseText.startsWith("```") &&
//                 responseText.endsWith("```")
//             ) {
//                 responseText = responseText.slice(3, -3).trim();
//             }

//             const startIndex = responseText.indexOf("{");
//             const endIndex = responseText.lastIndexOf("}");
//             if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
//                 console.error(`Attempt ${attempts}: No valid JSON object found`);
//                 continue;
//             }

//             const jsonString = responseText.slice(startIndex, endIndex + 1).trim();

//             let parsedAdvice;
//             try {
//                 parsedAdvice = JSON.parse(jsonString);
//             } catch (parseError) {
//                 console.error(`Attempt ${attempts}: Error parsing JSON:`, parseError);
//                 continue;
//             }

//             if (
//                 !parsedAdvice.topConditionExplanation ||
//                 !parsedAdvice.conditionAdvice
//             ) {
//                 console.error(`Attempt ${attempts}: Incomplete response from AI`);
//                 continue;
//             }

//             const otherConditions = ["BPD", "NPD", "ASPD", "AvPD"]
//                 .filter((c) => c !== topCondition)
//                 .map((c) => c.toLowerCase());
//             const explanationText =
//                 parsedAdvice.topConditionExplanation.toLowerCase();
//             const adviceText = parsedAdvice.conditionAdvice.toLowerCase();

//             if (
//                 otherConditions.some(
//                     (c) => explanationText.includes(c) || adviceText.includes(c)
//                 )
//             ) {
//                 console.error(
//                     `Attempt ${attempts}: Response includes other conditions`
//                 );
//                 continue;
//             }

//             advice = parsedAdvice;
//         }

//         if (!advice) {
//             return NextResponse.json(
//                 { error: "Failed to generate valid advice after multiple attempts" },
//                 { status: 500 }
//             );
//         }

//         return NextResponse.json({ advice }, { status: 200 });
//     } catch (error) {
//         console.error("Error generating advice:", error);
//         return NextResponse.json(
//             { error: "Failed to generate condition advice" },
//             { status: 500 }
//         );
//     }
// }


/////////////////////////////THIS ONE WORKS 

// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { NextResponse } from "next/server";

// async function delay(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }

// export async function POST(request) {
//     try {
//         const { highLikelihoodConditions } = await request.json();
//         if (!highLikelihoodConditions || !Array.isArray(highLikelihoodConditions) || highLikelihoodConditions.length === 0) {
//             return NextResponse.json({ error: "Invalid or missing conditions" }, { status: 400 });
//         }

//         // Use only the top condition to minimize API calls
//         const topCondition = highLikelihoodConditions[0];
//         const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_AI_API_KEY);
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//         // Mock response for development to avoid hitting quota
//         if (process.env.NODE_ENV === "development") {
//             console.log(`Using mock response for ${topCondition}`);
//             return NextResponse.json({
//                 advice: [{
//                     condition: topCondition,
//                     explanation: `This screening suggests ${topCondition} traits may be present. It often involves specific emotional or behavioral patterns unique to this condition. This tool is not a substitute for a professional diagnosis. Consult a licensed mental health professional for a thorough evaluation.`,
//                     advice: `To manage traits associated with ${topCondition}, consider seeking therapy, such as cognitive-behavioral therapy or dialectical behavior therapy, depending on your needs. Joining a support group or consulting a psychologist can provide personalized guidance. Stay proactive and seek professional support for your well-being.`
//                 }]
//             }, { status: 200 });
//         }

//         const prompt = `
//       Generate a personality disorder screening advice write-up for ${topCondition}.
//       Return a JSON object with:
//       - "condition": "${topCondition}"
//       - "explanation": A concise explanation (75-100 words) of ${topCondition}, describing its key characteristics in a supportive, empathetic tone. Do not mention other conditions. Emphasize that this is a screening tool, not a diagnosis, and professional evaluation is needed.
//       - "advice": A concise write-up (100-125 words) providing actionable advice for managing ${topCondition}, including coping strategies (e.g., DBT for Borderline Personality Disorder, self-awareness for Narcissistic Personality Disorder) and recommendations to seek professional help. Do not mention other conditions. Use a positive, encouraging tone.
//       Constraints:
//       - Total length: 175-225 words.
//       - Avoid diagnostic language; use "may indicate" or "suggests."
//       - Format as valid JSON.
//     `;

//         let advice = null;
//         let attempts = 0;
//         const maxAttempts = 3;
//         const baseDelay = 5000;

//         while (attempts < maxAttempts && !advice) {
//             attempts++;
//             console.log(`Attempt ${attempts} to fetch valid LLM response for ${topCondition}`);

//             try {
//                 const result = await model.generateContent(prompt);
//                 let responseText = result.response.text();
//                 console.log("Raw API response:", responseText);

//                 if (responseText.startsWith("```json") && responseText.endsWith("```")) {
//                     responseText = responseText.slice(7, -3).trim();
//                 } else if (responseText.startsWith("```") && responseText.endsWith("```")) {
//                     responseText = responseText.slice(3, -3).trim();
//                 }

//                 const parsedAdvice = JSON.parse(responseText);
//                 if (!parsedAdvice.condition || !parsedAdvice.explanation || !parsedAdvice.advice) {
//                     console.error(`Attempt ${attempts}: Incomplete response for ${topCondition}`);
//                     continue;
//                 }

//                 advice = [parsedAdvice]; // Wrap in array for consistency
//             } catch (error) {
//                 if (error.status === 429) {
//                     console.warn(`Attempt ${attempts}: Rate limit hit, retrying after ${baseDelay * attempts}ms`);
//                     if (attempts === maxAttempts) {
//                         throw new Error("Rate limit exceeded after maximum retries");
//                     }
//                     await delay(baseDelay * attempts);
//                     continue;
//                 }
//                 throw error;
//             }
//         }

//         if (!advice) {
//             return NextResponse.json({ error: "Failed to generate valid advice after multiple attempts" }, { status: 500 });
//         }

//         return NextResponse.json({ advice }, { status: 200 });
//     } catch (error) {
//         console.error("Error generating advice:", error);
//         return NextResponse.json({ error: error.message || "Failed to generate advice" }, { status: 500 });
//     }
// }




import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request) {
    try {
        const { highLikelihoodConditions } = await request.json();
        if (!highLikelihoodConditions || !Array.isArray(highLikelihoodConditions) || highLikelihoodConditions.length === 0) {
            return NextResponse.json({ error: "Invalid or missing conditions" }, { status: 400 });
        }

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_AI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Mock response for development to avoid hitting quota
        if (process.env.NODE_ENV === "development") {
            console.log(`Using mock response for conditions: ${highLikelihoodConditions.join(", ")}`);
            return NextResponse.json({
                advice: highLikelihoodConditions.map((condition) => ({
                    condition,
                    explanation: `This screening suggests ${condition} traits may be present. It often involves specific emotional or behavioral patterns unique to this condition. This tool is not a substitute for a professional diagnosis. Consult a licensed mental health professional for a thorough evaluation.`,
                    advice: `To manage traits associated with ${condition}, consider seeking therapy, such as cognitive-behavioral therapy or dialectical behavior therapy, depending on your needs. Joining a support group or consulting a psychologist can provide personalized guidance. Stay proactive and seek professional support for your well-being.`
                }))
            }, { status: 200 });
        }

        const prompt = `
      Generate a personality disorder screening advice write-up for the following conditions: ${highLikelihoodConditions.join(", ")}.
      For each condition, return a JSON object with:
      - "condition": The condition name.
      - "explanation": A concise explanation (75-100 words) describing its key characteristics in a supportive, empathetic tone. Do not mention other conditions. Emphasize that this is a screening tool, not a diagnosis, and professional evaluation is needed.
      - "advice": A concise write-up (100-125 words) providing actionable advice for managing the condition, including coping strategies (e.g., DBT for Borderline Personality Disorder, self-awareness for Narcissistic Personality Disorder) and recommendations to seek professional help. Do not mention other conditions. Use a positive, encouraging tone.
      Constraints:
      - Total length per condition: 175-225 words.
      - Avoid diagnostic language; use "may indicate" or "suggests."
      - Return an array of JSON objects, one per condition, formatted as valid JSON.
    `;

        let advice = null;
        let attempts = 0;
        const maxAttempts = 3;
        const baseDelay = 5000;

        while (attempts < maxAttempts && !advice) {
            attempts++;
            console.log(`Attempt ${attempts} to fetch valid LLM response for ${highLikelihoodConditions.join(", ")}`);

            try {
                const result = await model.generateContent(prompt);
                let responseText = result.response.text();
                console.log("Raw API response:", responseText);

                if (responseText.startsWith("```json") && responseText.endsWith("```")) {
                    responseText = responseText.slice(7, -3).trim();
                } else if (responseText.startsWith("```") && responseText.endsWith("```")) {
                    responseText = responseText.slice(3, -3).trim();
                }

                const parsedAdvice = JSON.parse(responseText);
                if (!Array.isArray(parsedAdvice) || parsedAdvice.length !== highLikelihoodConditions.length) {
                    console.error(`Attempt ${attempts}: Invalid response structure, expected ${highLikelihoodConditions.length} items`);
                    continue;
                }

                for (const item of parsedAdvice) {
                    if (!item.condition || !item.explanation || !item.advice) {
                        console.error(`Attempt ${attempts}: Incomplete response for ${item.condition || "unknown condition"}`);
                        throw new Error(`Incomplete response for ${item.condition || "unknown condition"}`);
                    }
                }

                advice = parsedAdvice;
            } catch (error) {
                if (error.status === 429) {
                    console.warn(`Attempt ${attempts}: Rate limit hit, retrying after ${baseDelay * attempts}ms`);
                    if (attempts === maxAttempts) {
                        throw new Error("Rate limit exceeded after maximum retries");
                    }
                    await delay(baseDelay * attempts);
                    continue;
                }
                throw error;
            }
        }

        if (!advice) {
            return NextResponse.json({ error: "Failed to generate valid advice after multiple attempts" }, { status: 500 });
        }

        return NextResponse.json({ advice }, { status: 200 });
    } catch (error) {
        console.error("Error generating advice:", error);
        return NextResponse.json({ error: error.message || "Failed to generate advice" }, { status: 500 });
    }
}