import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
/**
 * Extract text from PDF file
 * @param {File} file - PDF file
 * @returns {Promise<string>} - Extracted text
 */
export async function extractTextFromPDF(file: File) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = "";

    // Extract text from each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item) => ("str" in item ? item.str : ""))
        .join(" ");

      fullText += pageText + "\n\n";
    }

    return fullText.trim();
  } catch (error) {
    console.error("PDF extraction error:", error);
    throw new Error("Failed to extract text from PDF");
  }
}

/**
 * Extract text from DOCX file
 * @param {File} file - DOCX file
 * @returns {Promise<string>} - Extracted text
 */
export async function extractTextFromDOCX(file: File) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value.trim();
  } catch (error) {
    console.error("DOCX extraction error:", error);
    throw new Error("Failed to extract text from DOCX");
  }
}

/**
 * Main parser - detect file type and extract text
 * @param {File} file - CV file (PDF or DOCX)
 * @returns {Promise<{text: string, previewUrl: string}>}
 */
export async function parseCVFile(file: File) {
  const fileExtension = file.name?.split(".")?.pop()?.toLowerCase();

  let extractedText = "";

  if (fileExtension === "pdf") {
    extractedText = await extractTextFromPDF(file);
  } else if (fileExtension === "docx" || fileExtension === "doc") {
    extractedText = await extractTextFromDOCX(file);
  } else {
    throw new Error(
      "Unsupported file format. Only PDF and DOCX are supported.",
    );
  }

  // Create preview URL (blob URL for rendering)
  const previewUrl = URL.createObjectURL(file);

  return {
    text: extractedText,
    previewUrl: previewUrl,
    fileType: fileExtension,
  };
}

/**
 * Cleanup blob URL when done
 * @param {string} url - Blob URL to revoke
 */
export function revokePreviewUrl(url: string) {
  if (url) {
    URL.revokeObjectURL(url);
  }
}
