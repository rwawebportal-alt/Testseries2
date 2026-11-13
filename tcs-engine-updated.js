// =========================================================
// RWA SKY PORTAL - EXACT TCS CBT MOCK TEST & BOOKMARK ENGINE (tcs-engine.js)
// =========================================================

(function injectExactTcsStyles() {
    if (document.getElementById("tcs-exact-fix-styles")) return;
    const st = document.createElement("style");
    st.id = "tcs-exact-fix-styles";
    st.innerHTML = `
        /* Fix parent transform breaking position:fixed (Removes blue border on left/top) */
        #slideTestAttempt,
        #slideTestAttempt.active-slide {
            animation: none !important;
            transform: none !important;
            padding: 0 !important;
            margin: 0 !important;
        }

        .tcs-fullscreen-shell {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            height: 100dvh !important;
            background: #555555;
            z-index: 99999 !important;
            overflow: hidden;
        }

        /* STEP 1: START SCREEN EXACT MATCH */
        #start-screen {
            background: #555555 !important;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 14px !important;
            overflow-y: auto;
        }

        #start-screen .start-card {
            background: #ffffff !important;
            width: 100% !important;
            max-width: 460px !important;
            border-radius: 22px !important;
            padding: 22px 20px !important;
            max-height: 94vh !important;
            overflow-y: auto !important;
            box-shadow: 0 15px 35px rgba(0,0,0,0.45) !important;
            position: relative !important;
        }

        .tcs-sec-heading {
            font-size: 15px;
            font-weight: 800;
            color: #1a237e;
            margin: 10px 0 12px 0;
            padding-bottom: 8px;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        #subjects-selection-container {
            display: flex !important;
            flex-direction: column !important;
            gap: 10px !important;
            position: relative !important;
            width: 100% !important;
            margin-bottom: 14px !important;
        }

        .tcs-sub-row {
            position: relative !important;
            width: 100% !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            padding: 13px 15px !important;
            border-radius: 11px !important;
            font-size: 14px !important;
            transition: all 0.18s ease !important;
            margin: 0 !important;
        }

        .tcs-sub-row.fixed-sub {
            background: #f0f4f8 !important;
            border: 1px solid #d9e2ec !important;
            border-left: 4px solid #1a237e !important;
        }

        .tcs-sub-row.opt-sub {
            background: #ffffff !important;
            border: 1px solid #ffcc80 !important;
            border-left: 4px solid #ff9800 !important;
            cursor: pointer !important;
        }

        .tcs-sub-row.opt-sub.selected {
            background: #e8f5e9 !important;
            border: 1.5px solid #4caf50 !important;
            border-left: 4px solid #4caf50 !important;
        }

        .tcs-sub-left {
            display: flex !important;
            align-items: center !important;
            gap: 9px !important;
            font-weight: 700 !important;
            color: #102a43 !important;
            text-align: left !important;
            line-height: 1.35 !important;
            padding-right: 8px !important;
        }

        .tcs-sub-pill {
            background: #d9e2ec !important;
            color: #334e68 !important;
            font-size: 12px !important;
            font-weight: 800 !important;
            padding: 4px 11px !important;
            border-radius: 14px !important;
            white-space: nowrap !important;
            flex-shrink: 0 !important;
        }

        .tcs-sub-row.opt-sub.selected .tcs-sub-pill {
            background: #c8e6c9 !important;
            color: #2e7d32 !important;
        }

        .tcs-opt-heading {
            font-size: 13.5px !important;
            font-weight: 800 !important;
            color: #e65100 !important;
            margin: 8px 0 2px 0 !important;
            display: flex !important;
            align-items: center !important;
            gap: 6px !important;
        }

        #start-screen .stats-box {
            position: relative !important;
            width: 100% !important;
            background: #f8f9fa !important;
            padding: 15px 16px !important;
            border-radius: 12px !important;
            border: 1px solid #e9ecef !important;
            margin-top: 14px !important;
            clear: both !important;
        }

        #start-screen .start-btn {
            background: #1c1c1e !important;
            color: #ffffff !important;
            border-radius: 10px !important;
            padding: 15px !important;
            font-size: 16px !important;
            font-weight: 800 !important;
            margin-top: 16px !important;
            width: 100% !important;
            border: none !important;
            cursor: pointer !important;
        }

        /* STEP 2: LIVE TEST SCREEN EXACT MATCH */
        #live-test-screen .tcs-q-badge {
            background: #757575 !important;
            color: #ffffff !important;
            width: 26px !important;
            height: 26px !important;
            border-radius: 50% !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-weight: 800 !important;
            font-size: 12px !important;
            margin-right: 8px !important;
        }

        #live-test-screen .tcs-m-pos {
            background: transparent !important;
            color: #2e7d32 !important;
            font-weight: 800 !important;
            font-size: 13px !important;
            padding: 0 2px !important;
        }

        #live-test-screen .tcs-m-neg {
            background: transparent !important;
            color: #d32f2f !important;
            font-weight: 800 !important;
            font-size: 13px !important;
            padding: 0 2px !important;
        }

        #live-test-screen .tcs-option {
            border: 1px solid #eeeeee !important;
            border-radius: 10px !important;
            padding: 14px 16px !important;
            margin-bottom: 12px !important;
            font-size: 15px !important;
            display: flex !important;
            align-items: flex-start !important;
            cursor: pointer !important;
            background: #ffffff !important;
            box-shadow: 0 2px 6px rgba(0,0,0,0.04) !important;
            transition: all 0.15s ease !important;
        }

        #live-test-screen .tcs-option.selected {
            border: 1.5px solid #1a237e !important;
            background: #e8eaf6 !important;
        }

        #live-test-screen .tcs-opt-letter {
            font-weight: 800 !important;
            color: #222222 !important;
            margin-right: 12px !important;
            min-width: 20px !important;
            flex-shrink: 0 !important;
        }

        #live-test-screen .tcs-option.selected .tcs-opt-letter {
            color: #1a237e !important;
        }
    `;
    document.head.appendChild(st);
})();

// =========================================================
// ENGINE STATE
// =========================================================
let tcsState = {
    activeTestKey: null,
    testMeta: null,
    rawAllQuestions: [],
    discoveredMetadata: null,
    allParsedSections: [],      // Every section found in JSON (Compulsory + All Optionals)
    selectedOptionalByGroup: {}, // Dynamically discovered optional-group selections
    activeSections: [],         // Only Compulsory + Chosen Optional sections
    questions: [],              // Active questions for the live test (e.g. 80 Qs)
    currentQIdx: 0,
    responses: {},              // idx -> { chosenOption, status, timeSpent }
    activeSectionIndex: 0,
    timerInterval: null,
    secondsLeft: 0,
    isSectionalTiming: false,
    sectionTimeAllocated: [],
    sectionSecondsLeft: [],
    isSubmitted: false,
    lang: "en",
    activeSolFilter: "all",
    activeFullSolIdx: 0
};

// =========================================================
// DYNAMIC TCS METADATA, SUBJECT & OPTIONAL-SECTION ENGINE
// No hardcoded section IDs: use test metadata and question JSON only.
// =========================================================
function stripHtmlText(html) {
    if (!html) return "";
    return String(html)
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;|&#160;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;|&apos;/gi, "'")
        .replace(/\s+/g, " ")
        .trim();
}

function cleanQuestionHtml(rawHtml) {
    if (!rawHtml) return "";
    return String(rawHtml)
        .replace(/font-size:\s*\d+(\.\d+)?(pt|px)/gi, "")
        .replace(/<p>\s*(&nbsp;|\s)*\s*<\/p>/gi, "");
}

function escapeTcsHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, ch => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[ch]));
}

function firstValue(...values) {
    return values.find(v => v !== undefined && v !== null && String(v).trim() !== "");
}

function asBoolean(value) {
    if (value === true || value === 1) return true;
    return /^(1|true|yes|optional|elective)$/i.test(String(value ?? "").trim());
}

function getQuestionSectionId(q) {
    return String(firstValue(q.section_id, q.sectionId, q.part_id, q.partId, q.subject_id, q.subjectId, q.section, "unassigned")).trim();
}

