const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// static files (الصورة)
app.use(express.static(path.join(__dirname, 'public')));

// الصفحة الرئيسية
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Falcon</title>
            <style>
                body {
                    margin: 0;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: linear-gradient(135deg, #0f0f0f, #1c1c1c);
                    font-family: Arial, sans-serif;
                }

                .container {
                    text-align: center;
                }

                img {
                    width: 320px;
                    max-width: 80%;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.6);
                    transition: transform 0.3s ease;
                }

                img:hover {
                    transform: scale(1.05);
                }

                h1 {
                    color: #ffffff;
                    font-weight: 300;
                    margin-bottom: 20px;
                    letter-spacing: 2px;
                }
            </style>
        </head>
        <body>

            <div class="container">
                <h1>Falcon</h1>
                <img src="/falcon.jpg" alt="Falcon Image">
            </div>

        </body>
        </html>
    `);
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});