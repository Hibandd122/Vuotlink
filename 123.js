// ==UserScript==
// @name         Game Key Hmgaming
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Fetch game keys with a stunning, larger UI
// @author       You
// @match        https://hmgteam.net/GETKEY/index.php?api=vipadminkey
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Reset and style the page
    document.documentElement.innerHTML = "";
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";
    document.body.style.width = "100vw";
    document.body.style.height = "100vh";
    document.body.style.background = "linear-gradient(135deg, #0f2027, #203a43, #2c5364)";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    document.body.style.fontFamily = "'Poppins', sans-serif";

    // Game data
    let games = [
        { name: "Liên Quân", url: "https://hmgteam.net/GETKEY/index.php?api=vipadminkey&type=com.garena.game.kgvn&g-recaptcha-response=1234567890" },
        { name: "Phục Kích", url: "https://hmgteam.net/GETKEY/index.php?api=vipadminkey&type=com.vtcmobilejsc.phuckichvtc&g-recaptcha-response=1234567890" },
        { name: "LMHT: Tốc Chiến", url: "https://hmgteam.net/GETKEY/index.php?api=vipadminkey&type=com.riotgames.league.wildrift&g-recaptcha-response=1234567890" },
        { name: "Tập Kích", url: "https://hmgteam.net/GETKEY/index.php?api=vipadminkey&type=com.vtc.tapkich&g-recaptcha-response=1234567890" },
        { name: "PLAY TOGETHER VNG", url: "https://hmgteam.net/GETKEY/index.php?api=vipadminkey&type=com.vng.playtogether&g-recaptcha-response=1234567890" },
        { name: "PLAY TOGETHER GLOBAL", url: "https://hmgteam.net/GETKEY/index.php?api=vipadminkey&type=com.haegin.playtogether&g-recaptcha-response=1234567890" }
    ];

    // Create container
    let container = document.createElement("div");
    container.style.width = "100%";
    container.style.maxWidth = "800px"; // Fixed larger width
    container.style.minHeight = "600px"; // Fixed larger height
    container.style.background = "rgba(255, 255, 255, 0.05)";
    container.style.backdropFilter = "blur(10px)";
    container.style.borderRadius = "25px";
    container.style.padding = "40px";
    container.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.6)";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "25px";
    container.style.border = "1px solid rgba(255, 255, 255, 0.15)";
    container.style.boxSizing = "border-box";

    // Add animated title
    let title = document.createElement("h1");
    title.textContent = "Game Key Hmgaming";
    title.style.color = "#fff";
    title.style.textAlign = "center";
    title.style.fontSize = "3em";
    title.style.textShadow = "0 0 20px rgba(255, 255, 255, 0.9)";
    title.style.animation = "glow 2s infinite alternate";
    container.appendChild(title);

    // Add CSS for animation
    let styleSheet = document.createElement("style");
    styleSheet.textContent = `
        @keyframes glow {
            from { text-shadow: 0 0 10px rgba(255, 255, 255, 0.5); }
            to { text-shadow: 0 0 25px rgba(255, 255, 255, 1); }
        }
        button:hover {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
        }
    `;
    document.head.appendChild(styleSheet);

    // Create game buttons
    games.forEach(game => {
        let wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.alignItems = "center";
        wrapper.style.gap = "20px";
        wrapper.style.background = "rgba(255, 255, 255, 0.08)";
        wrapper.style.padding = "20px";
        wrapper.style.borderRadius = "15px";
        wrapper.style.transition = "transform 0.3s, background 0.3s";
        wrapper.style.width = "100%";
        wrapper.onmouseover = () => wrapper.style.transform = "translateY(-8px)";
        wrapper.onmouseout = () => wrapper.style.transform = "translateY(0)";

        let button = document.createElement("button");
        button.textContent = game.name;
        button.style.padding = "15px 30px";
        button.style.fontSize = "18px";
        button.style.fontWeight = "600";
        button.style.cursor = "pointer";
        button.style.border = "none";
        button.style.borderRadius = "10px";
        button.style.background = "linear-gradient(45deg, #ff007a, #ffcc00)";
        button.style.color = "#fff";
        button.style.flex = "1";
        button.style.transition = "all 0.3s ease";
        button.style.position = "relative";
        button.style.overflow = "hidden";
        button.onmouseover = () => button.style.background = "linear-gradient(45deg, #ff00cc, #ffeb3b)";
        button.onmouseout = () => button.style.background = "linear-gradient(45deg, #ff007a, #ffcc00)";

        let shine = document.createElement("span");
        shine.style.position = "absolute";
        shine.style.top = "0";
        shine.style.left = "-100%";
        shine.style.width = "100%";
        shine.style.height = "100%";
        shine.style.background = "rgba(255, 255, 255, 0.25)";
        shine.style.transform = "skewX(-20deg)";
        shine.style.transition = "left 0.5s";
        button.appendChild(shine);
        button.onmouseover = () => shine.style.left = "100%";
        button.onmouseout = () => shine.style.left = "-100%";

        let resultSpan = document.createElement("span");
        resultSpan.style.fontSize = "18px";
        resultSpan.style.fontWeight = "500";
        resultSpan.style.color = "#fff";
        resultSpan.style.textShadow = "0 0 5px rgba(0, 0, 0, 0.5)";
        resultSpan.style.minWidth = "200px";

        button.addEventListener("click", function () {
            resultSpan.textContent = "Fetching...";
            resultSpan.style.color = "#fff";
            fetch(game.url)
                .then(response => response.text())
                .then(data => {
                    if (data.includes("../thongbao/ip-block.html")) {
                        resultSpan.textContent = "Bấm từ từ thôi dmmm";
                        resultSpan.style.color = "#ff5555";
                        return;
                    }
                    let keyMatch = data.match(/key=([a-zA-Z0-9_]+)/);
                    if (keyMatch) {
                        let key = keyMatch[1];
                        resultSpan.textContent = key;
                        resultSpan.style.color = "#00ff99";

                        let copyButton = document.createElement("button");
                        copyButton.textContent = "Copy";
                        copyButton.style.marginLeft = "15px";
                        copyButton.style.padding = "8px 15px";
                        copyButton.style.background = "linear-gradient(45deg, #00ff99, #00ccff)";
                        copyButton.style.color = "#fff";
                        copyButton.style.border = "none";
                        copyButton.style.borderRadius = "6px";
                        copyButton.style.cursor = "pointer";
                        copyButton.style.fontSize = "16px";
                        copyButton.style.transition = "all 0.3s";
                        copyButton.onmouseover = () => copyButton.style.transform = "scale(1.1)";
                        copyButton.onmouseout = () => copyButton.style.transform = "scale(1)";

                        copyButton.addEventListener("click", function () {
                            navigator.clipboard.writeText(key);
                            copyButton.textContent = "Copied!";
                            setTimeout(() => copyButton.textContent = "Copy", 1000);
                        });

                        resultSpan.innerHTML = "";
                        resultSpan.appendChild(document.createTextNode(key));
                        resultSpan.appendChild(copyButton);
                    } else {
                        resultSpan.textContent = "No key found";
                        resultSpan.style.color = "#ff5555";
                    }
                })
                .catch(error => {
                    resultSpan.textContent = "Error";
                    resultSpan.style.color = "#ff5555";
                    console.error(error);
                });
        });

        wrapper.appendChild(button);
        wrapper.appendChild(resultSpan);
        container.appendChild(wrapper);
    });

    document.body.appendChild(container);
})();