function inferSubjectFromQuestions(questionsList, rawLabel, fallbackId) {
    const supplied = String(rawLabel || "").trim();
    if (supplied && !/^(section|part|subject)?\s*[-_#]?\d+$/i.test(supplied) &&
        !/^(general|uncategorized|unknown)$/i.test(supplied)) return supplied;

    const text = questionsList.slice(0, 35).map(q => [
        q.question, q.question_text, q.question_hi, q.question_hindi,
        q.option_1, q.option_2, q.option_3, q.option_4,
        q.subject, q.subject_name, q.topic, q.topic_name
    ].filter(Boolean).map(stripHtmlText).join(" ")).join(" ");
    const lower = text.toLowerCase();
    const devanagari = (text.match(/[\u0900-\u097F]/g) || []).length;
    const latin = (text.match(/[a-z]/gi) || []).length;

    const rules = [
        ["English", [/\b(synonym|antonym|idiom|one word substitution|cloze|comprehension|passive voice|active voice|grammatical error)\b/i]],
        ["Hindi", [/विलोम|पर्यायवाची|मुहावरा|संधि|समास|तत्सम|तद्भव|उपसर्ग|प्रत्यय|लोकोक्ति|वर्तनी|शुद्ध वाक्य/]],
        ["General Intelligence and Reasoning", [/कूट भाषा|कूटबद्ध|दिशा ज्ञान|रक्त संबंध|श्रृंखला|सादृश्य|असंगत|निष्कर्ष|syllogism|coding.?decoding|analogy|series|mirror image|embedded figure/i]],
        ["Mathematics", [/प्रतिशत|अनुपात|औसत|लाभ.?हानि|ब्याज|क्षेत्रफल|आयतन|त्रिभुज|समीकरण|percentage|profit|loss|interest|ratio|average|equation/i]],
        ["General Awareness", [/संविधान|अनुच्छेद|राष्ट्रपति|प्रधानमंत्री|संसद|इतिहास|भूगोल|जनगणना|राष्ट्रीय उद्यान|अर्थव्यवस्था|current affairs|constitution|president|parliament|history|geography/i]],
        ["Computer Knowledge", [/कंप्यूटर|सॉफ्टवेयर|हार्डवेयर|मेमोरी|इंटरनेट|ब्राउज़र|computer|software|hardware|keyboard|cpu|operating system/i]],
        ["Science", [/प्रकाश संश्लेषण|कोशिका|परमाणु|अणु|बल|ऊर्जा|रासायनिक|physics|chemistry|biology|photosynthesis|molecule|atom/i]]
    ];
    let best = { name: "", score: 0 };
    for (const [name, patterns] of rules) {
        let score = 0;
        patterns.forEach(re => { const m = text.match(new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g")); if (m) score += m.length * 2; });
        if (name === "Hindi" && devanagari > latin * 1.3) score += 3;
        if (name === "English" && latin > 120 && devanagari === 0) score += 3;
        if (score > best.score) best = { name, score };
    }
    if (best.score >= 2) return best.name;
    const explicit = firstValue(questionsList[0]?.subject_name, questionsList[0]?.subject, questionsList[0]?.topic_name);
    return explicit || `Subject ${fallbackId}`;
}

function unwrapArray(payload, keys = []) {
    if (Array.isArray(payload)) return payload;
    if (!payload || typeof payload !== "object") return [];
    for (const key of keys) {
        if (Array.isArray(payload[key])) return payload[key];
        if (payload[key] && typeof payload[key] === "object") {
            const nested = unwrapArray(payload[key], keys);
            if (nested.length) return nested;
        }
    }
    return [];
}

async function fetchJsonWithFallback(url) {
    if (!url) return null;
    const normalized = String(url).replace(/\\\//g, "/");
    const candidates = [normalized];
    if (typeof WORKER_RAW_PROXY !== "undefined" && WORKER_RAW_PROXY) {
        candidates.push(WORKER_RAW_PROXY + encodeURIComponent(normalized));
    }
    let lastError;
    for (const candidate of candidates) {
        try {
            const response = await fetch(candidate, { method: "GET", cache: "no-store" });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) { lastError = error; }
    }
    throw lastError || new Error("Unable to fetch JSON");
}

function normalizeSectionRecord(section) {
    const id = firstValue(section.id, section.section_id, section.sectionId, section.part_id, section.subject_id);
    if (id === undefined) return null;
    const compulsoryValue = firstValue(section.is_compulsory, section.isCompulsory, section.compulsory, section.is_mandatory, section.mandatory);
    const optionalValue = firstValue(section.is_optional, section.isOptional, section.optional, section.is_elective, section.elective, section.selection_type, compulsoryValue !== undefined ? !asBoolean(compulsoryValue) : undefined);
    const group = firstValue(section.optional_group, section.optionalGroup, section.choice_group, section.group_id, section.group, section.selection_group, "A");
    return {
        id: String(id),
        name: firstValue(section.title, section.section_title, section.section_name, section.name, section.part_title, section.subject_title, section.subject_name, section.subject, ""),
        isOptional: asBoolean(optionalValue),
        group: String(group),
        order: Number(firstValue(section.sort_order, section.sequence, section.position, section.order, 9999)) || 9999,
        raw: section
    };
}

function getNextDataBuildId() {
    if (window.__NEXT_DATA__?.buildId) return window.__NEXT_DATA__.buildId;
    const node = document.getElementById("__NEXT_DATA__");
    if (node) {
        try {
            const data = JSON.parse(node.textContent || "{}");
            if (data.buildId) return data.buildId;
        } catch (_) {}
    }
    return "";
}

function getTcsRouteContext(testMeta) {
    const t = testMeta || {};
    const sourceUrl = firstValue(t.source_url, t.sourceUrl, t.test_url, t.testUrl, t.terms_url, t.attempt_url, "");
    let source = null;
    try { if (sourceUrl) source = new URL(sourceUrl, window.location.origin); } catch (_) {}
    const params = new URLSearchParams(source?.search || window.location.search);
    const path = source?.pathname || window.location.pathname || "";
    const match = path.match(/\/test-series\/([^/]+)\/(.+?)\/([^/]+)\/(terms|attempt)\/?$/i);
    const seriesId = String(firstValue(t.test_series_id, t.testSeriesId, t.series_id, params.get("id"), match?.[1], ""));
    const testId = String(firstValue(t.id, t.test_id, t.testId, params.get("testId"), match?.[3], tcsState.activeTestKey, ""));
    const routeTail = match ? match[2] : "";
    const routeBase = firstValue(t.next_data_route, t.nextDataRoute, match ? `/test-series/${match[1]}/${routeTail}/${match[3]}` : "");
    return {
        seriesId,
        testId,
        routeBase,
        origin: firstValue(t.source_origin, t.sourceOrigin, source?.origin, window.location.origin),
        buildId: firstValue(t.next_build_id, t.buildId, getNextDataBuildId(), "")
    };
}

function getTcsPageDataUrls(testMeta) {
    const t = testMeta || {};
    const ctx = getTcsRouteContext(t);
    const suppliedTerms = firstValue(t.terms_json_url, t.termsJsonUrl, t.test_terms_url, "");
    const suppliedAttempt = firstValue(t.attempt_json_url, t.attemptJsonUrl, t.test_attempt_url, "");
    const urls = [];
    if (suppliedTerms) urls.push({ type: "terms", url: suppliedTerms });
    if (suppliedAttempt) urls.push({ type: "attempt", url: suppliedAttempt });

    if (ctx.buildId && ctx.seriesId && ctx.testId && ctx.routeBase) {
        const base = `${ctx.origin}/_next/data/${encodeURIComponent(ctx.buildId)}${ctx.routeBase}`;
        const query = `id=${encodeURIComponent(ctx.seriesId)}&testId=${encodeURIComponent(ctx.testId)}`;
        if (!suppliedTerms) urls.push({ type: "terms", url: `${base}/terms.json?testPassUrl=&${query}` });
        if (!suppliedAttempt) urls.push({ type: "attempt", url: `${base}/attempt.json?${query}` });
    }
    return urls;
}

function extractNextPageProps(payload) {
    if (!payload || typeof payload !== "object") return {};
    return payload.pageProps || payload.props?.pageProps || payload.data?.pageProps || payload;
}

async function fetchTcsPageMetadata(testMeta) {
    const merged = {};
    const pageUrls = getTcsPageDataUrls(testMeta);
    for (const item of pageUrls) {
        try {
            const candidates = [item.url];
            if (typeof WORKER_RAW_PROXY !== "undefined" && WORKER_RAW_PROXY) {
                candidates.push(WORKER_RAW_PROXY + encodeURIComponent(item.url));
            }
            let payload = null;
            let lastError = null;
            for (const candidate of candidates) {
                try {
                    const response = await fetch(candidate, {
                        method: "GET",
                        cache: "no-store",
                        credentials: candidate === item.url ? "include" : "omit",
                        headers: { "Accept": "application/json", "x-nextjs-data": "1" }
                    });
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    payload = await response.json();
                    break;
                } catch (requestError) { lastError = requestError; }
            }
            if (!payload) throw lastError || new Error("Next.js metadata request failed");
            const props = extractNextPageProps(payload);
            const pageTest = props.test || props.test_data || props.testDetails || props.test_details || {};
            Object.assign(merged, pageTest);
            if (props.sections || props.subjects || props.section_data) {
                merged.sections = props.sections || props.subjects || props.section_data;
            }
            if (props.terms !== undefined) merged.terms = props.terms;
        } catch (error) {
            console.warn(`TCS ${item.type} metadata unavailable:`, error);
        }
    }
    return merged;
}

async function fetchQuestionsAndSectionsForMeta(testMeta) {
    let t = { ...(testMeta || {}) };
    const pageMetadata = await fetchTcsPageMetadata(t);
    t = { ...t, ...pageMetadata };
    tcsState.testMeta = t;

    const questionUrl = firstValue(t.test_questions_url, t.questions_url, t.question_url, t.question_json_url, t.questions_json, t.question_file_url, "");
    const sectionUrl = firstValue(t.test_sections_url, t.test_section_url, t.section_url, t.sections_url, t.subjects_url, t.section_json_url, "");
    let questionPayload = null;
    let sectionPayload = null;

    if (questionUrl) questionPayload = await fetchJsonWithFallback(questionUrl);
    if (sectionUrl) {
        try { sectionPayload = await fetchJsonWithFallback(sectionUrl); } catch (error) { console.warn("TCS section metadata unavailable:", error); }
    }

    let loadedQuestions = unwrapArray(questionPayload, ["data", "questions", "result", "items", "question_list", "records"]);
    if (!loadedQuestions.length && questionPayload && typeof questionPayload === "object") {
        const nested = questionPayload.data || questionPayload.result || questionPayload.payload;
        loadedQuestions = unwrapArray(nested, ["questions", "items", "records"]);
    }
    if (!loadedQuestions.length && typeof DB !== "undefined" && Array.isArray(DB.fallbackCbtQuestions)) {
        loadedQuestions = DB.fallbackCbtQuestions;
    }
    if (!loadedQuestions.length) throw new Error("इस टेस्ट का Question JSON खाली है या उसका URL उपलब्ध नहीं है।");

    const sectionRows = [
        ...unwrapArray(sectionPayload, ["data", "sections", "subjects", "result", "items", "records"]),
        ...unwrapArray(t.sections || t.subjects || t.section_data || t.test_sections, ["data", "sections", "subjects", "items", "records"])
    ];
    const externalSecMap = {};
    sectionRows.map(normalizeSectionRecord).filter(Boolean).forEach(section => {
        externalSecMap[section.id] = section;
    });

    const embeddedSections = questionPayload && typeof questionPayload === "object"
        ? unwrapArray(questionPayload.sections || questionPayload.subjects || questionPayload.section_data, ["data", "items"])
        : [];
    embeddedSections.map(normalizeSectionRecord).filter(Boolean).forEach(section => {
        externalSecMap[section.id] = { ...externalSecMap[section.id], ...section };
    });

    loadedQuestions.forEach(q => {
        const id = getQuestionSectionId(q);
        const rowName = firstValue(q.section_name, q.section_title, q.subject_title, q.subject_name, q.subject, q.part_title, "");
        const compulsoryFlag = firstValue(q.is_compulsory, q.isCompulsory, q.compulsory, q.is_mandatory, q.mandatory);
        const optionalFlag = firstValue(q.is_optional, q.isOptional, q.optional, q.is_elective, compulsoryFlag !== undefined ? !asBoolean(compulsoryFlag) : undefined);
        if (!externalSecMap[id]) externalSecMap[id] = {
            id,
            name: rowName || "",
            isOptional: asBoolean(optionalFlag),
            group: String(firstValue(q.optional_group, q.optionalGroup, q.choice_group, q.group_id, "A")),
            order: 9999
        };
        else {
            if (!externalSecMap[id].name && rowName) externalSecMap[id].name = rowName;
            if (optionalFlag !== undefined) externalSecMap[id].isOptional = externalSecMap[id].isOptional || asBoolean(optionalFlag);
            if (compulsoryFlag !== undefined && asBoolean(compulsoryFlag)) externalSecMap[id].isOptional = false;
        }
    });

    tcsState.testMeta = t;
    tcsState.discoveredMetadata = {
        pageMetadata,
        questionPayload,
        sectionPayload,
        questionCount: loadedQuestions.length,
        sectionCount: Object.keys(externalSecMap).length,
        sectionIds: Object.keys(externalSecMap)
    };
    return { loadedQuestions, externalSecMap };
}

// =========================================================
// LAUNCH TEST & FETCH ALL TEST METADATA
// =========================================================
window.launchTcsCbtEngine = async function(tKey) {
    const t = state.testMap[tKey];
    if (!t) return;

    tcsState.activeTestKey = tKey;
    tcsState.testMeta = t;
    tcsState.isSubmitted = false;
    tcsState.responses = {};
    tcsState.currentQIdx = 0;
    tcsState.activeSectionIndex = 0;
    tcsState.selectedOptionalByGroup = {};
    tcsState.allParsedSections = [];

    showSlide("slideTestAttempt");
    document.getElementById("start-screen").classList.remove("tcs-hidden");
    document.getElementById("live-test-screen").classList.add("tcs-hidden");
    document.getElementById("submit-screen").classList.add("tcs-hidden");
    document.getElementById("analysis-screen").classList.add("tcs-hidden");
    document.getElementById("solutions-screen").classList.add("tcs-hidden");
    document.getElementById("full-sol-screen").classList.add("tcs-hidden");

    const title = firstValue(t.title, t.test_title, t.name, t.test_name, "Mock Test");
    document.getElementById("tcs-start-title").textContent = title;
    const subContainer = document.getElementById("subjects-selection-container");
    subContainer.innerHTML = `<div style="text-align:center;padding:18px;font-weight:700;color:#475569">🔄 Fetching test details, subjects and questions...</div>`;

    try {
        const { loadedQuestions, externalSecMap } = await fetchQuestionsAndSectionsForMeta(t);
        tcsState.rawAllQuestions = loadedQuestions;
        const fetchedTitle = firstValue(tcsState.testMeta?.title, tcsState.testMeta?.test_title, tcsState.testMeta?.name, tcsState.testMeta?.test_name);
        if (fetchedTitle) document.getElementById("tcs-start-title").textContent = fetchedTitle;
        prepareAllSectionsAndRenderStart(externalSecMap);
    } catch (error) {
        console.error("TCS test metadata fetch failed:", error);
        subContainer.innerHTML = `<div style="padding:16px;border:1px solid #fecaca;background:#fef2f2;color:#991b1b;border-radius:12px;font-weight:700">❌ ${escapeTcsHtml(error.message || "Test data load failed")}</div>`;
        const startBtn = document.getElementById("tcs-start-btn");
        if (startBtn) startBtn.disabled = true;
    }
};

function buildParsedSectionsFromRaw(externalSecMap = {}) {
    const groups = new Map();
    tcsState.rawAllQuestions.forEach((question, index) => {
        const sectionId = getQuestionSectionId(question);
        if (!groups.has(sectionId)) groups.set(sectionId, { id: sectionId, label: "", questions: [], optional: false, group: "A" });
        const entry = groups.get(sectionId);
        entry.label = firstValue(entry.label, question.section_name, question.section_title, question.subject_name, question.subject, question.part_title, "");
        const compulsoryFlag = firstValue(question.is_compulsory, question.isCompulsory, question.compulsory, question.is_mandatory, question.mandatory);
        entry.optional = entry.optional || asBoolean(firstValue(question.is_optional, question.isOptional, question.optional, question.is_elective, compulsoryFlag !== undefined ? !asBoolean(compulsoryFlag) : undefined));
        entry.group = String(firstValue(question.optional_group, question.optionalGroup, question.choice_group, question.group_id, entry.group));
        entry.questions.push({ ...question, rawIndex: index });
    });

    const parsed = [];
    groups.forEach((entry, id) => {
        const meta = externalSecMap[id] || {};
        const name = inferSubjectFromQuestions(entry.questions, firstValue(meta.name, entry.label), id);
        const optional = Boolean(meta.isOptional || entry.optional);
        parsed.push({
            secId: id,
            name,
            questions: entry.questions,
            isExplicitOptional: optional,
            isOptional: optional,
            optGroup: String(firstValue(meta.group, entry.group, "A")),
            order: Number(meta.order) || 9999
        });
    });

    // Optional status and choice-group are taken only from fetched metadata/question fields.
    // No language rules or section-ID mappings are used to guess compulsory/optional subjects.
    parsed.sort((a, b) => a.order - b.order);
    tcsState.allParsedSections = parsed;

    const optionalGroups = new Map();
    parsed.filter(section => section.isOptional).forEach(section => {
        if (!optionalGroups.has(section.optGroup)) optionalGroups.set(section.optGroup, section);
    });
    optionalGroups.forEach((firstSection, groupKey) => {
        tcsState.selectedOptionalByGroup[groupKey] = firstSection.secId;
    });
}

function prepareAllSectionsAndRenderStart(externalSecMap) {
    buildParsedSectionsFromRaw(externalSecMap);
    const startBtn = document.getElementById("tcs-start-btn");
    if (startBtn) startBtn.disabled = false;
    renderStartScreenUI();
}

function getActiveChosenSections() {
    return tcsState.allParsedSections.filter(section => {
        if (!section.isOptional) return true;
        return String(section.secId) === String(tcsState.selectedOptionalByGroup[section.optGroup]);
    });
}

function getTestDurationMinutes(testMeta) {
    const raw = String(firstValue(testMeta.time, testMeta.duration, testMeta.duration_minutes, testMeta.total_time, "60")).trim();
    if (raw.includes("+")) return raw.split("+").reduce((sum, value) => sum + (parseFloat(value) || 0), 0);
    const value = parseFloat(raw);
    return Number.isFinite(value) && value > 0 ? value : 60;
}

function getQuestionMarks(question, key, fallback) {
    const value = parseFloat(question?.[key]);
    return Number.isFinite(value) ? value : fallback;
}

function formatMarkValue(value) {
    return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)));
}

function renderStartScreenUI() {
    const t = tcsState.testMeta || {};
    const container = document.getElementById("subjects-selection-container");
    if (!container) return;
    const fixedSections = tcsState.allParsedSections.filter(section => !section.isOptional);
    const optionalGroups = new Map();
    tcsState.allParsedSections.filter(section => section.isOptional).forEach(section => {
        if (!optionalGroups.has(section.optGroup)) optionalGroups.set(section.optGroup, []);
        optionalGroups.get(section.optGroup).push(section);
    });

    let html = `<div class="tcs-sec-heading">📚 Compulsory Subjects</div>`;
    if (fixedSections.length) {
        fixedSections.forEach(section => {
            html += `<div class="tcs-sub-row fixed-sub"><div class="tcs-sub-left"><span>✅</span><span>${escapeTcsHtml(section.name)}</span></div><span class="tcs-sub-pill">${section.questions.length} Qs</span></div>`;
        });
    } else {
        html += `<div class="tcs-sub-row fixed-sub"><span>Compulsory section metadata नहीं मिला</span></div>`;
    }

    optionalGroups.forEach((sections, groupKey) => {
        const chosenId = tcsState.selectedOptionalByGroup[groupKey];
        html += `<div class="tcs-opt-heading">📝 Optional Subject — Group ${escapeTcsHtml(groupKey)} (Select one)</div>`;
        sections.forEach(section => {
            const selected = String(section.secId) === String(chosenId);
            html += `<div class="tcs-sub-row opt-sub ${selected ? "selected" : ""}" onclick="selectOptionalSubject('${escapeTcsHtml(groupKey)}','${escapeTcsHtml(section.secId)}')"><div class="tcs-sub-left"><span>${selected ? "✓" : "◯"}</span><span>${escapeTcsHtml(section.name)}</span></div><span class="tcs-sub-pill">${section.questions.length} Qs</span></div>`;
        });
    });
    container.innerHTML = html;

    const activeSections = getActiveChosenSections();
    const activeQuestions = activeSections.flatMap(section => section.questions);
    const totalQuestions = activeQuestions.length;
    const defaultPositive = parseFloat(firstValue(t.positive_marks, t.correct_marks, t.marks_per_question, 2));
    const defaultNegative = parseFloat(firstValue(t.negative_marks, t.wrong_marks, t.negative_marking, 0.25));
    const positiveFallback = Number.isFinite(defaultPositive) ? defaultPositive : 2;
    const negativeFallback = Number.isFinite(defaultNegative) ? defaultNegative : 0.25;
    const hasQuestionWiseMarks = activeQuestions.some(q => q.positive_marks !== undefined || q.positiveMarks !== undefined || q.marks_per_question !== undefined);
    const calculatedMarks = activeQuestions.reduce((sum, question) => sum + getQuestionMarks(question, "positive_marks", positiveFallback), 0);
    const totalMarks = hasQuestionWiseMarks || !Number.isFinite(parseFloat(t.marks))
        ? calculatedMarks
        : (parseFloat(t.marks) || calculatedMarks);
    const positiveValues = [...new Set(activeQuestions.map(q => getQuestionMarks(q, "positive_marks", positiveFallback)))];
    const negativeValues = [...new Set(activeQuestions.map(q => getQuestionMarks(q, "negative_marks", negativeFallback)))];
    const markingText = positiveValues.length === 1 && negativeValues.length === 1
        ? `+${formatMarkValue(positiveValues[0])} / -${formatMarkValue(negativeValues[0])}`
        : `Mixed: +${positiveValues.map(formatMarkValue).join("/")} / -${negativeValues.map(formatMarkValue).join("/")}`;
    const minutes = getTestDurationMinutes(t);
    const rawTime = String(firstValue(t.time, t.duration, t.duration_minutes, "")).trim();
    const timingMode = rawTime.includes("+") ? "Section-wise Timing" : "Overall Timing";

    const statsBox = document.querySelector("#start-screen .stats-box");
    if (statsBox) statsBox.innerHTML = `
        <div class="start-info"><span>Total Questions:</span><span id="stat-qs">${totalQuestions}</span></div>
        <div class="start-info"><span>Total Time:</span><span id="stat-time">${minutes} mins</span></div>
        <div class="start-info"><span>Timing Mode:</span><span id="stat-mode">${timingMode}</span></div>
        <div class="start-info"><span>Maximum Marks:</span><span id="stat-marks">${formatMarkValue(totalMarks)}</span></div>
        <div class="start-info"><span>Marking Scheme:</span><span id="stat-marking">${markingText}</span></div>`;

    const startBtn = document.getElementById("tcs-start-btn");
    if (startBtn) {
        startBtn.disabled = totalQuestions === 0;
        startBtn.textContent = totalQuestions ? `Start Test (${totalQuestions} Questions)` : "Questions Unavailable";
    }
}

window.selectOptionalSubject = function(groupKey, sectionId) {
    const group = String(groupKey);
    const exists = tcsState.allParsedSections.some(section => section.isOptional && section.optGroup === group && String(section.secId) === String(sectionId));
    if (!exists) return;
    tcsState.selectedOptionalByGroup[group] = String(sectionId);
    renderStartScreenUI();
};

function populateActiveQuestionsFromChosenSections() {
    const chosenSections = getActiveChosenSections();
    const flatQuestions = [];
    tcsState.activeSections = chosenSections.map(section => {
        const mappedQuestions = section.questions.map(question => {
            const globalIndex = flatQuestions.length;
            const copy = { ...question, originalIndex: globalIndex, _sectionName: section.name };
            flatQuestions.push(copy);
            return copy;
        });
        return { secId: section.secId, name: section.name, questions: mappedQuestions };
    });
    tcsState.questions = flatQuestions;
}

// =========================================================
// STEP 2: START LIVE CBT TEST
// =========================================================
window.startTest = function() {
    const t = tcsState.testMeta || {};
    populateActiveQuestionsFromChosenSections();

    tcsState.responses = {};
    tcsState.currentQIdx = 0;
    tcsState.activeSectionIndex = 0;

    const tStr = String(firstValue(t.time, t.duration, t.duration_minutes, "60")).trim();
    if (tStr.includes("+")) {
        const parts = tStr.split("+").map(n => (parseFloat(n.trim()) || 15) * 60);
        tcsState.isSectionalTiming = true;
        tcsState.sectionTimeAllocated = tcsState.activeSections.map((_, i) => parts[i] || parts[0] || 900);
        tcsState.sectionSecondsLeft = [...tcsState.sectionTimeAllocated];
        tcsState.secondsLeft = tcsState.sectionSecondsLeft[0];
    } else {
        const totalMins = getTestDurationMinutes(t);
        tcsState.isSectionalTiming = false;
        tcsState.secondsLeft = totalMins * 60;
    }

    document.getElementById("start-screen").classList.add("tcs-hidden");
    document.getElementById("live-test-screen").classList.remove("tcs-hidden");

    const fSecInfo = document.getElementById("tcs-footer-sec-info");
    if (fSecInfo) fSecInfo.textContent = "";

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
        if (!tcsState.responses[curIdx]) {
            tcsState.responses[curIdx] = { status: "unattempted", chosenOption: null, timeSpent: 0 };
        }
        tcsState.responses[curIdx].timeSpent = (tcsState.responses[curIdx].timeSpent || 0) + 1;

        const qTimeEl = document.getElementById("tcs-q-time");
        if (qTimeEl) {
            qTimeEl.textContent = formatMMSS(tcsState.responses[curIdx].timeSpent);
        }

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
        if (tcsState.isSectionalTiming) {
            tcsState.sectionSecondsLeft[tcsState.activeSectionIndex] = tcsState.secondsLeft;
        }

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
    if (firstQInSec) {
        loadQuestion(firstQInSec.originalIndex);
    }
};

function loadQuestion(globalIdx) {
    tcsState.currentQIdx = globalIdx;
    const q = tcsState.questions[globalIdx];
    if (!q) return;

    if (!tcsState.responses[globalIdx]) {
        tcsState.responses[globalIdx] = { status: "unattempted", chosenOption: null, timeSpent: 0 };
    }

    let foundSecIdx = tcsState.activeSectionIndex;
    tcsState.activeSections.forEach((sec, sIdx) => {
        if (sec.questions.some(sq => sq.originalIndex === globalIdx)) {
            foundSecIdx = sIdx;
        }
    });
    if (foundSecIdx !== tcsState.activeSectionIndex) {
        if (tcsState.isSectionalTiming) {
            tcsState.sectionSecondsLeft[tcsState.activeSectionIndex] = tcsState.secondsLeft;
            tcsState.secondsLeft = tcsState.sectionSecondsLeft[foundSecIdx];
        }
        tcsState.activeSectionIndex = foundSecIdx;
    }
    renderTcsTabs();

    document.getElementById("tcs-q-num").textContent = globalIdx + 1;
    const qTimeEl = document.getElementById("tcs-q-time");
    if (qTimeEl) {
        qTimeEl.textContent = formatMMSS(tcsState.responses[globalIdx].timeSpent || 0);
    }

    const metaPositive = parseFloat(firstValue(tcsState.testMeta?.positive_marks, tcsState.testMeta?.correct_marks, tcsState.testMeta?.marks_per_question, 2));
    const metaNegative = parseFloat(firstValue(tcsState.testMeta?.negative_marks, tcsState.testMeta?.wrong_marks, tcsState.testMeta?.negative_marking, 0.25));
    const posNum = getQuestionMarks(q, "positive_marks", Number.isFinite(metaPositive) ? metaPositive : 2);
    const negNum = getQuestionMarks(q, "negative_marks", Number.isFinite(metaNegative) ? metaNegative : 0.25);
    document.getElementById("tcs-live-pos").textContent = `+${Number.isInteger(posNum) ? posNum : posNum.toFixed(2)}`;
    document.getElementById("tcs-live-neg").textContent = `-${Number.isInteger(negNum) ? negNum : negNum}`;

    // Update Live Test Bookmark Button State
    const qKey = `test_${(tcsState.testMeta && tcsState.testMeta.id) || tcsState.activeTestKey}_q_${q.id || globalIdx}`;
    const bmBtn = document.getElementById("tcs-bookmark-btn");
    if (bmBtn) {
        const isSaved = typeof window.isQuestionBookmarked === "function" && window.isQuestionBookmarked(qKey);
        bmBtn.textContent = isSaved ? "★ Saved" : "☆ Save";
        bmBtn.className = isSaved
            ? "px-2.5 py-1 rounded-lg bg-amber-500 text-white border border-amber-600 font-extrabold text-xs cursor-pointer"
            : "px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-300 font-extrabold text-xs cursor-pointer";
    }

    const qTxtBox = document.getElementById("tcs-q-text");
    const rawQHtml = (tcsState.lang === "hi" && (q.question_hi || q.question_hindi))
        ? (q.question_hi || q.question_hindi)
        : (q.question || q.question_text || "");
    qTxtBox.innerHTML = cleanQuestionHtml(rawQHtml);

    const optBox = document.getElementById("tcs-options-container");
    optBox.innerHTML = "";

    const resp = tcsState.responses[globalIdx] || {};
    const chosen = resp.chosenOption;
    const letters = ["A", "B", "C", "D", "E"];

    const opts = [
        { id: "1", text: q.option_1 || q.opt1 },
        { id: "2", text: q.option_2 || q.opt2 },
        { id: "3", text: q.option_3 || q.opt3 },
        { id: "4", text: q.option_4 || q.opt4 },
        q.option_5 ? { id: "5", text: q.option_5 } : null
    ].filter(Boolean);

    opts.forEach((opt, oIdx) => {
        const isSel = String(chosen) === String(opt.id);
        const selClass = isSel ? "tcs-option selected" : "tcs-option";
        const letter = letters[oIdx] || opt.id;
        optBox.innerHTML += `
            <div class="${selClass}" onclick="selectTcsOption('${opt.id}')">
                <span class="tcs-opt-letter">${letter}.</span>
                <div style="flex: 1; word-break: break-word;">${cleanQuestionHtml(opt.text || "")}</div>
            </div>`;
    });

    if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise([qTxtBox, optBox]).catch(() => {});
    }
}

window.toggleCurrentQuestionBookmark = function() {
    const q = tcsState.questions[tcsState.currentQIdx];
    if (!q) return;
    const qKey = `test_${(tcsState.testMeta && tcsState.testMeta.id) || tcsState.activeTestKey}_q_${q.id || tcsState.currentQIdx}`;
    
    const optsArr = [q.option_1 || q.opt1, q.option_2 || q.opt2, q.option_3 || q.opt3, q.option_4 || q.opt4].filter(Boolean);
    const expText = (tcsState.lang === "hi" && (q.explanation_hi || q.solution_hi))
        ? (q.explanation_hi || q.solution_hi)
        : (q.solution_text || q.explanation || q.solution || "");

    const isNowSaved = window.toggleBookmarkItem({
        qKey: qKey,
        testTitle: (tcsState.testMeta && tcsState.testMeta.title) || "Mock Test",
        subject: q._sectionName || "Subject",
        qNumber: tcsState.currentQIdx + 1,
        question: q.question || q.question_text || "",
        options: optsArr,
        answer: String(q.answer || q.correct_option || "1"),
        solution: expText
    });

    const bmBtn = document.getElementById("tcs-bookmark-btn");
    if (bmBtn) {
        bmBtn.textContent = isNowSaved ? "★ Saved" : "☆ Save";
        bmBtn.className = isNowSaved
            ? "px-2.5 py-1 rounded-lg bg-amber-500 text-white border border-amber-600 font-extrabold text-xs cursor-pointer"
            : "px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-300 font-extrabold text-xs cursor-pointer";
    }
};

window.toggleSolutionQuestionBookmark = function() {
    const q = tcsState.questions[tcsState.activeFullSolIdx];
    if (!q) return;
    const qKey = `test_${(tcsState.testMeta && tcsState.testMeta.id) || tcsState.activeTestKey}_q_${q.id || tcsState.activeFullSolIdx}`;
    
    const optsArr = [q.option_1 || q.opt1, q.option_2 || q.opt2, q.option_3 || q.opt3, q.option_4 || q.opt4].filter(Boolean);
    const expText = (tcsState.lang === "hi" && (q.explanation_hi || q.solution_hi))
        ? (q.explanation_hi || q.solution_hi)
        : (q.solution_text || q.explanation || q.solution || "");

    const isNowSaved = window.toggleBookmarkItem({
        qKey: qKey,
        testTitle: (tcsState.testMeta && tcsState.testMeta.title) || "Mock Test",
        subject: q._sectionName || "Subject",
        qNumber: tcsState.activeFullSolIdx + 1,
        question: q.question || q.question_text || "",
        options: optsArr,
        answer: String(q.answer || q.correct_option || "1"),
        solution: expText
    });

    const bmBtn = document.getElementById("fs-bookmark-btn");
    if (bmBtn) {
        bmBtn.textContent = isNowSaved ? "★ Saved" : "☆ Save";
        bmBtn.className = isNowSaved
            ? "px-2.5 py-1 rounded-lg bg-amber-500 text-white border border-amber-600 font-extrabold text-xs cursor-pointer"
            : "px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-300 font-extrabold text-xs cursor-pointer";
    }
};

window.selectTcsOption = function(optId) {
    const idx = tcsState.currentQIdx;
    const prevTime = (tcsState.responses[idx] && tcsState.responses[idx].timeSpent) || 0;
    tcsState.responses[idx] = {
        status: "attempted",
        chosenOption: optId,
        timeSpent: prevTime
    };
    loadQuestion(idx);
};

window.saveAndNext = function() {
    const idx = tcsState.currentQIdx;
    const cur = tcsState.responses[idx] || { timeSpent: 0 };
    if (cur.chosenOption) {
        cur.status = "attempted";
    } else {
        cur.status = "unattempted";
    }
    tcsState.responses[idx] = cur;
    nextQuestion();
};

window.markForReview = function() {
    const idx = tcsState.currentQIdx;
    const cur = tcsState.responses[idx] || { timeSpent: 0 };
    const hasAns = Boolean(cur.chosenOption);
    tcsState.responses[idx] = {
        ...cur,
        status: hasAns ? "marked_attempted" : "marked"
    };
    nextQuestion();
};

window.clearResponse = function() {
    const idx = tcsState.currentQIdx;
    const prevTime = (tcsState.responses[idx] && tcsState.responses[idx].timeSpent) || 0;
    tcsState.responses[idx] = { status: "unattempted", chosenOption: null, timeSpent: prevTime };
    loadQuestion(idx);
};

window.nextQuestion = function() {
    if (tcsState.currentQIdx < tcsState.questions.length - 1) {
        loadQuestion(tcsState.currentQIdx + 1);
    }
};

window.prevQuestion = function() {
    if (tcsState.currentQIdx > 0) {
        loadQuestion(tcsState.currentQIdx - 1);
    }
};

window.toggleTcsLangMode = function() {
    tcsState.lang = tcsState.lang === "en" ? "hi" : "en";
    if (!document.getElementById("live-test-screen").classList.contains("tcs-hidden")) {
        loadQuestion(tcsState.currentQIdx);
    } else if (!document.getElementById("solutions-screen").classList.contains("tcs-hidden")) {
        renderSolutionsList(tcsState.activeSolFilter);
    } else if (!document.getElementById("full-sol-screen").classList.contains("tcs-hidden")) {
        renderFullSolutionContent(tcsState.activeFullSolIdx);
    }
};

window.toggleTcsFullScreen = function() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
};

