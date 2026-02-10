import { jsPDF } from "jspdf";

export function generatePdf(text) {
  const doc = new jsPDF();
  const marginX = 15;
  let y = 20;

  const lines = (text || "").split("\n");

  lines.forEach((line) => {
    // 🔹 Heading
    if (line.startsWith("# ")) {
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text(line.replace("# ", ""), marginX, y);
      y += 12;
      return;
    }

    // 🔹 List item
    if (line.startsWith("- ")) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("• " + line.replace("- ", ""), marginX + 5, y);
      y += 8;
      return;
    }

    // 🔹 Bold (**text**)
    if (line.includes("**")) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(line.replace(/\*\*/g, ""), marginX, y);
      y += 8;
      return;
    }

    // 🔹 Italic (*text*)
    if (line.includes("*")) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "italic");
      doc.text(line.replace(/\*/g, ""), marginX, y);
      y += 8;
      return;
    }

    // 🔹 Normal text
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(line, marginX, y);
    y += 8;
  });

  return doc;
}

export function downloadPdf(doc) {
  doc.save("document.pdf");
}

export function previewPdf(doc) {
  return doc.output("bloburl");
}
