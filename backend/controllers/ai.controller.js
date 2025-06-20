const { askOpenAI } = require("../utils/aiHelper");

exports.askAI = async (req, res) => {
  try {
    const { question, courseTitle, lessonTitle } = req.body;

    if (!question || !courseTitle) {
      return res.status(400).json({
        success: false,
        message: "Missing question or courseTitle",
      });
    }

    const prompt = `A student is asking a question based on the course titled "${courseTitle}"` +
      (lessonTitle ? ` and lesson titled "${lessonTitle}". ` : ". ") +
      `The question is: "${question}". Give a clear and helpful explanation.`;

    const answer = await askOpenAI(prompt);

    return res.status(200).json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("AI Controller Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while asking the AI",
    });
  }
};
