// ==UserScript==
// @name         Auto Script for HMGTeam & Layma
// @namespace    https://hmgteam.net/
// @version      1.0
// @description  Automatic
// @match        https://hmgteam.net/*
// @match        https://layma.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function createGameTable() {
        let panel = document.createElement("div");
        panel.style.position = "fixed";
        panel.style.top = "0";
        panel.style.left = "0";
        panel.style.width = "100%";
        panel.style.background = "rgba(0, 0, 0, 0.9)";
        panel.style.padding = "10px";
        panel.style.borderRadius = "0 0 8px 8px";
        panel.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.5)";
        panel.style.zIndex = "1000";
        panel.style.textAlign = "center";

        let table = document.createElement("table");
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";
        table.style.color = "white";

        let games = [
            { name: "Liên Quân", url: "https://hmgteam.net/GETKEY/index.php?api=vipadminkey&type=com.garena.game.kgvn&g-recaptcha-response=1234567890" },
            { name: "Phục Kích", url: "https://hmgteam.net/GETKEY/index.php?api=vipadminkey&type=com.vtcmobilejsc.phuckichvtc&g-recaptcha-response=1234567890" },
            { name: "LMHT: Tốc Chiến", url: "https://hmgteam.net/GETKEY/index.php?api=vipadminkey&type=com.riotgames.league.wildrift&g-recaptcha-response=1234567890" },
            { name: "Tập Kích", url: "https://hmgteam.net/GETKEY/index.php?api=vipadminkey&type=com.vtc.tapkich&g-recaptcha-response=1234567890" },
            { name: "PLAY TOGETHER VNG", url: "https://hmgteam.net/GETKEY/index.php?api=vipadminkey&type=com.vng.playtogether&g-recaptcha-response=1234567890" },
            { name: "PLAY TOGETHER GLOBAL", url: "https://hmgteam.net/GETKEY/index.php?api=vipadminkey&type=com.haegin.playtogether&g-recaptcha-response=1234567890" }
        ];

        let row = document.createElement("tr");
        games.forEach(game => {
            let cell = document.createElement("td");
            cell.style.padding = "5px";

            let button = document.createElement("button");
            button.innerText = game.name;
            button.style.padding = "10px";
            button.style.background = "#007BFF";
            button.style.color = "white";
            button.style.border = "none";
            button.style.borderRadius = "5px";
            button.style.cursor = "pointer";
            button.style.width = "150px";

            button.onmouseover = function() { button.style.background = "#0056b3"; };
            button.onmouseout = function() { button.style.background = "#007BFF"; };

            button.onclick = function() {
                button.innerText = "Đang lấy key...";
                button.disabled = true;
                fetch(game.url)
                    .then(response => response.text())
                    .then(data => {
                        button.innerText = game.name;
                        button.disabled = false;
                        window.location.href = data;
                    })
                    .catch(error => {
                        button.innerText = game.name;
                        button.disabled = false;
                        alert("Lỗi khi lấy dữ liệu: " + error);
                    });
            };

            cell.appendChild(button);
            row.appendChild(cell);
        });

        table.appendChild(row);
        panel.appendChild(table);
        document.body.appendChild(panel);
    }

    async function getCodeAndCheck(campainId, tokenId) {
        const getCodeUrl = "https://api.layma.net/api/admin/codemanager/getcode";
        const checkCodeUrl = "https://api.layma.net/api/admin/codemanager/checkcode";

        const requestData = {
            browser: "Chrome",
            browserVersion: "133.0.0.0",
            browserMajorVersion: 133,
            cookies: true,
            mobile: false,
            os: "Windows",
            osVersion: "10",
            screen: "1920 x 1080",
            referrer: "https://www.google.com/",
            trafficid: campainId,
            solution: "0"
        };

        try {
            const response = await fetch(getCodeUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData)
            });

            const data = await response.json();

            const checkData = {
                Code: data.html,
                Token: tokenId,
                CampainId: campainId,
                UserAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
                DeviceScreen: "1920 x 1080"
            };

            const checkResponse = await fetch(checkCodeUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(checkData)
            });

            window.location.href = await checkResponse.text();
        } catch (error) {
            console.error("Lỗi:", error);
        }
    }

    const currentUrl = window.location.href;

    if (currentUrl.includes("https://hmgteam.net/GETKEY/index.php?api=vipadminkey")) {
        createGameTable();
    } else if (currentUrl.startsWith("https://layma.net/")) {
        const tokenId = document.getElementById("tokenId")?.innerText || "";
        const campainId = document.getElementById("campainId")?.innerText || "";
        getCodeAndCheck(campainId, tokenId);
    }

    if (currentUrl.includes("https://hmgteam.net/GETKEY/key.html?key=")) {
        const keyCode = document.getElementById("keytool")?.innerText || "Không tìm thấy key";

        // Tạo khung bảng hiển thị Code ở giữa
        const table = document.createElement('table');
        table.style.position = 'fixed';
        table.style.top = '50%';
        table.style.left = '50%';
        table.style.transform = 'translate(-50%, -50%)';
        table.style.backgroundColor = '#fff';
        table.style.padding = '20px';
        table.style.border = '1px solid #000';
        table.style.borderRadius = '8px';
        table.style.zIndex = '1000';
        table.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

        const row = table.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 2;
        cell.style.textAlign = 'center';
        cell.style.fontSize = '20px';
        cell.textContent = `Code: ${keyCode}`;

        // Thêm bảng vào body
        document.body.appendChild(table);
    }

})();
