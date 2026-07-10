require("dotenv").config();
const { marked } = require("marked");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const methodOverride = require("method-override");
const app = express();
const session = require("express-session");
const User = require("./models/users");
const userRouters = require("./routes/users");
const flash = require("connect-flash");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);



// ===============================
// Middleware
// ===============================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ===============================
// Static Files
// ===============================
app.use(express.static(path.join(__dirname, "public")));

// ===============================
// View Engine
// ===============================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



main()
    .then(() => {
        console.log("✅ Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(process.env.MONGODB_URL);
}

const sessionOptions = {
    secret: "sdfghju6redsdfgmnbvcxsaq23456789",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}

app.use(session(sessionOptions));
app.use(flash());



// for authentication passport 
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new LocalStrategy(
        { usernameField: "email" },
        User.authenticate()
    )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ✅ This middleware must come BEFORE routes
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// ✅ Then register routes
app.use("/user", userRouters);

// ===============================
// Routes
// ===============================

// Home Page
app.get("/", (req, res) => {
    res.render("index", {
        title: "Krishi Sarthi"
    });
});

// About Page
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Us"
    });
});

// Contact Page
app.get("/contact", (req, res) => {
    res.render("contact", {
        title: "Contact"
    });
});

// Dashboard
app.get("/dashboard", (req, res) => {
    res.render("dashboard", {
        title: "Dashboard"
    });
});

// Crop Recommendation
app.get("/crop", (req, res) => {
    res.render("crop", {
        title: "Crop Recommendation"
    });
});

// Disease Prediction
app.get("/disease", (req, res) => {
    res.render("disease", {
        title: "Disease Prediction"
    });
});

// Profit Prediction
app.get("/profit", (req, res) => {
    res.render("profit", {
        title: "Profit Prediction"
    });
});

// estimation cost post method

app.post("/cost", async (req, res) => {
    const { crop, land, seed, fertilizer, labour, irrigation, others } = req.body;

    const total = Number(seed) + Number(fertilizer) + Number(labour) + Number(irrigation) + Number(others);

    const prompt = `
You are a concise agricultural advisor for Indian farmers. Be brief and use bullet points only.

Crop: "${crop}" | Land: ${land} acres | Total Cost: ₹${total}
Costs: Seed ₹${seed}, Fertilizer ₹${fertilizer}, Labour ₹${labour}, Irrigation ₹${irrigation}, Others ₹${others}

Respond with EXACTLY these 6 sections using markdown. Keep each section to 2-3 bullet points max:

## ✅ Cost Assessment
(Are these costs reasonable for ${crop} in India? Yes/No + 1 line reason)

## ⚠️ Missing Costs
(2-3 commonly missed expenses for this crop)

## 📈 Yield & Profit
(Expected yield in quintals and estimated profit for ${land} acres)

## 💡 Cost-Saving Tips
(3 specific tips for ${crop})

## 🏛️ Government Schemes
(2-3 relevant schemes/subsidies for ${crop} farmers in India)

## 🔴 Key Risks
(2-3 main risks to watch out for)

Be short, factual, and farmer-friendly. No long paragraphs.
    `;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent(prompt);

        const aiResponse = result.response.text();
        const aiResponseHTML = marked(aiResponse);

        res.render("cost", {
            title: "Estimated cost",
            total,
            crop,
            land,
            seed,
            fertilizer,
            labour,
            irrigation,
            others,
            aiResponse: aiResponseHTML
        });


    } catch (err) {
        console.error("Gemini AI Error : ", err);
        req.flash("error", "AI service failed . Please try again");
        res.redirect("/cost");
    }

});

// Estimated Cost
app.get("/cost", (req, res) => {
    res.render("cost", {
        title: "Estimated Cost",
        total: null,
        crop: null,
        land: null,
        seed: null,
        fertilizer: null,
        labour: null,
        irrigation: null,
        others: null,
        aiResponse: null
    });
});

// Weather
app.get("/weather", (req, res) => {
    res.render("weather", {
        title: "Weather"
    });
});

// Government Schemes
app.get("/schemes", (req, res) => {
    res.render("schemes", {
        title: "Government Schemes"
    });
});

// AI Chatbot
app.get("/chatbot", (req, res) => {
    res.render("chatbot", {
        title: "AI Chatbot"
    });
});

// ===============================
// 404 Page
// ===============================
app.use((req, res) => {
    res.status(404).send("404 | Page Not Found");
});

// ===============================
// Server
// ===============================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});