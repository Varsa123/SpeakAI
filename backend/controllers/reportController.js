import PDFDocument from "pdfkit";
import Practice from "../models/Practice.js";

export const downloadReport = async (req, res) => {
  try {
    const practice = await Practice.findById(req.params.id);

    if (!practice) {
      return res.status(404).json({
        message: "Practice not found",
      });
    }

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=SpeakAI_Report.pdf`
    );

    doc.pipe(res);

    doc
      .fontSize(24)
      .text("SpeakAI Speaking Report", {
        align: "center",
      });

    doc.moveDown();

    doc.fontSize(18).text("Scores");

    doc.moveDown();

    doc.text(`Grammar : ${practice.grammar}/10`);
    doc.text(`Fluency : ${practice.fluency}/10`);
    doc.text(`Vocabulary : ${practice.vocabulary}/10`);
    doc.text(`Confidence : ${practice.confidence}/10`);

    doc.moveDown();

    doc.fontSize(18).text("Transcript");

    doc.moveDown();

    doc.fontSize(12).text(practice.transcript);

    doc.moveDown();

    doc.fontSize(18).text("AI Feedback");

    doc.moveDown();

    practice.feedback.forEach((item) => {
      doc.text(`• ${item}`);
    });

    doc.end();

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};