// =========================================================
// QUESTION PALETTE DRAWER
// =========================================================
window.toggleTcsPalette = function() {
    const palette = document.getElementById("tcs-palette");
    palette.classList.toggle("show");
    if (palette.classList.contains("show")) {
        renderTcsAccordionGrid();
    }
};

function renderTcsAccordionGrid() {
    const cont = document.getElementById("tcs-accordion-container");
    cont.innerHTML = "";

    tcsState.activeSections.forEach((sec, sIdx) => {
        let att = 0, una = 0, mar = 0;
        sec.questions.forEach(sq => {
            const r = tcsState.responses[sq.originalIndex];
            if (r && (r.status === "attempted" || r.status === "marked_attempted")) att++;
            else if (r && r.status === "marked") mar++;
            else una++;
        });

        let gridHtml = `<div class="tcs-q-grid open" id="grid_sec_${sIdx}">`;
        sec.questions.forEach(sq => {
            const gIdx = sq.originalIndex;
            const r = tcsState.responses[gIdx];
            let boxCls = "tcs-q-box st-not-ans";
            if (r) {
                if (r.status === "attempted") boxCls = "tcs-q-box st-ans";
                else if (r.status === "marked") boxCls = "tcs-q-box st-mark";
                else if (r.status === "marked_attempted") boxCls = "tcs-q-box st-mark-ans";
            }
            gridHtml += `<div class="${boxCls}" onclick="jumpToQuestion(${gIdx})">${gIdx + 1}</div>`;
        });
        gridHtml += `</div>`;

        cont.innerHTML += `
            <div class="tcs-accordion">
                <div class="tcs-acc-header" onclick="toggleGridSec(${sIdx})">
                    <span>${sec.name}</span>
                    <span>▼</span>
                </div>
                <div class="tcs-acc-stats">
                    <span>Attempted: ${att}</span>
                    <span>Marked: ${mar}</span>
                    <span>Unattempted: ${una}</span>
                </div>
                ${gridHtml}
            </div>`;
    });
}

