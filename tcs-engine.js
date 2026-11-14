// =========================================================
// RWA SKY PORTAL - EXACT TCS CBT MOCK TEST ENGINE (tcs-engine.js)
// DYNAMICALLY EXTRACTS LOGGED-IN USER DETAILS & COOKIES FROM WEBSITE
// =========================================================

let NEXT_BUILD_ID = localStorage.getItem("rwa_next_build_id") || "TDvVxPHlB8LGPavKJeaEV";
const RWA_TERMS_WORKER = "https://test.src22420.workers.dev/?url=";

(function injectExactTcsStyles() {
    if (document.getElementById("tcs-exact-fix-styles")) return;
    const st = document.createElement("style");
    st.id = "tcs-exact-fix-styles";
    st.innerHTML = `
        #slideTestAttempt, #slideTestAttempt.active-slide { animation: none !important; transform: none !important; padding: 0 !important; margin: 0 !important; }
        .tcs-fullscreen-shell { position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; width: 100vw !important; height: 100vh !important; height: 100dvh !important; background: #555555; z-index: 99999 !important; overflow: hidden; }
        
        /* START SCREEN */
        #start-screen { background: #555555 !important; display: flex; align-items: center; justify-content: center; padding: 14px !important; overflow-y: auto; }
        #start-screen .start-card { background: #ffffff !important; width: 100% !important; max-width: 460px !important; border-radius: 22px !important; padding: 22px 20px !important; max-height: 94vh !important; overflow-y: auto !important; box-shadow: 0 15px 35px rgba(0,0,0,0.45) !important; position: relative !important; }
        .tcs-sec-heading { font-size: 15px; font-weight: 800; color: #1a237e; margin: 10px 0 12px 0; padding-bottom: 8px; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 6px; }
        #subjects-selection-container { display: flex !important; flex-direction: column !important; gap: 10px !important; position: relative !important; width: 100% !important; margin-bottom: 14px !important; }
        .tcs-sub-row { position: relative !important; width: 100% !important; display: flex !important; justify-content: space-between !important; align-items: center !important; padding: 13px 15px !important; border-radius: 11px !important; font-size: 14px !important; transition: all 0.18s ease !important; margin: 0 !important; }
        .tcs-sub-row.fixed-sub { background: #f0f4f8 !important; border: 1px solid #d9e2ec !important; border-left: 4px solid #1a237e !important; }
        .tcs-sub-row.opt-sub { background: #ffffff !important; border: 1px solid #ffcc80 !important; border-left: 4px solid #ff9800 !important; cursor: pointer !important; }
        .tcs-sub-row.opt-sub.selected { background: #e8f5e9 !important; border: 1.5px solid #4caf50 !important; border-left: 4px solid #4caf50 !important; }
        .tcs-sub-left { display: flex !important; align-items: center !important; gap: 9px !important; font-weight: 700 !important; color: #102a43 !important; text-align: left !important; line-height: 1.35 !important; padding-right: 8px !important; }
        .tcs-sub-pill { background: #d9e2ec !important; color: #334e68 !important; font-size: 12px !important; font-weight: 800 !important; padding: 4px 11px !important; border-radius: 14px !important; white-space: nowrap !important; flex-shrink: 0 !important; }
        .tcs-sub-row.opt-sub.selected .tcs-sub-pill { background: #c8e6c9 !important; color: #2e7d32 !important; }
        .tcs-opt-heading { font-size: 13.5px !important; font-weight: 800 !important; color: #e65100 !important; margin: 8px 0 2px 0 !important; display: flex !important; align-items: center !important; gap: 6px !important; }
        #start-screen .stats-box { position: relative !important; width: 100% !important; background: #f8f9fa !important; padding: 15px 16px !important; border-radius: 12px !important; border: 1px solid #e9ecef !important; margin-top: 14px !important; clear: both !important; }
        #start-screen .start-btn { background: #1c1c1e !important; color: #ffffff !important; border-radius: 10px !important; padding: 15px !important; font-size: 16px !important; font-weight: 800 !important; margin-top: 16px !important; width: 100% !important; border: none !important; cursor: pointer !important; }
        
        /* LIVE TEST SCREEN */
        #live-test-screen .tcs-q-badge { background: #757575 !important; color: #ffffff !important; width: 26px !important; height: 26px !important; border-radius: 50% !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; font-weight: 800 !important; font-size: 12px !important; margin-right: 8px !important; }
        #live-test-screen .tcs-m-pos { background: transparent !important; color: #2e7d32 !important; font-weight: 800 !important; font-size: 13px !important; padding: 0 2px !important; }
        #live-test-screen .tcs-m-neg { background: transparent !important; color: #d32f2f !important; font-weight: 800 !important; font-size: 13px !important; padding: 0 2px !important; }
        #live-test-screen .tcs-option { border: 1px solid #eeeeee !important; border-radius: 10px !important; padding: 14px 16px !important; margin-bottom: 12px !important; font-size: 15px !important; display: flex !important; align-items: flex-start !important; cursor: pointer !important; background: #ffffff !important; box-shadow: 0 2px 6px rgba(0,0,0,0.04) !important; transition: all 0.15s ease !important; }
        #live-test-screen .tcs-option.selected { border: 1.5px solid #1a237e !important; background: #e8eaf6 !important; }
        #live-test-screen .tcs-opt-letter { font-weight: 800 !important; color: #222222 !important; margin-right: 12px !important; min-width: 20px !important; flex-shrink: 0 !important; }
        #live-test-screen .tcs-option.selected .tcs-opt-letter { color: #1a237e !important; }
    `;
    document.head.appendChild(st);
})();

let tcsState = {
    activeTestKey: null, testMeta: null, rawAllQuestions: [], allParsedSections: [],      
    selectedOptionalByGroup: {}, activeSections: [], questions: [],              
    currentQIdx: 0, responses: {}, activeSectionIndex: 0, timerInterval: null,
    secondsLeft: 0, isSectionalTiming: false, sectionTimeAllocated: [],
    sectionSecondsLeft: [], isSubmitted: false, lang: "en", activeSolFilter: "all", activeFullSolIdx: 0
};

const RWA_KNOWN_SECTION_IDS = {
    "206": "General Awareness", "207": "Quantitative Aptitude", "208": "General Intelligence and Reasoning",
    "209": "English Language", "210": "English", "211": "Computer Knowledge", "212": "English", "213": "Hindi",
    "214": "Sanskrit", "215": "Basic Law/Constitution/General Knowledge", "216": "Child Development & Pedagogy",
    "217": "Environmental Studies (EVS)", "218": "Mathematics", "219": "Social Studies", "220": "Science",
    "222": "Numerical & Mental Ability Test", "223": "Mental Aptitude/Intelligence/Reasoning", "234": "Chemistry"
};

function cleanQuestionHtml(rawHtml) {
    if (!rawHtml) return "";
    return String(rawHtml).replace(/font-size:\s*\d+(\.\d+)?(pt|px)/gi, "").replace(/<p>\s*(&nbsp;|\s)*\s*<\/p>/gi, "");
}

