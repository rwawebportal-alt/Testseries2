// =========================================================
// RWA PAID TEST SERIES APP - DASHBOARD, BOOKMARKS & AUTH (app.js)
// =========================================================

const BOT_API_BASE = "https://rwaweb-hp11.onrender.com";
const API_BASE = "https://rozgarapinew.teachx.in";
const RWA_WEB_BASE = "https://rojgarwithankit.co.in";
const RWA_NEXT_BUILD_ID = "LZPzV8wzh-HG1JNeGWnqT";
const AES_KEY = CryptoJS.enc.Utf8.parse("638udh3829162018");
const WORKER_RAW_PROXY = "https://proplayer.allswbatch22.workers.dev/proxy?url=";

// 🟢 TELEGRAM UPLOAD CONFIGURATION
const TG_BOT_TOKEN = "8832643385:AAG5SZyJo7dDrvvK_dO_2pEOQK09OLeA6WM"; 
const TG_CHANNEL_ID = "-1004454849047";

// =====================================================
// PERMANENT DEVICE STORAGE ENGINE (LOCALSTORAGE + INDEXEDDB)
// =====================================================
const IDB_NAME = "RWA_TestSeries_Permanent_DB";
const IDB_STORE = "app_kv_store";

function requestPersistentStorage() {
    if (navigator.storage && navigator.storage.persist) {
        navigator.storage.persist().catch(() => {});
    }
}

function openPermanentIDB() {
    return new Promise((resolve, reject) => {
        if (!window.indexedDB) return reject("No IDB");
        const req = indexedDB.open(IDB_NAME, 1);
        req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(IDB_STORE)) {
                db.createObjectStore(IDB_STORE);
            }
        };
        req.onsuccess = (e) => resolve(e.target.result);
        req.onerror = (e) => reject(e);
    });
}

async function idbSetItem(key, val) {
    try {
        const db = await openPermanentIDB();
        const tx = db.transaction(IDB_STORE, "readwrite");
        tx.objectStore(IDB_STORE).put(val, key);
    } catch {}
}

async function idbGetItem(key) {
    try {
        const db = await openPermanentIDB();
        return await new Promise((resolve) => {
            const tx = db.transaction(IDB_STORE, "readonly");
            const req = tx.objectStore(IDB_STORE).get(key);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => resolve(null);
        });
    } catch {
        return null;
    }
}

async function restoreFromPermanentIDB() {
    requestPersistentStorage();
    try {
        const idbAttempts = await idbGetItem("rwa_attempted_tests_v1");
        if (idbAttempts && typeof idbAttempts === "object") {
            ATTEMPTED_TESTS = { ...idbAttempts, ...ATTEMPTED_TESTS };
            localStorage.setItem("rwa_attempted_tests_v1", JSON.stringify(ATTEMPTED_TESTS));
        } else if (Object.keys(ATTEMPTED_TESTS).length > 0) {
            idbSetItem("rwa_attempted_tests_v1", ATTEMPTED_TESTS);
        }

        const idbBookmarks = await idbGetItem("rwa_bookmarked_questions_v1");
        if (Array.isArray(idbBookmarks) && idbBookmarks.length > 0 && BOOKMARKED_QUESTIONS.length === 0) {
            BOOKMARKED_QUESTIONS = idbBookmarks;
            localStorage.setItem("rwa_bookmarked_questions_v1", JSON.stringify(BOOKMARKED_QUESTIONS));
        } else if (BOOKMARKED_QUESTIONS.length > 0) {
            idbSetItem("rwa_bookmarked_questions_v1", BOOKMARKED_QUESTIONS);
        }

        const idbTokens = await idbGetItem("rwa_user_tokens_v2");
        if (Array.isArray(idbTokens) && idbTokens.length > 0 && USER_TOKENS.length === 0) {
            USER_TOKENS = idbTokens.filter(t => t && t.token && !t.isAdmin);
            localStorage.setItem("rwa_user_tokens_v2", JSON.stringify(USER_TOKENS));
        }

        const idbProfile = await idbGetItem("rwa_user_profile_v2");
        if (idbProfile && !USER_PROFILE) {
            USER_PROFILE = idbProfile;
            localStorage.setItem("rwa_user_profile_v2", JSON.stringify(USER_PROFILE));
        }

        updateTokenBadge();
        window.updateDashboardUI();
    } catch {}
}