window.toggleGridSec = function(sIdx) {
    const g = document.getElementById(`grid_sec_${sIdx}`);
    if (g) g.classList.toggle("open");
};

window.jumpToQuestion = function(globalIdx) {
    toggleTcsPalette();
    loadQuestion(globalIdx);
};

// =========================================================
// STEP 3: SUBMIT SUMMARY SCREEN
// =========================================================
window.handleDynamicSubmit = function() {
    prepareSubmit();
};

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
            else if (r && r.status === "marked") mar++;
            else una++;
        });

        cardsHtml += `
            <div class="section-summary-card">
                <h3 style="font-weight:800; color:#1a237e; margin-bottom:10px;">${sec.name}</h3>
                <div class="stat-row"><span>Total Questions:</span> <strong>${sec.questions.length}</strong></div>
                <div class="stat-row"><span>Attempted:</span> <strong style="color:#2563eb;">${att}</strong></div>
                <div class="stat-row"><span>Marked for Review:</span> <strong style="color:#d97706;">${mar}</strong></div>
                <div class="stat-row"><span>Unattempted:</span> <strong style="color:#64748b;">${una}</strong></div>
            </div>`;
    });

    cont.innerHTML = cardsHtml;
};

window.closeSubmit = function() {
    document.getElementById("submit-screen").classList.add("tcs-hidden");
    document.getElementById("live-test-screen").classList.remove("tcs-hidden");
};