function detectSmartSubjectName(secId, questionsList, rawLabel) {
    const cleanRaw = String(rawLabel || "").trim();
    if (cleanRaw && !/^section\s*\d+$/i.test(cleanRaw) && !/^part\s*[a-z0-9]+$/i.test(cleanRaw) && !/^\d+$/.test(cleanRaw) && cleanRaw.toLowerCase() !== "general" && cleanRaw.toLowerCase() !== "uncategorized") {
        return cleanRaw;
    }
    const idStr = String(secId || "").trim();
    if (RWA_KNOWN_SECTION_IDS[idStr]) return RWA_KNOWN_SECTION_IDS[idStr];
    return `Section ${idStr}`;
}

// =========================================================
// 🚀 DYNAMIC USER AUTH & COOKIE EXTRACTOR FROM WEBSITE
// =========================================================
function getLoggedInUserAuthDetails() {
    // 1. Check active token from testMeta, window.state, window.USER_TOKENS, or localStorage
    let tokObj = (tcsState.testMeta && tcsState.testMeta.tokenObj) ||
                 (window.state && window.state.activeTokenObj) ||
                 (Array.isArray(window.USER_TOKENS) && window.USER_TOKENS[0]) ||
                 null;

    if (!tokObj) {
        try {
            const saved = JSON.parse(localStorage.getItem("rwa_user_tokens_v2") || "[]");
            if (Array.isArray(saved) && saved.length > 0) tokObj = saved[0];
        } catch {}
    }

    let profileObj = window.USER_PROFILE || null;
    if (!profileObj) {
        try {
            profileObj = JSON.parse(localStorage.getItem("rwa_user_profile_v2") || "null");
        } catch {}
    }

    const token = (tokObj && tokObj.token) ? String(tokObj.token).replace(/^Bearer\s+/i, "").trim() : "";

    // Extract User-ID from profile, token object, or JWT payload
    let userId = String(
        (profileObj && (profileObj.userid || profileObj.id)) ||
        (tokObj && tokObj.userId) ||
        (typeof extractUidFromJwt === "function" ? extractUidFromJwt(token) : "") ||
        ""
    ).trim();

    // Base API URL from website config (app.js API_BASE)
    const rawBaseUrl = (typeof API_BASE !== "undefined" && API_BASE) ? API_BASE : "https://rozgarapinew.teachx.in";
    const normalizedBaseUrl = rawBaseUrl.endsWith("/") ? rawBaseUrl : `${rawBaseUrl}/`;

    // Build dynamic Cookie string using the logged-in user's live credentials + any browser cookies
    const cookieParts = [
        `base_url=${encodeURIComponent(normalizedBaseUrl)}`,
        `Authorization=${token}`,
        `User-ID=${userId}`
    ];

    if (document.cookie && document.cookie.trim()) {
        document.cookie.split(";").forEach(pair => {
            const trimmed = pair.trim();
            if (trimmed && !/^(base_url|Authorization|User-ID)=/i.test(trimmed)) {
                cookieParts.push(trimmed);
            }
        });
    }

    return {
        token,
        userId,
        baseUrl: normalizedBaseUrl,
        cookieString: cookieParts.join("; ")
    };
}

// =========================================================
// 🚀 DEDICATED WORKER CALLER (test.src22420.workers.dev)
// =========================================================
async function fetchOnlyRwaTermsViaDedicatedWorker(targetUrl) {
    try {
        const userAuth = getLoggedInUserAuthDetails();
        if (!userAuth.token) return null;

        const workerUrl =
            `${RWA_TERMS_WORKER}${encodeURIComponent(targetUrl)}` +
            `&cookie=${encodeURIComponent(userAuth.cookieString)}` +
            `&token=${encodeURIComponent(userAuth.token)}` +
            `&uid=${encodeURIComponent(userAuth.userId)}` +
            `&base_url=${encodeURIComponent(userAuth.baseUrl)}`;

        const res = await fetch(workerUrl);
        if (!res.ok) return null;
        const json = await res.json();

        // Save updated buildId if returned by worker's __NEXT_DATA__ fallback
        if (json && json.buildId && json.buildId !== NEXT_BUILD_ID) {
            NEXT_BUILD_ID = json.buildId;
            localStorage.setItem("rwa_next_build_id", NEXT_BUILD_ID);
        }

        return json;
    } catch {
        return null;
    }
}

async function fetchRwaNextTermsData(tsId, testId) {
    if (!tsId || !testId) return null;

    const termsUrl = `https://rojgarwithankit.co.in/_next/data/${NEXT_BUILD_ID}/test-series/${tsId}/test-ssc/${testId}/terms.json?id=${tsId}&testId=${testId}`;
    const data = await fetchOnlyRwaTermsViaDedicatedWorker(termsUrl);
    if (data && data.pageProps && data.pageProps.test) {
        return data;
    }
    return null;
}