// =====================================================
// TELEGRAM UPLOAD ENGINE (FOR TEST PDF)
// =====================================================
window.sendToTelegramChannel = async function(blob, fileType, title) {
    if (!TG_BOT_TOKEN || TG_BOT_TOKEN === "YOUR_BOT_TOKEN_HERE") return false;
    
    const caption = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
       🏆 𝐑𝐖𝐀 𝐓𝐄𝐒𝐓 𝐒𝐄𝐑𝐈𝐄𝐒 𝐋𝐈𝐁𝐑𝐀𝐑𝐘
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

📁 Type            : ${fileType}
🎬 Title             : ${title}
🏆 Series Name : ${state.activeSeriesTitle || "Paid Test Series"}
📚 Folder Name : ${state.activeTsSubName || "Mock Test"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐑𝐖𝐀
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`;

    const formData = new FormData();
    formData.append("chat_id", TG_CHANNEL_ID);
    formData.append("caption", caption);
    formData.append("document", blob, `${title}.pdf`);

    try {
        const res = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendDocument`, {
            method: "POST",
            body: formData
        });
        const json = await res.json();
        return Boolean(json.ok);
    } catch {
        return false;
    }
};

window.downloadAndUploadPDF = async function(pdfUrl, title) {
    try {
        alert("PDF Download & Telegram Upload Started...");
        const res = await fetch(pdfUrl);
        const blob = await res.blob();
        
        const a = document.createElement("a");
        const objUrl = URL.createObjectURL(blob);
        a.href = objUrl;
        a.download = `${title}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(objUrl);

        const success = await window.sendToTelegramChannel(blob, "PDF", title);
        if (success) alert("✅ PDF Uploaded to Telegram Channel!");
    } catch (e) {
        alert("Error downloading PDF: " + e.message);
    }
};

// =====================================================
// JWT DECODER & LOCAL STORAGE (TOKENS, ATTEMPTS, BOOKMARKS)
// =====================================================
function extractUidFromJwt(jwtStr) {
    if (!jwtStr || typeof jwtStr !== "string") return "";
    try {
        const parts = jwtStr.trim().split(".");
        if (parts.length < 2) return "";
        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(atob(base64).split("").map(c => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(""));
        const payload = JSON.parse(jsonPayload);
        return String(payload.id || payload.userid || payload.user_id || "");
    } catch {
        return "";
    }
}

function getUserSavedTokens() {
    try {
        const raw = localStorage.getItem("rwa_user_tokens_v2");
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                return parsed.filter(t => t && t.token && !t.isAdmin);
            }
        }
    } catch {}
    return [];
}

function getSavedUserProfile() {
    try {
        const raw = localStorage.getItem("rwa_user_profile_v2");
        if (raw) return JSON.parse(raw);
    } catch {}
    return null;
}

function getSavedAttemptsMap() {
    try {
        const raw = localStorage.getItem("rwa_attempted_tests_v1");
        if (raw) return JSON.parse(raw) || {};
    } catch {}
    return {};
}

function getSavedBookmarksList() {
    try {
        const raw = localStorage.getItem("rwa_bookmarked_questions_v1");
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) return parsed;
        }
    } catch {}
    return [];
}

let USER_TOKENS = getUserSavedTokens();
let USER_PROFILE = getSavedUserProfile();
let ATTEMPTED_TESTS = getSavedAttemptsMap();
let BOOKMARKED_QUESTIONS = getSavedBookmarksList();
let activeBookmarkDetailIdx = 0;

function isUserLoggedIn() {
    return USER_TOKENS.length > 0 && Boolean(USER_TOKENS[0].token);
}

function updateTokenBadge() {
    const b = document.getElementById("tokCountBadge");
    if (b) b.textContent = USER_TOKENS.length;
    checkAuthUIState();
}

function checkAuthUIState() {
    const userNameText = document.getElementById("navUserNameText");
    const avatarEl = document.getElementById("navProfileAvatar");

    if (isUserLoggedIn()) {
        const name = (USER_PROFILE && USER_PROFILE.name) ? USER_PROFILE.name : "My Profile";
        if (userNameText) userNameText.textContent = name;
        if (avatarEl) avatarEl.textContent = name.charAt(0).toUpperCase();
    } else {
        if (userNameText) userNameText.textContent = "Profile / Login";
        if (avatarEl) avatarEl.textContent = "👤";
    }
}

// =====================================================
// DASHBOARD & PROGRESS ENGINE
// =====================================================
window.updateDashboardUI = function() {
    const totalSeries = state.totalSeriesCount || 0;
    const attemptedIds = Object.keys(ATTEMPTED_TESTS);
    const attemptedCount = attemptedIds.length;
    const totalTests = Math.max(state.totalTestsCount || 0, attemptedCount, Object.keys(state.knownTestIds || {}).length);
    const remainingCount = Math.max(0, totalTests - attemptedCount);

    const elSeries = document.getElementById("dashTotalSeries");
    const elTests = document.getElementById("dashTotalTests");
    const elAttempted = document.getElementById("dashAttemptedTests");
    const elRemaining = document.getElementById("dashRemainingTests");

    if (elSeries) elSeries.textContent = totalSeries;
    if (elTests) elTests.textContent = totalTests;
    if (elAttempted) elAttempted.textContent = attemptedCount;
    if (elRemaining) elRemaining.textContent = remainingCount;

    const pct = totalTests > 0 ? Math.min(100, Math.round((attemptedCount / totalTests) * 100)) : 0;
    const pctBadge = document.getElementById("dashProgressPercent");
    const pctBar = document.getElementById("dashProgressBar");
    const pctSub = document.getElementById("dashProgressSubtext");

    if (pctBadge) pctBadge.textContent = `${pct}% Completed`;
    if (pctBar) pctBar.style.width = `${pct}%`;
    if (pctSub) {
        pctSub.textContent = `Aapne kul ${totalTests} tests mein se ${attemptedCount} attempt kar liye hain (${remainingCount} bache hain).`;
    }

    const bmBadge = document.getElementById("bookmarkCountBadge");
    if (bmBadge) bmBadge.textContent = BOOKMARKED_QUESTIONS.length;

    renderRecentAttemptsList();
};

window.recordUserTestAttempt = function(testId, attemptInfo) {
    if (!testId) return;
    const tid = String(testId).trim();
    ATTEMPTED_TESTS[tid] = {
        testId: tid,
        testKey: attemptInfo.testKey || `test_${tid}`,
        title: attemptInfo.title || `Test #${tid}`,
        seriesId: attemptInfo.seriesId || state.activeSeriesId || "",
        seriesTitle: attemptInfo.seriesTitle || state.activeSeriesTitle || "Paid Test Series",
        score: attemptInfo.score ?? 0,
        maxMarks: attemptInfo.maxMarks ?? 100,
        correct: attemptInfo.correct ?? 0,
        incorrect: attemptInfo.incorrect ?? 0,
        unattempted: attemptInfo.unattempted ?? 0,
        accuracy: attemptInfo.accuracy ?? 0,
        timeCorr: attemptInfo.timeCorr ?? 0,
        timeInc: attemptInfo.timeInc ?? 0,
        timeUna: attemptInfo.timeUna ?? 0,
        testMeta: attemptInfo.testMeta || state.testMap[`test_${tid}`] || null,
        responses: attemptInfo.responses || {},
        selectedOptionalByGroup: attemptInfo.selectedOptionalByGroup || {},
        activeSectionsSnapshot: attemptInfo.activeSectionsSnapshot || null,
        questionsSnapshot: attemptInfo.questionsSnapshot || null,
        date: new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })
    };

    try {
        localStorage.setItem("rwa_attempted_tests_v1", JSON.stringify(ATTEMPTED_TESTS));
    } catch {
        const slimCopy = { ...ATTEMPTED_TESTS };
        if (slimCopy[tid]) {
            slimCopy[tid] = { ...slimCopy[tid], questionsSnapshot: null, activeSectionsSnapshot: null };
        }
        try { localStorage.setItem("rwa_attempted_tests_v1", JSON.stringify(slimCopy)); } catch {}
    }
    idbSetItem("rwa_attempted_tests_v1", ATTEMPTED_TESTS);
    window.updateDashboardUI();
};