// =========================================================
// STEP 4: RESULT & DEEP ANALYSIS SCREEN + DIRECT SCORECARD RESTORE
// =========================================================
window.submitTest = function(isRestoringSaved = false, fallbackSavedStats = null) {
    if (tcsState.timerInterval) clearInterval(tcsState.timerInterval);
    tcsState.isSubmitted = true;

    document.getElementById("start-screen").classList.add("tcs-hidden");
    document.getElementById("submit-screen").classList.add("tcs-hidden");
    document.getElementById("live-test-screen").classList.add("tcs-hidden");
    document.getElementById("solutions-screen").classList.add("tcs-hidden");
    document.getElementById("full-sol-screen").classList.add("tcs-hidden");
    document.getElementById("analysis-screen").classList.remove("tcs-hidden");

    let correct = 0, incorrect = 0, unattempted = 0, score = 0;
    let timeCorr = 0, timeInc = 0, timeUna = 0;
    let maxMarks = 0;

    const hasResponses = tcsState.responses && Object.keys(tcsState.responses).length > 0;

    tcsState.questions.forEach((q, i) => {
        const pos = getQuestionMarks(q, "positive_marks", parseFloat(firstValue(tcsState.testMeta?.positive_marks, tcsState.testMeta?.correct_marks, 2)) || 2);
        const neg = getQuestionMarks(q, "negative_marks", parseFloat(firstValue(tcsState.testMeta?.negative_marks, tcsState.testMeta?.wrong_marks, 0.25)) || 0.25);
        maxMarks += pos;

        const r = tcsState.responses[i] || {};
        const spent = r.timeSpent || 0;
        const correctAns = String(q.answer || q.correct_option || "1").trim();

        if (!r.chosenOption) {
            unattempted++;
            timeUna += spent;
        } else if (String(r.chosenOption) === correctAns) {
            correct++;
            score += pos;
            timeCorr += spent;
        } else {
            incorrect++;
            score -= neg;
            timeInc += spent;
        }
    });

    score = parseFloat(score.toFixed(2));
    maxMarks = Math.round(maxMarks);

    // If restoring an older attempt that only saved summary numbers before responses snapshot was added
    if (isRestoringSaved && !hasResponses && fallbackSavedStats) {
        score = fallbackSavedStats.score ?? score;
        maxMarks = fallbackSavedStats.maxMarks ?? maxMarks;
        correct = fallbackSavedStats.correct ?? correct;
        incorrect = fallbackSavedStats.incorrect ?? incorrect;
        unattempted = fallbackSavedStats.unattempted ?? unattempted;
        timeCorr = fallbackSavedStats.timeCorr ?? timeCorr;
        timeInc = fallbackSavedStats.timeInc ?? timeInc;
        timeUna = fallbackSavedStats.timeUna ?? timeUna;
    }

    const accuracy = (correct + incorrect) > 0 ? Math.round((correct / (correct + incorrect)) * 100) : 0;

    // SAVE FULL ATTEMPT SNAPSHOT TO PERMANENT STORAGE WHEN SUBMITTING A LIVE TEST
    if (!isRestoringSaved && typeof window.recordUserTestAttempt === "function") {
        const testId = (tcsState.testMeta && tcsState.testMeta.id) || tcsState.activeTestKey;
        window.recordUserTestAttempt(testId, {
            testKey: tcsState.activeTestKey,
            title: (tcsState.testMeta && tcsState.testMeta.title) || "Mock Test",
            seriesId: (tcsState.testMeta && tcsState.testMeta.seriesId) || state.activeSeriesId || "",
            seriesTitle: state.activeSeriesTitle || "Paid Test Series",
            score: score,
            maxMarks: maxMarks,
            correct: correct,
            incorrect: incorrect,
            unattempted: unattempted,
            accuracy: accuracy,
            timeCorr: timeCorr,
            timeInc: timeInc,
            timeUna: timeUna,
            testMeta: tcsState.testMeta,
            responses: tcsState.responses,
            selectedOptionalByGroup: tcsState.selectedOptionalByGroup,
            activeSectionsSnapshot: tcsState.activeSections,
            questionsSnapshot: tcsState.questions
        });
    }

    document.getElementById("res-score").textContent = `${score}/${maxMarks}`;
    document.getElementById("res-correct").textContent = correct;
    document.getElementById("res-incorrect").textContent = incorrect;
    document.getElementById("res-unatt").textContent = unattempted;
    document.getElementById("res-acc").textContent = `${accuracy}%`;
    document.getElementById("res-rank").textContent = score >= maxMarks * 0.75 ? "#12" : "#148";
    document.getElementById("res-perc").textContent = `${Math.min(99.8, Math.max(15, (score / (maxMarks || 1)) * 100 + 12)).toFixed(1)}%`;

    document.getElementById("cmp-score").textContent = score;
    document.getElementById("cmp-top").textContent = (maxMarks * 0.88).toFixed(1);
    document.getElementById("cmp-avg").textContent = (maxMarks * 0.48).toFixed(1);
    document.getElementById("cmp-acc").textContent = `${accuracy}%`;
    document.getElementById("cmp-c").textContent = correct;
    document.getElementById("cmp-top-c").textContent = Math.round(tcsState.questions.length * 0.9);
    document.getElementById("cmp-avg-c").textContent = Math.round(tcsState.questions.length * 0.52);
    document.getElementById("cmp-w").textContent = incorrect;
    document.getElementById("cmp-top-w").textContent = Math.round(tcsState.questions.length * 0.04);
    document.getElementById("cmp-avg-w").textContent = Math.round(tcsState.questions.length * 0.18);

    const totalQ = tcsState.questions.length || (correct + incorrect + unattempted) || 1;
    const cDeg = (correct / totalQ) * 360;
    const wDeg = cDeg + (incorrect / totalQ) * 360;
    const donut = document.getElementById("res-donut");
    if (donut) {
        donut.style.background = `conic-gradient(#4caf50 0deg ${cDeg}deg, #e53935 ${cDeg}deg ${wDeg}deg, #5c6bc0 ${wDeg}deg 360deg)`;
    }

    document.getElementById("ts-box-corr").innerHTML = `Correct<br>${formatMMSS(timeCorr)}`;
    document.getElementById("ts-box-una").innerHTML = `Unattempted: ${formatMMSS(timeUna)}`;
    document.getElementById("ts-box-inc").innerHTML = `Incorrect<br>${formatMMSS(timeInc)}`;

    const rem = document.getElementById("dynamic-remark");
    if (rem) {
        rem.style.display = "block";
        if (accuracy >= 80 && correct > 0) {
            rem.className = "remark-banner rem-excellent";
            rem.textContent = "🎉 Excellent Performance! Keep it up!";
        } else if (accuracy >= 50 && correct > 0) {
            rem.className = "remark-banner rem-great";
            rem.textContent = "👍 Good Attempt! Practice more to reach the top.";
        } else {
            rem.className = "remark-banner rem-poor";
            rem.textContent = "⚠️ Needs Improvement! Review full solutions carefully.";
        }
    }

    const sCont = document.getElementById("analysis-sections-container");
    sCont.innerHTML = "";
    tcsState.activeSections.forEach(sec => {
        let sCorr = 0, sInc = 0, sUna = 0, sScore = 0;
        let stCorr = 0, stInc = 0, stUna = 0;

        sec.questions.forEach(sq => {
            const r = tcsState.responses[sq.originalIndex] || {};
            const ans = String(sq.answer || sq.correct_option || "1").trim();
            const pos = parseFloat(sq.positive_marks || 2.0);
            const neg = parseFloat(sq.negative_marks || 0.25);
            const sp = r.timeSpent || 0;

            if (!r.chosenOption) {
                sUna++;
                stUna += sp;
            } else if (String(r.chosenOption) === ans) {
                sCorr++;
                sScore += pos;
                stCorr += sp;
            } else {
                sInc++;
                sScore -= neg;
                stInc += sp;
            }
        });

        // If older attempt without per-question response map and single section
        if (isRestoringSaved && !hasResponses && tcsState.activeSections.length === 1 && fallbackSavedStats) {
            sCorr = correct;
            sInc = incorrect;
            sUna = unattempted;
            sScore = score;
        }

        sCont.innerHTML += `
            <div class="a-card">
                <div class="subj-header">
                    <div class="subj-name">${sec.name}</div>
                    <div class="black-circle"><span>Score</span><span>${sScore.toFixed(1)}</span></div>
                </div>
                <div class="subj-q-stats">Total Questions: ${sec.questions.length}</div>
                <div class="time-split">
                    <div class="col"><div class="c-green">Correct</div><div class="val-num">${sCorr}</div><div class="val-time">${formatMMSS(stCorr)}</div></div>
                    <div class="col"><div class="c-red">Incorrect</div><div class="val-num">${sInc}</div><div class="val-time">${formatMMSS(stInc)}</div></div>
                    <div class="col"><div class="c-grey">Unattempted</div><div class="val-num">${sUna}</div><div class="val-time">${formatMMSS(stUna)}</div></div>
                </div>
            </div>`;
    });
};