// =========================================================
// 🚀 FETCH A-TO-Z DETAILS & QUESTIONS
// =========================================================
async function fetchQuestionsAndSectionsForMeta(t) {
    let exactTestMeta = null;
    let loadedQuestions = [];
    let externalSecMap = {};

    const tsId = t.seriesId || t.test_series_id || (window.state && window.state.activeSeriesId) || "";
    const testId = t.id;

    const rawJsonData = await fetchRwaNextTermsData(tsId, testId);

    if (rawJsonData && rawJsonData.pageProps && rawJsonData.pageProps.test) {
        exactTestMeta = rawJsonData.pageProps.test;

        if (Array.isArray(exactTestMeta.test_sections)) {
            exactTestMeta.test_sections.forEach((sec, idx) => {
                const sidPrimary = String(sec.section_id || sec.id || sec.subjectid || (idx + 1)).trim();
                const sidSecondary = String(sec.id || sec.section_id || (idx + 1)).trim();
                const secTitle = String(sec.section_title || sec.section_name || sec.title || `Section ${sidPrimary}`).trim();

                const secInfo = {
                    name: secTitle,
                    isOptional: String(sec.is_optional || "0") === "1",
                    optGroup: sec.optional_group || "A",
                    orderIndex: idx
                };

                externalSecMap[sidPrimary] = secInfo;
                externalSecMap[sidSecondary] = secInfo;

                if (Array.isArray(sec.questions) && sec.questions.length > 0) {
                    sec.questions.forEach(q => {
                        loadedQuestions.push({ ...q, section_id: sidPrimary, section_name: secTitle });
                    });
                }
            });
        }
    }

    // Fetch Questions JSON (Direct CDN or existing WORKER_RAW_PROXY)
    const qUrlToFetch = (exactTestMeta && exactTestMeta.test_questions_url)
        ? exactTestMeta.test_questions_url
        : (t.test_questions_url || t.questions_url);

    if (loadedQuestions.length === 0 && qUrlToFetch) {
        const rawQUrl = String(qUrlToFetch).replace(/\\\//g, "/").trim();
        let qJson = null;

        try {
            const directRes = await fetch(rawQUrl);
            if (directRes.ok) qJson = await directRes.json();
        } catch {}

        if (!qJson && window.WORKER_RAW_PROXY) {
            try {
                const proxyRes = await fetch(window.WORKER_RAW_PROXY + encodeURIComponent(rawQUrl));
                if (proxyRes.ok) qJson = await proxyRes.json();
            } catch {}
        }

        if (qJson) {
            loadedQuestions = Array.isArray(qJson) ? qJson : (qJson.data || qJson.questions || []);
        }
    }

    if (!loadedQuestions || loadedQuestions.length === 0) {
        loadedQuestions = window.DB?.fallbackCbtQuestions || [];
    }

    return { loadedQuestions, externalSecMap, exactTestMeta };
}

window.launchTcsCbtEngine = async function(tKey) {
    const t = window.state.testMap[tKey];
    if (!t) return;

    tcsState.activeTestKey = tKey;
    tcsState.testMeta = t;
    tcsState.isSubmitted = false;
    tcsState.responses = {};
    tcsState.currentQIdx = 0;
    tcsState.activeSectionIndex = 0;
    tcsState.selectedOptionalByGroup = {};

    window.showSlide("slideTestAttempt");

    document.getElementById("start-screen").classList.remove("tcs-hidden");
    document.getElementById("live-test-screen").classList.add("tcs-hidden");
    document.getElementById("submit-screen").classList.add("tcs-hidden");
    document.getElementById("analysis-screen").classList.add("tcs-hidden");
    document.getElementById("solutions-screen").classList.add("tcs-hidden");
    document.getElementById("full-sol-screen").classList.add("tcs-hidden");

    document.getElementById("tcs-start-title").textContent = t.title || "(TCS Pattern) Mock Test";
    document.getElementById("subjects-selection-container").innerHTML = `<div style="text-align:center; padding:18px; font-weight:700; color:#475569;">🔄 Extracting Test Blueprint & Authentic Data...</div>`;

    const { loadedQuestions, externalSecMap, exactTestMeta } = await fetchQuestionsAndSectionsForMeta(t);
    tcsState.rawAllQuestions = loadedQuestions;

    if (!loadedQuestions || loadedQuestions.length === 0) {
        document.getElementById("subjects-selection-container").innerHTML = `<div style="text-align:center; padding:18px; font-weight:700; color:#e53935;">⚠️ Test data load nahi ho paya. URL ya Server Error.</div>`;
        return;
    }

    if (exactTestMeta) {
        tcsState.testMeta.title = exactTestMeta.title || tcsState.testMeta.title;
        tcsState.testMeta.time = exactTestMeta.time || tcsState.testMeta.time;
        tcsState.testMeta.marks = exactTestMeta.marks || tcsState.testMeta.marks;
        tcsState.testMeta.questions = exactTestMeta.questions || tcsState.testMeta.questions;
        tcsState.testMeta.restrict_part_switching = exactTestMeta.restrict_part_switching ?? tcsState.testMeta.restrict_part_switching;
        tcsState.testMeta.show_sectionselector = exactTestMeta.show_sectionselector ?? tcsState.testMeta.show_sectionselector;
        document.getElementById("tcs-start-title").textContent = tcsState.testMeta.title || "(TCS Pattern) Mock Test";
    }

    prepareAllSectionsAndRenderStart(externalSecMap, true);
};

function prepareAllSectionsAndRenderStart(externalSecMap = {}, shouldRenderUI = true) {
    const groupMap = new Map();
    tcsState.rawAllQuestions.forEach((q, idx) => {
        const secId = String(q.section_id || q.part_id || q.subject_id || "1").trim();
        if (!groupMap.has(secId)) {
            groupMap.set(secId, {
                secId: secId,
                rawLabel: q.section_name || q.subject_name || q.part_title || q.subject || `Section ${secId}`,
                isExplicitOptional: String(q.is_optional || q.optional || "0") === "1",
                questions: []
            });
        }
        groupMap.get(secId).questions.push({ ...q, rawIndex: idx });
    });

    const parsedSections = [];
    groupMap.forEach((secObj, secId) => {
        const ext = externalSecMap[secId];
        const hasValidExtName = ext && ext.name && !/^section\s*\d+$/i.test(ext.name.trim());
        const finalName = hasValidExtName ? ext.name : detectSmartSubjectName(secId, secObj.questions, secObj.rawLabel);

        parsedSections.push({
            secId: secId,
            name: finalName,
            questions: secObj.questions,
            isOptional: ext ? Boolean(ext.isOptional) : Boolean(secObj.isExplicitOptional),
            optGroup: (ext && ext.optGroup) ? ext.optGroup : "A",
            orderIndex: (ext && typeof ext.orderIndex === "number") ? ext.orderIndex : 999
        });
    });

    parsedSections.sort((a, b) => a.orderIndex - b.orderIndex);

    const fixedSecs = parsedSections.filter(s => !s.isOptional);
    const optionalSecs = parsedSections.filter(s => s.isOptional);

    tcsState.allParsedSections = [...fixedSecs, ...optionalSecs];
    if (optionalSecs.length > 0 && !tcsState.selectedOptionalByGroup["A"]) {
        tcsState.selectedOptionalByGroup["A"] = optionalSecs[0].secId;
    }

    if (shouldRenderUI) renderStartScreenUI();
}

function renderStartScreenUI() {
    const t = tcsState.testMeta || {};
    const container = document.getElementById("subjects-selection-container");
    const fixedSecs = tcsState.allParsedSections.filter(s => !s.isOptional);
    const optionalSecs = tcsState.allParsedSections.filter(s => s.isOptional);

    let html = `<div class="tcs-sec-heading">📚 Subjects in this Test:</div>`;
    fixedSecs.forEach(sec => {
        html += `<div class="tcs-sub-row fixed-sub"><div class="tcs-sub-left"><span style="font-size:16px;">✅</span><span>${sec.name}</span></div><span class="tcs-sub-pill">${sec.questions.length} Qs</span></div>`;
    });

    if (optionalSecs.length > 0) {
        const chosenSecId = tcsState.selectedOptionalByGroup["A"];
        html += `<div class="tcs-opt-heading">📝 Select Any One Optional Subject (A):</div>`;
        optionalSecs.forEach(sec => {
            const isSel = String(sec.secId) === String(chosenSecId);
            html += `<div class="tcs-sub-row opt-sub ${isSel ? "selected" : ""}" onclick="selectOptionalSubject('A', '${sec.secId}')"><div class="tcs-sub-left">${isSel ? `<span style="color:#2e7d32; font-weight:900; font-size:16px;">✓</span>` : ""}<span>${sec.name}</span></div><span class="tcs-sub-pill">${sec.questions.length} Qs</span></div>`;
        });
    }
    container.innerHTML = html;

    const activeSecs = getActiveChosenSections();
    let totalActiveQs = 0, totalActiveMarks = 0;
    activeSecs.forEach(sec => {
        totalActiveQs += sec.questions.length;
        sec.questions.forEach(q => { totalActiveMarks += parseFloat(q.positive_marks || 2.0); });
    });

    if (t.marks && !isNaN(parseFloat(t.marks))) totalActiveMarks = parseFloat(t.marks);

    const rawTimeStr = String(t.time || "60").trim();
    let totalMins = 60, timingMode = "Overall Timing";
    if (rawTimeStr.includes("+")) {
        totalMins = rawTimeStr.split("+").reduce((acc, v) => acc + (parseInt(v.trim()) || 0), 0);
        timingMode = "Sectional Timing";
    } else {
        totalMins = parseInt(rawTimeStr) || 60;
    }

    const statsBox = document.querySelector("#start-screen .stats-box");
    if (statsBox) {
        statsBox.innerHTML = `
            <div class="start-info"><span>Total Questions:</span> <span id="stat-qs">${totalActiveQs}</span></div>
            <div class="start-info"><span>Total Time:</span> <span id="stat-time">${totalMins} mins</span></div>
            <div class="start-info"><span>Timing Mode:</span> <span id="stat-mode" style="color:#e65100;">${timingMode}</span></div>
            <div class="start-info"><span>Maximum Marks:</span> <span id="stat-marks">${Math.round(totalActiveMarks)}</span></div>
        `;
    }
    document.getElementById("tcs-start-btn").textContent = "Start Test ➔";
}

window.selectOptionalSubject = function(groupKey, secId) {
    tcsState.selectedOptionalByGroup[groupKey] = String(secId);
    renderStartScreenUI();
};

function getActiveChosenSections() {
    const chosenOptId = tcsState.selectedOptionalByGroup["A"];
    return tcsState.allParsedSections.filter(sec => {
        if (!sec.isOptional) return true;
        return String(sec.secId) === String(chosenOptId);
    });
}

function populateActiveQuestionsFromChosenSections() {
    const chosenSecs = getActiveChosenSections();
    const flatQuestions = [];
    tcsState.activeSections = chosenSecs.map(sec => {
        const mappedQs = sec.questions.map(q => {
            const newGlobalIdx = flatQuestions.length;
            const qCopy = { ...q, originalIndex: newGlobalIdx, _sectionName: sec.name };
            flatQuestions.push(qCopy);
            return qCopy;
        });
        return { secId: sec.secId, name: sec.name, questions: mappedQs };
    });
    tcsState.questions = flatQuestions;
}

window.startTest = function() {
    const t = tcsState.testMeta || {};
    populateActiveQuestionsFromChosenSections();

    tcsState.responses = {};
    tcsState.currentQIdx = 0;
    tcsState.activeSectionIndex = 0;

    const tStr = String(t.time || "60").trim();
    if (tStr.includes("+")) {
        const parts = tStr.split("+").map(n => (parseInt(n.trim()) || 15) * 60);
        tcsState.isSectionalTiming = true;
        tcsState.sectionTimeAllocated = tcsState.activeSections.map((_, i) => parts[i] || parts[0] || 900);
        tcsState.sectionSecondsLeft = [...tcsState.sectionTimeAllocated];
        tcsState.secondsLeft = tcsState.sectionSecondsLeft[0];
    } else {
        tcsState.isSectionalTiming = false;
        tcsState.secondsLeft = (parseInt(tStr) || 60) * 60;
    }

    document.getElementById("start-screen").classList.add("tcs-hidden");
    document.getElementById("live-test-screen").classList.remove("tcs-hidden");

    renderTcsTabs();
    loadQuestion(0);
    startTcsTimer();
};

function formatMMSS(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
}

function formatHHMMSS(sec) {
    const hrs = String(Math.floor(sec / 3600)).padStart(2, "0");
    const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const secs = String(sec % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
}

function startTcsTimer() {
    if (tcsState.timerInterval) clearInterval(tcsState.timerInterval);
    tcsState.timerInterval = setInterval(() => {
        if (tcsState.isSubmitted) return;
        const curIdx = tcsState.currentQIdx;
        if (!tcsState.responses[curIdx]) tcsState.responses[curIdx] = { status: "unattempted", chosenOption: null, timeSpent: 0 };
        tcsState.responses[curIdx].timeSpent = (tcsState.responses[curIdx].timeSpent || 0) + 1;

        const qTimeEl = document.getElementById("tcs-q-time");
        if (qTimeEl) qTimeEl.textContent = formatMMSS(tcsState.responses[curIdx].timeSpent);

        if (tcsState.secondsLeft <= 0) {
            if (tcsState.isSectionalTiming && tcsState.activeSectionIndex < tcsState.activeSections.length - 1) {
                tcsState.activeSectionIndex++;
                tcsState.secondsLeft = tcsState.sectionSecondsLeft[tcsState.activeSectionIndex];
                renderTcsTabs();
                const firstQ = tcsState.activeSections[tcsState.activeSectionIndex].questions[0];
                if (firstQ) loadQuestion(firstQ.originalIndex);
                return;
            }
            clearInterval(tcsState.timerInterval);
            submitTest();
            return;
        }
        tcsState.secondsLeft--;
        if (tcsState.isSectionalTiming) tcsState.sectionSecondsLeft[tcsState.activeSectionIndex] = tcsState.secondsLeft;

        const timerEl = document.getElementById("tcs-timer-display");
        if (timerEl) timerEl.textContent = formatHHMMSS(tcsState.secondsLeft);
    }, 1000);
}

function renderTcsTabs() {
    const wrap = document.getElementById("tcs-tabs-container");
    if (!wrap) return;
    wrap.innerHTML = "";
    tcsState.activeSections.forEach((sec, idx) => {
        const isActive = idx === tcsState.activeSectionIndex;
        const cls = isActive ? "tcs-tab active" : "tcs-tab";
        wrap.innerHTML += `<div class="${cls}" onclick="switchTcsSection(${idx})">${sec.name}</div>`;
    });
}

window.switchTcsSection = function(secIdx) {
    if (tcsState.isSectionalTiming) {
        tcsState.sectionSecondsLeft[tcsState.activeSectionIndex] = tcsState.secondsLeft;
        tcsState.secondsLeft = tcsState.sectionSecondsLeft[secIdx];
    }
    tcsState.activeSectionIndex = secIdx;
    renderTcsTabs();
    const firstQInSec = tcsState.activeSections[secIdx].questions[0];
    if (firstQInSec) loadQuestion(firstQInSec.originalIndex);
};

function loadQuestion(globalIdx) {
    tcsState.currentQIdx = globalIdx;
    const q = tcsState.questions[globalIdx];
    if (!q) return;

    if (!tcsState.responses[globalIdx]) tcsState.responses[globalIdx] = { status: "unattempted", chosenOption: null, timeSpent: 0 };

    let foundSecIdx = tcsState.activeSectionIndex;
    tcsState.activeSections.forEach((sec, sIdx) => {
        if (sec.questions.some(sq => sq.originalIndex === globalIdx)) foundSecIdx = sIdx;
    });
    
    if (foundSecIdx !== tcsState.activeSectionIndex) {
        if (tcsState.isSectionalTiming) {
            tcsState.sectionSecondsLeft[tcsState.activeSectionIndex] = tcsState.secondsLeft; 
            tcsState.secondsLeft = tcsState.sectionSecondsLeft[foundSecIdx];
        }
        tcsState.activeSectionIndex = foundSecIdx;
        renderTcsTabs();
    }

    document.getElementById("tcs-q-num").textContent = globalIdx + 1;
    document.getElementById("tcs-q-time").textContent = formatMMSS(tcsState.responses[globalIdx].timeSpent || 0);

    const posNum = parseFloat(q.positive_marks || 2), negNum = parseFloat(q.negative_marks || 0.25);
    document.getElementById("tcs-live-pos").textContent = `+${Number.isInteger(posNum) ? posNum : posNum.toFixed(2)}`;
    document.getElementById("tcs-live-neg").textContent = `-${Number.isInteger(negNum) ? negNum : negNum}`;

    const qKey = `test_${(tcsState.testMeta && tcsState.testMeta.id) || tcsState.activeTestKey}_q_${q.id || globalIdx}`;
    const bmBtn = document.getElementById("tcs-bookmark-btn");
    if (bmBtn) {
        const isSaved = typeof window.isQuestionBookmarked === "function" && window.isQuestionBookmarked(qKey);
        bmBtn.textContent = isSaved ? "★ Saved" : "☆ Save";
        bmBtn.className = isSaved ? "px-2.5 py-1 rounded-lg bg-amber-500 text-white border border-amber-600 font-extrabold text-xs cursor-pointer" : "px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-300 font-extrabold text-xs cursor-pointer";
    }

    const qTxtBox = document.getElementById("tcs-q-text");
    const rawQHtml = (tcsState.lang === "hi" && (q.question_hi || q.question_hindi)) ? (q.question_hi || q.question_hindi) : (q.question || q.question_text || "");
    qTxtBox.innerHTML = cleanQuestionHtml(rawQHtml);

    const optBox = document.getElementById("tcs-options-container");
    optBox.innerHTML = "";
    
    const resp = tcsState.responses[globalIdx] || {};
    const chosen = resp.chosenOption;
    const opts = [{ id: "1", text: q.option_1 || q.opt1 }, { id: "2", text: q.option_2 || q.opt2 }, { id: "3", text: q.option_3 || q.opt3 }, { id: "4", text: q.option_4 || q.opt4 }, q.option_5 ? { id: "5", text: q.option_5 } : null].filter(Boolean);

    opts.forEach((opt, oIdx) => {
        const isSel = String(chosen) === String(opt.id);
        const selClass = isSel ? "tcs-option selected" : "tcs-option";
        optBox.innerHTML += `
            <div class="${selClass}" data-optid="${opt.id}" onclick="selectTcsOption('${opt.id}')">
                <span class="tcs-opt-letter">${["A", "B", "C", "D", "E"][oIdx] || opt.id}.</span>
                <div style="flex: 1; word-break: break-word;">${cleanQuestionHtml(opt.text || "")}</div>
            </div>`;
    });

    if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([qTxtBox, optBox]).catch(() => {});
}

window.selectTcsOption = function(optId) {
    const idx = tcsState.currentQIdx;
    tcsState.responses[idx] = { status: "attempted", chosenOption: optId, timeSpent: (tcsState.responses[idx] && tcsState.responses[idx].timeSpent) || 0 };
    const options = document.getElementById("tcs-options-container").children;
    for (let i = 0; i < options.length; i++) {
        options[i].className = options[i].getAttribute("data-optid") === String(optId) ? "tcs-option selected" : "tcs-option";
    }
};

window.toggleCurrentQuestionBookmark = function() {
    const q = tcsState.questions[tcsState.currentQIdx]; if (!q) return;
    const qKey = `test_${(tcsState.testMeta && tcsState.testMeta.id) || tcsState.activeTestKey}_q_${q.id || tcsState.currentQIdx}`;
    const optsArr = [q.option_1 || q.opt1, q.option_2 || q.opt2, q.option_3 || q.opt3, q.option_4 || q.opt4].filter(Boolean);
    const expText = (tcsState.lang === "hi" && (q.explanation_hi || q.solution_hi)) ? (q.explanation_hi || q.solution_hi) : (q.solution_text || q.explanation || q.solution || "");
    const isNowSaved = window.toggleBookmarkItem({ qKey, testTitle: tcsState.testMeta.title || "Mock Test", subject: q._sectionName || "Subject", qNumber: tcsState.currentQIdx + 1, question: q.question || q.question_text || "", options: optsArr, answer: String(q.answer || q.correct_option || "1"), solution: expText });
    const bmBtn = document.getElementById("tcs-bookmark-btn");
    if (bmBtn) { bmBtn.textContent = isNowSaved ? "★ Saved" : "☆ Save"; bmBtn.className = isNowSaved ? "px-2.5 py-1 rounded-lg bg-amber-500 text-white border border-amber-600 font-extrabold text-xs cursor-pointer" : "px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-300 font-extrabold text-xs cursor-pointer"; }
};

window.toggleSolutionQuestionBookmark = function() {
    const q = tcsState.questions[tcsState.activeFullSolIdx]; if (!q) return;
    const qKey = `test_${(tcsState.testMeta && tcsState.testMeta.id) || tcsState.activeTestKey}_q_${q.id || tcsState.activeFullSolIdx}`;
    const optsArr = [q.option_1 || q.opt1, q.option_2 || q.opt2, q.option_3 || q.opt3, q.option_4 || q.opt4].filter(Boolean);
    const expText = (tcsState.lang === "hi" && (q.explanation_hi || q.solution_hi)) ? (q.explanation_hi || q.solution_hi) : (q.solution_text || q.explanation || q.solution || "");
    const isNowSaved = window.toggleBookmarkItem({ qKey, testTitle: tcsState.testMeta.title || "Mock Test", subject: q._sectionName || "Subject", qNumber: tcsState.activeFullSolIdx + 1, question: q.question || q.question_text || "", options: optsArr, answer: String(q.answer || q.correct_option || "1"), solution: expText });
    const bmBtn = document.getElementById("fs-bookmark-btn");
    if (bmBtn) { bmBtn.textContent = isNowSaved ? "★ Saved" : "☆ Save"; bmBtn.className = isNowSaved ? "px-2.5 py-1 rounded-lg bg-amber-500 text-white border border-amber-600 font-extrabold text-xs cursor-pointer" : "px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-300 font-extrabold text-xs cursor-pointer"; }
};

window.saveAndNext = function() { const cur = tcsState.responses[tcsState.currentQIdx] || { timeSpent: 0 }; cur.status = cur.chosenOption ? "attempted" : "unattempted"; tcsState.responses[tcsState.currentQIdx] = cur; nextQuestion(); };
window.markForReview = function() { const cur = tcsState.responses[tcsState.currentQIdx] || { timeSpent: 0 }; tcsState.responses[tcsState.currentQIdx] = { ...cur, status: cur.chosenOption ? "marked_attempted" : "marked" }; nextQuestion(); };
window.clearResponse = function() { tcsState.responses[tcsState.currentQIdx] = { status: "unattempted", chosenOption: null, timeSpent: (tcsState.responses[tcsState.currentQIdx] && tcsState.responses[tcsState.currentQIdx].timeSpent) || 0 }; loadQuestion(tcsState.currentQIdx); };
window.nextQuestion = function() { if (tcsState.currentQIdx < tcsState.questions.length - 1) loadQuestion(tcsState.currentQIdx + 1); };
window.prevQuestion = function() { if (tcsState.currentQIdx > 0) loadQuestion(tcsState.currentQIdx - 1); };
window.toggleTcsLangMode = function() {
    tcsState.lang = tcsState.lang === "en" ? "hi" : "en";
    if (!document.getElementById("live-test-screen").classList.contains("tcs-hidden")) loadQuestion(tcsState.currentQIdx);
    else if (!document.getElementById("solutions-screen").classList.contains("tcs-hidden")) renderSolutionsList(tcsState.activeSolFilter);
    else if (!document.getElementById("full-sol-screen").classList.contains("tcs-hidden")) renderFullSolutionContent(tcsState.activeFullSolIdx);
};
window.toggleTcsFullScreen = function() { if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {}); else if (document.exitFullscreen) document.exitFullscreen(); };

window.toggleTcsPalette = function() {
    const palette = document.getElementById("tcs-palette");
    palette.classList.toggle("show");
    if (palette.classList.contains("show")) renderTcsAccordionGrid();
};

function renderTcsAccordionGrid() {
    const cont = document.getElementById("tcs-accordion-container");
    cont.innerHTML = "";
    tcsState.activeSections.forEach((sec, sIdx) => {
        let att = 0, una = 0, mar = 0;
        let gridHtml = `<div class="tcs-q-grid open" id="grid_sec_${sIdx}">`;
        sec.questions.forEach(sq => {
            const r = tcsState.responses[sq.originalIndex];
            let boxCls = "tcs-q-box st-not-ans";
            if (r) {
                if (r.status === "attempted") { boxCls = "tcs-q-box st-ans"; att++; }
                else if (r.status === "marked") { boxCls = "tcs-q-box st-mark"; mar++; }
                else if (r.status === "marked_attempted") { boxCls = "tcs-q-box st-mark-ans"; att++; }
                else una++;
            } else una++;
            gridHtml += `<div class="${boxCls}" onclick="jumpToQuestion(${sq.originalIndex})">${sq.originalIndex + 1}</div>`;
        });
        gridHtml += `</div>`;
        cont.innerHTML += `
            <div class="tcs-accordion">
                <div class="tcs-acc-header" onclick="toggleGridSec(${sIdx})"><span>${sec.name}</span><span>▼</span></div>
                <div class="tcs-acc-stats"><span>Att: ${att}</span><span>Marked: ${mar}</span><span>Un-Att: ${una}</span></div>
                ${gridHtml}
            </div>`;
    });
}

window.toggleGridSec = function(sIdx) { document.getElementById(`grid_sec_${sIdx}`).classList.toggle("open"); };
window.jumpToQuestion = function(globalIdx) { toggleTcsPalette(); loadQuestion(globalIdx); };

window.handleDynamicSubmit = function() { prepareSubmit(); };
window.prepareSubmit = function() {
    document.getElementById("tcs-palette").classList.remove("show");
    document.getElementById("live-test-screen").classList.add("tcs-hidden");
    document.getElementById("submit-screen").classList.remove("tcs-hidden");
    const cont = document.getElementById("submit-summary-container");
    let cardsHtml = "";
    tcsState.activeSections.forEach(sec => {
        let att = 0, una = 0, mar = 0;
        sec.questions.forEach(sq => {
            const r = tcsState.responses[sq.originalIndex];
            if (r && (r.status === "attempted" || r.status === "marked_attempted")) att++;
            else if (r && r.status === "marked") mar++; else una++;
        });
        cardsHtml += `
            <div class="section-summary-card">
                <h3 style="font-weight:800; color:#1a237e; margin-bottom:10px;">${sec.name}</h3>
                <div class="stat-row"><span>Total:</span> <strong>${sec.questions.length}</strong></div>
                <div class="stat-row"><span>Attempted:</span> <strong style="color:#2563eb;">${att}</strong></div>
                <div class="stat-row"><span>Marked for Review:</span> <strong style="color:#d97706;">${mar}</strong></div>
                <div class="stat-row"><span>Unattempted:</span> <strong style="color:#64748b;">${una}</strong></div>
            </div>`;
    });
    cont.innerHTML = cardsHtml;
};
window.closeSubmit = function() { document.getElementById("submit-screen").classList.add("tcs-hidden"); document.getElementById("live-test-screen").classList.remove("tcs-hidden"); };

window.submitTest = function(isRestoringSaved = false, fallbackSavedStats = null) {
    if (tcsState.timerInterval) clearInterval(tcsState.timerInterval);
    tcsState.isSubmitted = true;
    ["start-screen", "submit-screen", "live-test-screen", "solutions-screen", "full-sol-screen"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add("tcs-hidden");
    });
    document.getElementById("analysis-screen").classList.remove("tcs-hidden");

    let correct = 0, incorrect = 0, unattempted = 0, score = 0, timeCorr = 0, timeInc = 0, timeUna = 0, maxMarks = 0;
    const hasResponses = tcsState.responses && Object.keys(tcsState.responses).length > 0;

    tcsState.questions.forEach((q, i) => {
        const pos = parseFloat(q.positive_marks || 2.0), neg = parseFloat(q.negative_marks || 0.25);
        maxMarks += pos;
        const r = tcsState.responses[i] || {}, spent = r.timeSpent || 0, correctAns = String(q.answer || q.correct_option || "1").trim();
        if (!r.chosenOption) { unattempted++; timeUna += spent; }
        else if (String(r.chosenOption) === correctAns) { correct++; score += pos; timeCorr += spent; }
        else { incorrect++; score -= neg; timeInc += spent; }
    });

    score = parseFloat(score.toFixed(2)); maxMarks = Math.round(maxMarks);

    if (isRestoringSaved && !hasResponses && fallbackSavedStats) {
        score = fallbackSavedStats.score ?? score; maxMarks = fallbackSavedStats.maxMarks ?? maxMarks;
        correct = fallbackSavedStats.correct ?? correct; incorrect = fallbackSavedStats.incorrect ?? incorrect;
        unattempted = fallbackSavedStats.unattempted ?? unattempted; timeCorr = fallbackSavedStats.timeCorr ?? timeCorr;
        timeInc = fallbackSavedStats.timeInc ?? timeInc; timeUna = fallbackSavedStats.timeUna ?? timeUna;
    }
    const accuracy = (correct + incorrect) > 0 ? Math.round((correct / (correct + incorrect)) * 100) : 0;

    if (!isRestoringSaved && typeof window.recordUserTestAttempt === "function") {
        window.recordUserTestAttempt(tcsState.testMeta.id || tcsState.activeTestKey, {
            testKey: tcsState.activeTestKey, title: tcsState.testMeta.title || "Mock Test",
            seriesId: tcsState.testMeta.seriesId || window.state.activeSeriesId || "", seriesTitle: window.state.activeSeriesTitle || "Paid Test Series",
            score, maxMarks, correct, incorrect, unattempted, accuracy, timeCorr, timeInc, timeUna, testMeta: tcsState.testMeta, responses: tcsState.responses,
            selectedOptionalByGroup: tcsState.selectedOptionalByGroup, activeSectionsSnapshot: tcsState.activeSections, questionsSnapshot: tcsState.questions
        });
    }

    document.getElementById("res-score").textContent = `${score}/${maxMarks}`; document.getElementById("res-correct").textContent = correct;
    document.getElementById("res-incorrect").textContent = incorrect; document.getElementById("res-unatt").textContent = unattempted;
    document.getElementById("res-acc").textContent = `${accuracy}%`; document.getElementById("res-rank").textContent = score >= maxMarks * 0.75 ? "#12" : "#148";
    document.getElementById("res-perc").textContent = `${Math.min(99.8, Math.max(15, (score / (maxMarks || 1)) * 100 + 12)).toFixed(1)}%`;
    document.getElementById("cmp-score").textContent = score; document.getElementById("cmp-top").textContent = (maxMarks * 0.88).toFixed(1);
    document.getElementById("cmp-avg").textContent = (maxMarks * 0.48).toFixed(1); document.getElementById("cmp-acc").textContent = `${accuracy}%`;
    document.getElementById("cmp-c").textContent = correct; document.getElementById("cmp-top-c").textContent = Math.round(tcsState.questions.length * 0.9);
    document.getElementById("cmp-avg-c").textContent = Math.round(tcsState.questions.length * 0.52); document.getElementById("cmp-w").textContent = incorrect;
    document.getElementById("cmp-top-w").textContent = Math.round(tcsState.questions.length * 0.04); document.getElementById("cmp-avg-w").textContent = Math.round(tcsState.questions.length * 0.18);

    const totalQ = tcsState.questions.length || (correct + incorrect + unattempted) || 1;
    const cDeg = (correct / totalQ) * 360, wDeg = cDeg + (incorrect / totalQ) * 360;
    const donut = document.getElementById("res-donut");
    if (donut) donut.style.background = `conic-gradient(#4caf50 0deg ${cDeg}deg, #e53935 ${cDeg}deg ${wDeg}deg, #5c6bc0 ${wDeg}deg 360deg)`;
    document.getElementById("ts-box-corr").innerHTML = `Correct<br>${formatMMSS(timeCorr)}`; document.getElementById("ts-box-una").innerHTML = `Unattempted: ${formatMMSS(timeUna)}`; document.getElementById("ts-box-inc").innerHTML = `Incorrect<br>${formatMMSS(timeInc)}`;

    const rem = document.getElementById("dynamic-remark");
    if (rem) {
        rem.style.display = "block";
        if (accuracy >= 80 && correct > 0) { rem.className = "remark-banner rem-excellent"; rem.textContent = "🎉 Excellent Performance! Keep it up!"; } 
        else if (accuracy >= 50 && correct > 0) { rem.className = "remark-banner rem-great"; rem.textContent = "👍 Good Attempt! Practice more to reach the top."; } 
        else { rem.className = "remark-banner rem-poor"; rem.textContent = "⚠️ Needs Improvement! Review full solutions carefully."; }
    }

    const sCont = document.getElementById("analysis-sections-container"); sCont.innerHTML = "";
    tcsState.activeSections.forEach(sec => {
        let sCorr = 0, sInc = 0, sUna = 0, sScore = 0, stCorr = 0, stInc = 0, stUna = 0;
        sec.questions.forEach(sq => {
            const r = tcsState.responses[sq.originalIndex] || {}, ans = String(sq.answer || sq.correct_option || "1").trim();
            const pos = parseFloat(sq.positive_marks || 2.0), neg = parseFloat(sq.negative_marks || 0.25), sp = r.timeSpent || 0;
            if (!r.chosenOption) { sUna++; stUna += sp; }
            else if (String(r.chosenOption) === ans) { sCorr++; sScore += pos; stCorr += sp; }
            else { sInc++; sScore -= neg; stInc += sp; }
        });
        if (isRestoringSaved && !hasResponses && tcsState.activeSections.length === 1 && fallbackSavedStats) { sCorr = correct; sInc = incorrect; sUna = unattempted; sScore = score; }
        sCont.innerHTML += `
            <div class="a-card">
                <div class="subj-header"><div class="subj-name">${sec.name}</div><div class="black-circle"><span>Score</span><span>${sScore.toFixed(1)}</span></div></div>
                <div class="subj-q-stats">Total Questions: ${sec.questions.length}</div>
                <div class="time-split">
                    <div class="col"><div class="c-green">Correct</div><div class="val-num">${sCorr}</div><div class="val-time">${formatMMSS(stCorr)}</div></div>
                    <div class="col"><div class="c-red">Incorrect</div><div class="val-num">${sInc}</div><div class="val-time">${formatMMSS(stInc)}</div></div>
                    <div class="col"><div class="c-grey">Unattempted</div><div class="val-num">${sUna}</div><div class="val-time">${formatMMSS(stUna)}</div></div>
                </div>
            </div>`;
    });
};