window.getSavedAttemptByTestId = function(testId) {
    return ATTEMPTED_TESTS[String(testId).trim()] || null;
};

function renderRecentAttemptsList() {
    const container = document.getElementById("recentAttemptsList");
    if (!container) return;

    const entries = Object.values(ATTEMPTED_TESTS).reverse();
    if (entries.length === 0) {
        container.innerHTML = `<div class="p-6 text-center text-xs font-bold text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">Abhi tak aapne koi test attempt nahi kiya hai. Test submit karte hi aapka score yahan dikhega.</div>`;
        return;
    }

    container.innerHTML = entries.map(item => `
        <div onclick="openSavedTestScorecard('${item.testId}', '${item.testKey || `test_${item.testId}`}')" class="bg-slate-50 hover:bg-sky-50/80 border-2 border-sky-200 hover:border-indigo-400 rounded-2xl p-4 flex flex-wrap justify-between items-center gap-3 cursor-pointer transition-all shadow-sm">
            <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2 flex-wrap">
                    <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">✅ ATTEMPTED</span>
                    <span class="text-[11px] font-bold text-slate-500">🕒 ${item.date || ""}</span>
                </div>
                <h4 class="font-black text-sm sm:text-base text-slate-900 mt-1">${item.title}</h4>
                <p class="text-xs font-bold text-indigo-600 mt-0.5">${item.seriesTitle}</p>
                <div class="inline-flex items-center gap-1.5 mt-2 text-[11px] font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                    📊 Click to View Full Scorecard & Solutions ➔
                </div>
            </div>
            <div class="flex items-center gap-3">
                <div class="text-right bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
                    <div class="text-[10px] font-extrabold text-slate-500 uppercase">Score</div>
                    <div class="text-sm font-black text-indigo-700">${item.score} / ${item.maxMarks}</div>
                    <div class="text-[10px] font-bold text-emerald-600">🎯 ${item.accuracy}% Acc</div>
                </div>
            </div>
        </div>
    `).join("");
}