// DIRECTLY OPEN SAVED SCORECARD & FULL SOLUTIONS FROM CARD BUTTON OR RECENT ATTEMPTS LIST
window.openSavedTcsScorecard = async function(testId, tKey, savedRecord) {
    const resolvedKey = tKey || savedRecord.testKey || `test_${testId}`;
    const meta = state.testMap[resolvedKey] || savedRecord.testMeta || {
        id: testId,
        title: savedRecord.title || `Test #${testId}`
    };

    state.testMap[resolvedKey] = meta;
    tcsState.activeTestKey = resolvedKey;
    tcsState.testMeta = meta;
    tcsState.responses = savedRecord.responses || {};
    tcsState.selectedOptionalByGroup = savedRecord.selectedOptionalByGroup || {};
    tcsState.isSubmitted = true;

    showSlide("slideTestAttempt");

    if (
        Array.isArray(savedRecord.questionsSnapshot) &&
        savedRecord.questionsSnapshot.length > 0 &&
        Array.isArray(savedRecord.activeSectionsSnapshot) &&
        savedRecord.activeSectionsSnapshot.length > 0
    ) {
        tcsState.questions = savedRecord.questionsSnapshot;
        tcsState.activeSections = savedRecord.activeSectionsSnapshot;
        window.submitTest(true, savedRecord);
        return;
    }

    // Fallback: Fetch questions live if snapshot wasn't stored in an older attempt
    const { loadedQuestions, externalSecMap } = await fetchQuestionsAndSectionsForMeta(meta);
    tcsState.rawAllQuestions = loadedQuestions;
    buildParsedSectionsFromRaw(externalSecMap);
    if (savedRecord.selectedOptionalByGroup && typeof savedRecord.selectedOptionalByGroup === "object") {
        Object.assign(tcsState.selectedOptionalByGroup, savedRecord.selectedOptionalByGroup);
    }
    populateActiveQuestionsFromChosenSections();
    window.submitTest(true, savedRecord);
};