window.openSavedTcsScorecard = async function(testId, tKey, savedRecord) {
    const fullSaved = (typeof window.getSavedAttemptByTestId === "function" && window.getSavedAttemptByTestId(testId)) || savedRecord || {};
    const resolvedKey = tKey || fullSaved.testKey || `test_${testId}`;
    const meta = window.state.testMap[resolvedKey] || fullSaved.testMeta || { id: testId, title: fullSaved.title || `Test #${testId}` };
    window.state.testMap[resolvedKey] = meta;
    tcsState.activeTestKey = resolvedKey;
    tcsState.testMeta = meta;
    tcsState.responses = fullSaved.responses || {};
    tcsState.selectedOptionalByGroup = fullSaved.selectedOptionalByGroup || {};
    tcsState.isSubmitted = true;
    window.showSlide("slideTestAttempt");

    if (fullSaved.questionsSnapshot && fullSaved.questionsSnapshot.length > 0) {
        tcsState.questions = fullSaved.questionsSnapshot;
        tcsState.activeSections = fullSaved.activeSectionsSnapshot;
        window.submitTest(true, fullSaved);
        return;
    }

    const { loadedQuestions, externalSecMap, exactTestMeta } = await fetchQuestionsAndSectionsForMeta(meta);
    if (exactTestMeta) {
        tcsState.testMeta.time = exactTestMeta.time || tcsState.testMeta.time;
        tcsState.testMeta.marks = exactTestMeta.marks || tcsState.testMeta.marks;
    }
    tcsState.rawAllQuestions = loadedQuestions;
    prepareAllSectionsAndRenderStart(externalSecMap, false);
    if (fullSaved.selectedOptionalByGroup && fullSaved.selectedOptionalByGroup["A"]) {
        tcsState.selectedOptionalByGroup["A"] = fullSaved.selectedOptionalByGroup["A"];
    }
    populateActiveQuestionsFromChosenSections();
    window.submitTest(true, fullSaved);
};
window.openSavedTestScorecard = window.openSavedTcsScorecard;

