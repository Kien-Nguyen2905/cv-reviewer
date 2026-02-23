import { MODEL_2 } from "@/constants/model";
import { ANALYZING_INSTRUCTION_TEMPLATE } from "@/prompts/analyzing";
import axios from "axios";

const API_KEY =
  "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";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

export class AnalyzingService {
  static async analyzeCV(cvText: any): Promise<any> {
    try {
      const instruction = ANALYZING_INSTRUCTION_TEMPLATE.replace(
        "{CV_TEXT}",
        cvText,
      );

      const response = await axios.post(
        API_URL,
        {
          model: MODEL_2,
          messages: [
            {
              role: "user",
              content: instruction,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        },
      );

      if (
        response.data.choices &&
        response.data.choices[0] &&
        response.data.choices[0].message
      ) {
        let content = response.data.choices[0].message.content;

        // Clean up the response - remove markdown code blocks if present
        content = content
          .replace(/```json\s*/g, "")
          .replace(/```\s*/g, "")
          .trim();

        try {
          return JSON.parse(content);
        } catch (parseError) {
          console.error("JSON Parse Error:", parseError);
          throw new Error("Failed to parse AI response as JSON");
        }
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (error) {
      console.error("AI Service Error:", error);
      throw error;
    }
  }
}

export default AnalyzingService;