window.openSavedTestScorecard = async function(testId, tKey) {
    const tid = String(testId).trim();
    const record = ATTEMPTED_TESTS[tid];
    if (!record) {
        alert("Is test ka scorecard data nahi mila.");
        return;
    }
    if (typeof window.openSavedTcsScorecard === "function") {
        await window.openSavedTcsScorecard(tid, tKey || `test_${tid}`, record);
    }
};

window.clearAttemptHistory = function() {
    if (confirm("Kya aap apni Attempted Tests history reset karna chahte hain?")) {
        ATTEMPTED_TESTS = {};
        localStorage.removeItem("rwa_attempted_tests_v1");
        idbSetItem("rwa_attempted_tests_v1", {});
        window.updateDashboardUI();
        if (state.view === "ts_tests" && state.activeSeriesId) {
            openTestSeriesTitles(state.activeSeriesId, state.activeTsSubId || "-1", state.activeTsSubName || state.activeSeriesTitle);
        }
    }
};

// =====================================================
// BOOKMARKS ENGINE
// =====================================================
window.isQuestionBookmarked = function(qKey) {
    return BOOKMARKED_QUESTIONS.some(b => String(b.qKey) === String(qKey));
};

window.toggleBookmarkItem = function(itemObj) {
    if (!itemObj || !itemObj.qKey) return false;
    const existsIdx = BOOKMARKED_QUESTIONS.findIndex(b => String(b.qKey) === String(itemObj.qKey));
    let isNowSaved = false;

    if (existsIdx >= 0) {
        BOOKMARKED_QUESTIONS.splice(existsIdx, 1);
        isNowSaved = false;
    } else {
        BOOKMARKED_QUESTIONS.unshift({
            ...itemObj,
            savedAt: new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })
        });
        isNowSaved = true;
    }

    localStorage.setItem("rwa_bookmarked_questions_v1", JSON.stringify(BOOKMARKED_QUESTIONS));
    idbSetItem("rwa_bookmarked_questions_v1", BOOKMARKED_QUESTIONS);
    window.updateDashboardUI();
    renderBookmarksTab();
    return isNowSaved;
};

window.removeBookmarkByKey = function(qKey, fromDetailView = false) {
    BOOKMARKED_QUESTIONS = BOOKMARKED_QUESTIONS.filter(b => String(b.qKey) !== String(qKey));
    localStorage.setItem("rwa_bookmarked_questions_v1", JSON.stringify(BOOKMARKED_QUESTIONS));
    idbSetItem("rwa_bookmarked_questions_v1", BOOKMARKED_QUESTIONS);
    window.updateDashboardUI();

    if (fromDetailView) {
        if (BOOKMARKED_QUESTIONS.length === 0) {
            closeBookmarkDetailView();
        } else {
            if (activeBookmarkDetailIdx >= BOOKMARKED_QUESTIONS.length) {
                activeBookmarkDetailIdx = BOOKMARKED_QUESTIONS.length - 1;
            }
            openBookmarkDetailView(activeBookmarkDetailIdx);
        }
    } else {
        renderBookmarksTab();
    }
};

window.clearAllBookmarks = function() {
    if (BOOKMARKED_QUESTIONS.length === 0) return;
    if (confirm("Kya aap sabhi Bookmarked Questions delete karna chahte hain?")) {
        BOOKMARKED_QUESTIONS = [];
        localStorage.removeItem("rwa_bookmarked_questions_v1");