window.reAttemptTcsTest = function() { window.launchTcsCbtEngine(tcsState.activeTestKey); };
window.reAttemptCbtTest = window.reAttemptTcsTest;

window.exitCbtTest = function() { 
    if (tcsState.timerInterval) clearInterval(tcsState.timerInterval); 
    ["start-screen", "submit-screen", "live-test-screen", "solutions-screen", "full-sol-screen", "analysis-screen"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add("tcs-hidden");
    });
    if (typeof window.showSlide === "function") {
        window.showSlide("slideExplorer");
    }
};

window.openSolutions = function() { document.getElementById("analysis-screen").classList.add("tcs-hidden"); document.getElementById("solutions-screen").classList.remove("tcs-hidden"); tcsState.activeSolFilter = "all"; renderSolutionsList("all"); };
window.closeSolutions = function() { document.getElementById("solutions-screen").classList.add("tcs-hidden"); document.getElementById("analysis-screen").classList.remove("tcs-hidden"); };
window.filterSol = function(filterType, btnEl) { document.querySelectorAll(".flt-btn").forEach(b => b.classList.remove("flt-active")); if (btnEl) btnEl.classList.add("flt-active"); tcsState.activeSolFilter = filterType; renderSolutionsList(filterType); };

function renderSolutionsList(filter) {
    const cont = document.getElementById("sol-list-container"); cont.innerHTML = "";
    tcsState.questions.forEach((q, idx) => {
        const r = tcsState.responses[idx], correctAns = String(q.answer || q.correct_option || "1").trim(), hasChosen = r && r.chosenOption;
        const isCorr = hasChosen && String(r.chosenOption) === correctAns, isInc = hasChosen && !isCorr, isUna = !hasChosen;
        if ((filter === "correct" && !isCorr) || (filter === "incorrect" && !isInc) || (filter === "unattempted" && !isUna)) return;
        let badgeClass = isCorr ? "st-corr" : (isInc ? "st-wr" : "st-una"), iconHtml = isCorr ? "✓" : (isInc ? "✕" : "−");
        const qText = (tcsState.lang === "hi" && (q.question_hi || q.question_hindi)) ? (q.question_hi || q.question_hindi) : (q.question || q.question_text || "");
        cont.innerHTML += `
            <div class="sol-item" onclick="openFullSolution(${idx})" style="cursor:pointer;">
                <div class="sol-num-col"><div class="sol-num">${idx + 1}<div class="sol-status-icon ${badgeClass}">${iconHtml}</div></div><div class="sol-line"></div></div>
                <div class="sol-card"><span class="sol-sec-badge">${q._sectionName || "General"}</span><div class="sol-q-txt">${cleanQuestionHtml(qText)}</div><div style="font-size:12px; font-weight:800; color:#1a237e;">View Full Solution ➔</div></div>
            </div>`;
    });
    if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([cont]).catch(() => {});
}

