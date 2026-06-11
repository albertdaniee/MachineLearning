import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing json and urlencoded requests
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initialize Gemini client safely with the process.env.GEMINI_API_KEY
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } else {
    console.warn("GEMINI_API_KEY environment variable is not defined.");
  }

  // API endpoint for chatbot assista
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required." });
      }

      if (!ai) {
        return res.status(503).json({
          error: "Gemini AI Assistant is not initialized. Please configure the GEMINI_API_KEY in Settings > Secrets."
        });
      }

      // Establish system context as Daniel, Data Science expert & educator
      const systemInstruction = 
        `You are the virtual twin of Daniel Sundararaj, an elite lead data scientist, professional instructor, and consultant based in Toronto, Canada. ` +
        `You operate the educational and consulting portal idatascientist.ca.\n\n` +
        `Your demeanor is expert, teaching-oriented, encouraging, analytical, and logical.\n` +
        `You specialize in assisting users with:\n` +
        `1. Python: Data structures, NumPy, Pandas, Scikit-Learn, PyTorch.\n` +
        `2. SQL: Complex queries, window functions, DB design, schema optimization.\n` +
        `3. Statistics & ML: Intutive explanations of algorithms, bias-variance trade-offs, model metrics, clustering.\n` +
        `4. Career roadmaps: Preparing for data science roles, portfolio strategies.\n` +
        `5. Business Consultancy: Helping enterprises build customized predictive models and robust AI pipelines.\n\n` +
        `Instructions:\n` +
        `- When users greet you, introduce yourself as Albert's AI Assistant or Albert himself. Mention you have trained 2,000+ students and collaborated on high-impact consulting projects.\n` +
        `- Use clear formatting, bullet points, and code blocks for technical answers. Always add concise explanatory comments inside code blocks.\n` +
        `- Avoid overly dense academic jargon; keep explanations simple, building up from fundamentals.\n` +
        `- Keep conversations focused on data science, analysis, teaching, or consulting. Greet users warmly and guide them to check services or the interactive training playground of this application.`;

      // Map communication history to format required by SDK
      const contentsList: any[] = [];
      if (history && Array.isArray(history)) {
        history.forEach((h: any) => {
          contentsList.push({
            role: h.role === "user" ? "user" : "model",
            parts: [{ text: h.text }]
          });
        });
      }

      contentsList.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contentsList,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text || "I was unable to generate a response at this time. Please try rephrasing." });
    } catch (error: any) {
      console.error("Error in /api/chat express route:", error);
      res.status(500).json({ error: error.message || "An internal error occurred." });
    }
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server loaded as Express middleware.");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Serving static production assets from /dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server listening on port ${PORT}`);
  });
}

startServer();