window.reAttemptTcsTest = function() {
    window.launchTcsCbtEngine(tcsState.activeTestKey);
};

window.exitTcsTest = function() {
    if (tcsState.timerInterval) clearInterval(tcsState.timerInterval);
    showSlide("slideExplorer");
};

// =========================================================
// STEP 5: SOLUTIONS LIST SCREEN
// =========================================================
window.openSolutions = function() {
    document.getElementById("analysis-screen").classList.add("tcs-hidden");
    document.getElementById("solutions-screen").classList.remove("tcs-hidden");
    tcsState.activeSolFilter = "all";
    renderSolutionsList("all");
};

window.closeSolutions = function() {
    document.getElementById("solutions-screen").classList.add("tcs-hidden");
    document.getElementById("analysis-screen").classList.remove("tcs-hidden");
};

window.filterSol = function(filterType, btnEl) {
    document.querySelectorAll(".flt-btn").forEach(b => b.classList.remove("flt-active"));
    if (btnEl) btnEl.classList.add("flt-active");
    tcsState.activeSolFilter = filterType;
    renderSolutionsList(filterType);
};

function renderSolutionsList(filter) {
    const cont = document.getElementById("sol-list-container");
    cont.innerHTML = "";

    tcsState.questions.forEach((q, idx) => {
        const r = tcsState.responses[idx];
        const correctAns = String(q.answer || q.correct_option || "1").trim();
        const hasChosen = r && r.chosenOption;
        const isCorr = hasChosen && String(r.chosenOption) === correctAns;
        const isInc = hasChosen && !isCorr;
        const isUna = !hasChosen;

        if (filter === "correct" && !isCorr) return;
        if (filter === "incorrect" && !isInc) return;
        if (filter === "unattempted" && !isUna) return;

        let badgeClass = "st-una", iconHtml = "−";
        if (isCorr) { badgeClass = "st-corr"; iconHtml = "✓"; }
        else if (isInc) { badgeClass = "st-wr"; iconHtml = "✕"; }

        const qText = (tcsState.lang === "hi" && (q.question_hi || q.question_hindi))
            ? (q.question_hi || q.question_hindi)
            : (q.question || q.question_text || "");

        cont.innerHTML += `
            <div class="sol-item" onclick="openFullSolution(${idx})" style="cursor:pointer;">
                <div class="sol-num-col">
                    <div class="sol-num">${idx + 1}
                        <div class="sol-status-icon ${badgeClass}">${iconHtml}</div>
                    </div>
                    <div class="sol-line"></div>
                </div>
                <div class="sol-card">
                    <span class="sol-sec-badge">${q._sectionName || "General"}</span>
                    <div class="sol-q-txt">${cleanQuestionHtml(qText)}</div>
                    <div style="font-size:12px; font-weight:800; color:#1a237e;">View Full Solution ➔</div>
                </div>
            </div>`;
    });

    if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise([cont]).catch(() => {});
    }
}