window.openFullSolution = function(idx) { tcsState.activeFullSolIdx = idx; document.getElementById("solutions-screen").classList.add("tcs-hidden"); document.getElementById("full-sol-screen").classList.remove("tcs-hidden"); renderFullSolutionContent(idx); };

function renderFullSolutionContent(idx) {
    const q = tcsState.questions[idx]; if (!q) return;
    const r = tcsState.responses[idx] || {}, correctAns = String(q.answer || q.correct_option || "1").trim();
    document.getElementById("fs-q-num").textContent = `Question ${idx + 1} (${q._sectionName || ""})`;
    document.getElementById("fs-q-time-compare").innerHTML = `<span class="time-compare-badge"><span class="tc-you">⏱️ You: ${formatMMSS(r.timeSpent || 0)}</span></span>`;
    
    const qKey = `test_${(tcsState.testMeta && tcsState.testMeta.id) || tcsState.activeTestKey}_q_${q.id || idx}`;
    const bmBtn = document.getElementById("fs-bookmark-btn");
    if (bmBtn) {
        const isSaved = typeof window.isQuestionBookmarked === "function" && window.isQuestionBookmarked(qKey);
        bmBtn.textContent = isSaved ? "★ Saved" : "☆ Save";
        bmBtn.className = isSaved ? "px-2.5 py-1 rounded-lg bg-amber-500 text-white border border-amber-600 font-extrabold text-xs cursor-pointer" : "px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-300 font-extrabold text-xs cursor-pointer";
    }

    const qTxt = (tcsState.lang === "hi" && (q.question_hi || q.question_hindi)) ? (q.question_hi || q.question_hindi) : (q.question || q.question_text || "");
    document.getElementById("fs-q-txt").innerHTML = cleanQuestionHtml(qTxt);
    
    const optBox = document.getElementById("fs-options-container"); optBox.innerHTML = "";
    const opts = [{ id: "1", text: q.option_1 || q.opt1 }, { id: "2", text: q.option_2 || q.opt2 }, { id: "3", text: q.option_3 || q.opt3 }, { id: "4", text: q.option_4 || q.opt4 }, q.option_5 ? { id: "5", text: q.option_5 } : null].filter(Boolean);
    opts.forEach((opt, oIdx) => {
        const isCorrectOpt = String(opt.id) === correctAns, isUserChosen = r.chosenOption && String(r.chosenOption) === String(opt.id);
        let cls = isCorrectOpt ? "fs-opt correct" : (isUserChosen ? "fs-opt wrong" : "fs-opt");
        optBox.innerHTML += `
            <div class="${cls}">
                <div style="display:flex; align-items:flex-start; gap:10px;"><strong style="color:#1a237e;">${["A", "B", "C", "D", "E"][oIdx] || opt.id}.</strong><div>${cleanQuestionHtml(opt.text || "")}</div></div>
                ${isCorrectOpt ? `<span class="fs-opt-perc">✓ Correct</span>` : ""}
                ${isUserChosen && !isCorrectOpt ? `<span style="font-size:11px;font-weight:800;color:#c62828;">✗ Your Ans</span>` : ""}
            </div>`;
    });
    const expText = (tcsState.lang === "hi" && (q.explanation_hi || q.solution_hi)) ? (q.explanation_hi || q.solution_hi) : (q.solution_text || q.explanation || q.solution || "Detailed solution above.");
    document.getElementById("fs-exp-text").innerHTML = cleanQuestionHtml(expText);
    if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([document.getElementById("full-sol-screen")]).catch(() => {});
}

window.closeFullSol = function() { document.getElementById("full-sol-screen").classList.add("tcs-hidden"); document.getElementById("solutions-screen").classList.remove("tcs-hidden"); };
window.nextFullSol = function() { if (tcsState.activeFullSolIdx < tcsState.questions.length - 1) renderFullSolutionContent(++tcsState.activeFullSolIdx); };
window.prevFullSol = function() { if (tcsState.activeFullSolIdx > 0) renderFullSolutionContent(--tcsState.activeFullSolIdx); };
