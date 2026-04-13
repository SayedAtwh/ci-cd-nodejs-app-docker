const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Application Data
const azkar = {
    morning: [
        { text: "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له", count: 1 },
        { text: "اللهم بك أصبحنا، وبك أمسينا، وبك نحيا، وبك نموت، وإليك النشور", count: 1 },
        { text: "سبحان الله وبحمده", count: 100 },
        { text: "أستغفر الله وأتوب إليه", count: 100 },
        { text: "آية الكرسي: اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ", count: 1 }
    ],
    evening: [
        { text: "أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له", count: 1 },
        { text: "اللهم بك أمسينا، وبك أصبحنا، وبك نحيا، وبك نموت، وإليك المصير", count: 1 },
        { text: "أعوذ بكلمات الله التامات من شر ما خلق", count: 3 },
        { text: "يا حي يا قيوم برحمتك أستغيث أصلح لي شأني كله", count: 1 },
        { text: "اللهم أنت ربي لا إله إلا أنت خلقتني وأنا عبدك", count: 1 }
    ]
};

// UI Template
const renderShell = (title, content) => `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - أذكار المسلم</title>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #10b981;
            --primary-dark: #059669;
            --bg: #0f172a;
            --card-bg: rgba(30, 41, 59, 0.7);
            --text: #f1f5f9;
        }

        * { box-sizing: border-box; }

        body {
            margin: 0;
            padding: 0;
            font-family: 'Tajawal', sans-serif;
            background: radial-gradient(circle at top right, #1e293b, #0f172a);
            color: var(--text);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .container {
            width: 100%;
            max-width: 800px;
            padding: 40px 20px;
            text-align: center;
        }

        h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            background: linear-gradient(to left, #34d399, #60a5fa);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .subtitle {
            font-weight: 300;
            color: #94a3b8;
            margin-bottom: 40px;
        }

        .nav-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-bottom: 30px;
        }

        .btn {
            padding: 12px 30px;
            border-radius: 12px;
            border: none;
            cursor: pointer;
            font-family: inherit;
            font-weight: 700;
            transition: all 0.3s ease;
            text-decoration: none;
            font-size: 1rem;
        }

        .btn-primary { background: var(--primary); color: white; }
        .btn-outline { background: transparent; border: 2px solid var(--primary); color: var(--primary); }
        .btn:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(16, 185, 129, 0.2); }

        .azkar-list {
            display: flex;
            flex-direction: column;
            gap: 20px;
            width: 100%;
        }

        .zkr-card {
            background: var(--card-bg);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 25px;
            border-radius: 20px;
            text-align: right;
            position: relative;
            transition: transform 0.2s;
            cursor: pointer;
            user-select: none;
        }

        .zkr-card:active { transform: scale(0.98); }

        .zkr-text {
            font-size: 1.3rem;
            line-height: 1.6;
            margin-bottom: 15px;
            display: block;
        }

        .zkr-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 15px;
        }

        .zkr-count {
            background: var(--primary);
            padding: 5px 15px;
            border-radius: 999px;
            font-size: 0.9rem;
            font-weight: bold;
        }

        .completed {
            opacity: 0.5;
            background: rgba(15, 23, 42, 0.9);
            pointer-events: none;
        }

        .completed .zkr-count { background: #475569; }

        footer {
            margin-top: auto;
            padding: 20px;
            color: #64748b;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="container">
        ${content}
    </div>
    <footer>© 2026 تطبيق الأذكار المطور - بيئة جينكنز للإنتاج</footer>

    <script>
        function decrement(el) {
            const badge = el.querySelector('.zkr-count span');
            let count = parseInt(badge.innerText);
            if (count > 0) {
                count--;
                badge.innerText = count;
                if (count === 0) {
                    el.classList.add('completed');
                }
            }
        }
    </script>
</body>
</html>
`;

// Routes
app.get('/', (req, res) => {
    res.send(renderShell('البداية', `
        <h1>📿 أذكار المسلم</h1>
        <p class="subtitle">تطبيق بسيط يساعدك على المداومة على ذكر الله</p>
        <div class="nav-buttons">
            <a href="/azkar/morning" class="btn btn-primary">🌅 أذكار الصباح</a>
            <a href="/azkar/evening" class="btn btn-outline">🌙 أذكار المساء</a>
        </div>
        <div style="margin-top: 40px; opacity: 0.6;">
            <p>تم بناء هذا التطبيق بواسطة Jenkins Pipeline</p>
        </div>
    `));
});

app.get('/azkar/morning', (req, res) => {
    const list = azkar.morning.map(z => `
        <div class="zkr-card" onclick="decrement(this)">
            <span class="zkr-text">${z.text}</span>
            <div class="zkr-footer">
                <div class="zkr-count">التكرار: <span>${z.count}</span></div>
            </div>
        </div>
    `).join('');

    res.send(renderShell('أذكار الصباح', `
        <h1>🌅 أذكار الصباح</h1>
        <div class="nav-buttons">
            <a href="/" class="btn btn-outline">🏠 الرئيسية</a>
            <a href="/azkar/evening" class="btn btn-primary">🌙 أذكار المساء</a>
        </div>
        <div class="azkar-list">${list}</div>
    `));
});

app.get('/azkar/evening', (req, res) => {
    const list = azkar.evening.map(z => `
        <div class="zkr-card" onclick="decrement(this)">
            <span class="zkr-text">${z.text}</span>
            <div class="zkr-footer">
                <div class="zkr-count">التكرار: <span>${z.count}</span></div>
            </div>
        </div>
    `).join('');

    res.send(renderShell('أذكار المساء', `
        <h1>🌙 أذكار المساء</h1>
        <div class="nav-buttons">
            <a href="/" class="btn btn-outline">🏠 الرئيسية</a>
            <a href="/azkar/morning" class="btn btn-primary">🌅 أذكار الصباح</a>
        </div>
        <div class="azkar-list">${list}</div>
    `));
});

app.listen(PORT, () => {
    console.log(`🚀 Azkar Premium App running on http://localhost:${PORT}`);
});