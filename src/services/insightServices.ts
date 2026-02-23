import { INSIGHT_INSTRUCTION_TEMPLATE } from "@/prompts/insight";
import { MODEL_2 } from "./../constants/model";
import axios from "axios";

const API_KEY =
  "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";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

export class InsightService {
  /**
   * Trích xuất JSON từ response có thể chứa text thừa
   */
  private static extractJSON(content: string): any {
    // Loại bỏ markdown code blocks
    let cleaned = content
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();

    // Tìm JSON object đầu tiên trong chuỗi
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleaned = jsonMatch[0];
    }

    // Tìm JSON array đầu tiên nếu không có object
    if (!jsonMatch) {
      const arrayMatch = cleaned.match(/\[[\s\S]*\]/);
      if (arrayMatch) {
        cleaned = arrayMatch[0];
      }
    }

    try {
      return JSON.parse(cleaned);
    } catch (error) {
      // Log để debug
      console.error("Failed to parse JSON:", cleaned);
      throw new Error(`Invalid JSON format: ${error}`);
    }
  }

  static async insightCV(cvAnalysisJson: any): Promise<any> {
    try {
      const instruction = INSIGHT_INSTRUCTION_TEMPLATE.replace(
        "{CV_ANALYSIS_JSON}",
        JSON.stringify(cvAnalysisJson),
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
          // Thêm response_format để ép AI trả về JSON
          response_format: { type: "json_object" },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        },
      );

      if (!response.data?.choices?.[0]?.message?.content) {
        throw new Error("Invalid API response format");
      }

      const content = response.data.choices[0].message.content;
      return this.extractJSON(content);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
      } else {
        console.error("AI Service Error:", error);
      }
      throw error;
    }
  }
}

export default InsightService;