// =========================================================
// STEP 6: FULL SOLUTION SCREEN
// =========================================================
window.openFullSolution = function(idx) {
    tcsState.activeFullSolIdx = idx;
    document.getElementById("solutions-screen").classList.add("tcs-hidden");
    document.getElementById("full-sol-screen").classList.remove("tcs-hidden");
    renderFullSolutionContent(idx);
};

function renderFullSolutionContent(idx) {
    const q = tcsState.questions[idx];
    if (!q) return;
    const r = tcsState.responses[idx] || {};
    const correctAns = String(q.answer || q.correct_option || "1").trim();

    document.getElementById("fs-q-num").textContent = `Question ${idx + 1} (${q._sectionName || ""})`;
    const tcBox = document.getElementById("fs-q-time-compare");
    if (tcBox) {
        tcBox.innerHTML = `<span class="time-compare-badge"><span class="tc-you">⏱️ You: ${formatMMSS(r.timeSpent || 0)}</span></span>`;
    }

    const qKey = `test_${(tcsState.testMeta && tcsState.testMeta.id) || tcsState.activeTestKey}_q_${q.id || idx}`;
    const bmBtn = document.getElementById("fs-bookmark-btn");
    if (bmBtn) {
        const isSaved = typeof window.isQuestionBookmarked === "function" && window.isQuestionBookmarked(qKey);
        bmBtn.textContent = isSaved ? "★ Saved" : "☆ Save";
        bmBtn.className = isSaved
            ? "px-2.5 py-1 rounded-lg bg-amber-500 text-white border border-amber-600 font-extrabold text-xs cursor-pointer"
            : "px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-300 font-extrabold text-xs cursor-pointer";
    }

    const qTxt = (tcsState.lang === "hi" && (q.question_hi || q.question_hindi))
        ? (q.question_hi || q.question_hindi)
        : (q.question || q.question_text || "");
    document.getElementById("fs-q-txt").innerHTML = cleanQuestionHtml(qTxt);

    const optBox = document.getElementById("fs-options-container");
    optBox.innerHTML = "";
    const letters = ["A", "B", "C", "D", "E"];

    const opts = [
        { id: "1", text: q.option_1 || q.opt1 },
        { id: "2", text: q.option_2 || q.opt2 },
        { id: "3", text: q.option_3 || q.opt3 },
        { id: "4", text: q.option_4 || q.opt4 },
        q.option_5 ? { id: "5", text: q.option_5 } : null
    ].filter(Boolean);

    opts.forEach((opt, oIdx) => {
        const isCorrectOpt = String(opt.id) === correctAns;
        const isUserChosen = r.chosenOption && String(r.chosenOption) === String(opt.id);

        let cls = "fs-opt";
        if (isCorrectOpt) cls = "fs-opt correct";
        else if (isUserChosen && !isCorrectOpt) cls = "fs-opt wrong";

        optBox.innerHTML += `
            <div class="${cls}">
                <div style="display:flex; align-items:flex-start; gap:10px;">
                    <strong style="color:#1a237e;">${letters[oIdx] || opt.id}.</strong>
                    <div>${cleanQuestionHtml(opt.text || "")}</div>
                </div>
                ${isCorrectOpt ? `<span class="fs-opt-perc">✓ Correct</span>` : ""}
                ${isUserChosen && !isCorrectOpt ? `<span style="font-size:11px;font-weight:800;color:#c62828;">✗ Your Ans</span>` : ""}
            </div>`;
    });

    const expText = (tcsState.lang === "hi" && (q.explanation_hi || q.solution_hi))
        ? (q.explanation_hi || q.solution_hi)
        : (q.solution_text || q.explanation || q.solution || "Detailed solution above.");
    document.getElementById("fs-exp-text").innerHTML = cleanQuestionHtml(expText);

    if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise([document.getElementById("full-sol-screen")]).catch(() => {});
    }
}

window.closeFullSol = function() {
    document.getElementById("full-sol-screen").classList.add("tcs-hidden");
    document.getElementById("solutions-screen").classList.remove("tcs-hidden");
};

window.nextFullSol = function() {
    if (tcsState.activeFullSolIdx < tcsState.questions.length - 1) {
        tcsState.activeFullSolIdx++;
        renderFullSolutionContent(tcsState.activeFullSolIdx);
    }
};

window.prevFullSol = function() {
    if (tcsState.activeFullSolIdx > 0) {
        tcsState.activeFullSolIdx--;
        renderFullSolutionContent(tcsState.activeFullSolIdx);
    }
};
