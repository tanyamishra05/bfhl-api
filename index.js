const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const EMAIL = "your_email@chitkara.edu.in"; // 🔴 change this

// ---------- HEALTH API ----------
app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: EMAIL
  });
});

// ---------- BFHL API ----------
app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;

    // Fibonacci
    if (body.fibonacci !== undefined) {
      const n = body.fibonacci;
      let fib = [0, 1];
      for (let i = 2; i < n; i++) {
        fib.push(fib[i - 1] + fib[i - 2]);
      }
      return res.status(200).json({
        is_success: true,
        official_email: EMAIL,
        data: fib.slice(0, n)
      });
    }

    // Prime
    if (body.prime !== undefined) {
      const nums = body.prime;
      const isPrime = (num) => {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
          if (num % i === 0) return false;
        }
        return true;
      };

      return res.status(200).json({
        is_success: true,
        official_email: EMAIL,
        data: nums.filter(isPrime)
      });
    }

    // LCM
    if (body.lcm !== undefined) {
      const nums = body.lcm;
      const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
      const lcm = (a, b) => (a * b) / gcd(a, b);

      let result = nums[0];
      for (let i = 1; i < nums.length; i++) {
        result = lcm(result, nums[i]);
      }

      return res.status(200).json({
        is_success: true,
        official_email: EMAIL,
        data: result
      });
    }

    // HCF
    if (body.hcf !== undefined) {
      const nums = body.hcf;
      const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

      let result = nums[0];
      for (let i = 1; i < nums.length; i++) {
        result = gcd(result, nums[i]);
      }

      return res.status(200).json({
        is_success: true,
        official_email: EMAIL,
        data: result
      });
    }

    // AI (Gemini example)
    if (body.AI !== undefined) {
      const question = body.AI;

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: question }] }]
        }
      );

      const answer =
        response.data.candidates[0].content.parts[0].text
          .split(" ")[0];

      return res.status(200).json({
        is_success: true,
        official_email: EMAIL,
        data: answer
      });
    }

    return res.status(400).json({
      is_success: false,
      message: "Invalid request key"
    });

  } catch (error) {
    return res.status(500).json({
      is_success: false,
      error: error.message
    });
  }
});

// ---------- SERVER ----------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
