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
    allParsedSections: [],
    selectedOptionalByGroup: {},
    activeSections: [],
    questions: [],
    currentQIdx: 0,
    responses: {},
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
    if (typeof value === "boolean") return value;
    if (typeof value === "number") return value !== 0;
    if (typeof value === "string") {
        const v = value.trim().toLowerCase();
        if (["1", "true", "yes", "y", "required", "compulsory", "mandatory"].includes(v)) return true;
        if (["0", "false", "no", "n", "optional", "not_required"].includes(v)) return false;
    }
    return null;
}

function normalizeTcsName(value, fallback = "") {
    const text = stripHtmlText(value || "").replace(/\s+/g, " ").trim();
    return text || fallback;
}

function parseTcsNumber(value, fallback = 0) {
    if (value === undefined || value === null || value === "") return fallback;
    const n = Number(String(value).replace(/,/g, "").trim());
    return Number.isFinite(n) ? n : fallback;
}

function getTcsTestId(meta = {}) {
    return firstValue(meta.testId, meta.test_id, meta.testid, meta.id, meta.test);
}

function getTcsSeriesId(meta = {}) {
    return firstValue(meta.seriesId, meta.series_id, meta.test_series_id, meta.series, meta.category_id);
}

function getNextDataBuildId() {
    const nextData = window.__NEXT_DATA__;
    if (nextData && nextData.buildId) return nextData.buildId;

    const script = document.getElementById("__NEXT_DATA__");
    if (script) {
        try {
            const parsed = JSON.parse(script.textContent || "{}");
            if (parsed.buildId) return parsed.buildId;
        } catch (_) {}
    }
    return "";
}

function getTcsRouteContext(testMeta = {}) {
    const params = new URLSearchParams(window.location.search);
    const pathMatch = window.location.pathname.match(/\/test-series\/([^/]+)\/([^/]+)\/([^/]+)\/([^/]+)/i);
    const seriesId = firstValue(
        getTcsSeriesId(testMeta),
        pathMatch && pathMatch[1],
        params.get("id")
    );
    const testId = firstValue(
        getTcsTestId(testMeta),
        pathMatch && pathMatch[4],
        params.get("testId")
    );
    const buildId = firstValue(
        testMeta.next_build_id,
        testMeta.buildId,
        getNextDataBuildId()
    );
    const sourceUrl = firstValue(
        testMeta.source_url,
        testMeta.page_url,
        testMeta.test_url,
        window.location.href
    );

    let sourceOrigin = window.location.origin;
    try {
        sourceOrigin = new URL(sourceUrl, window.location.href).origin;
    } catch (_) {}

    return { seriesId, testId, buildId, sourceUrl, sourceOrigin };
}

function getTcsPageDataUrls(testMeta = {}) {
    const ctx = getTcsRouteContext(testMeta);
    const explicitTerms = firstValue(
        testMeta.terms_json_url,
        testMeta.termsJsonUrl,
        testMeta.terms_url
    );
    const explicitAttempt = firstValue(
        testMeta.attempt_json_url,
        testMeta.attemptJsonUrl,
        testMeta.attempt_url
    );

    let route = "";
    try {
        route = new URL(ctx.sourceUrl, window.location.href).pathname;
    } catch (_) {
        route = window.location.pathname;
    }

    const routeMatch = route.match(/^(.*\/test-series\/[^/]+\/[^/]+\/[^/]+\/[^/]+)\/?$/i);
    const pagePath = routeMatch ? routeMatch[1] : route.replace(/\/$/, "");
    const base = ctx.buildId
        ? `${ctx.sourceOrigin}/_next/data/${encodeURIComponent(ctx.buildId)}${pagePath}`
        : "";

    return {
        context: ctx,
        termsUrl: explicitTerms || (base ? `${base}/terms.json?testPassUrl=&id=${encodeURIComponent(ctx.seriesId || "")}&testId=${encodeURIComponent(ctx.testId || "")}` : ""),
        attemptUrl: explicitAttempt || (base ? `${base}/attempt.json?id=${encodeURIComponent(ctx.seriesId || "")}&testId=${encodeURIComponent(ctx.testId || "")}` : "")
    };
}

async function fetchTcsJson(url, options = {}) {
    if (!url) return null;

    const requestOptions = {
        method: "GET",
        credentials: "include",
        cache: "no-store",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "x-nextjs-data": "1",
            ...(options.headers || {})
        },
        ...options
    };

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (directError) {
        const proxy = window.WORKER_RAW_PROXY || window.TCS_METADATA_PROXY || "";
        if (!proxy) throw directError;

        const proxyUrl = `${proxy}${proxy.includes("?") ? "&" : "?"}url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl, {
            method: "GET",
            credentials: "omit",
            cache: "no-store",
            headers: { "Accept": "application/json, text/plain, */*" }
        });
        if (!response.ok) throw new Error(`Metadata proxy HTTP ${response.status}`);
        return await response.json();
    }
}

function unwrapTcsPageData(payload) {
    if (!payload || typeof payload !== "object") return {};
    if (payload.pageProps && typeof payload.pageProps === "object") return payload.pageProps;
    if (payload.data && payload.data.pageProps) return payload.data.pageProps;
    return payload;
}

async function fetchTcsPageMetadata(testMeta = {}) {
    const urls = getTcsPageDataUrls(testMeta);
    const result = {
        terms: null,
        attempt: null,
        test: null,
        sections: [],
        subjects: [],
        urls,
        errors: []
    };

    const requests = [
        ["terms", urls.termsUrl],
        ["attempt", urls.attemptUrl]
    ];

    await Promise.all(requests.map(async ([key, url]) => {
        if (!url) return;
        try {
            result[key] = await fetchTcsJson(url);
        } catch (error) {
            result.errors.push({ source: key, message: error.message || String(error) });
        }
    }));

    const termsProps = unwrapTcsPageData(result.terms);
    const attemptProps = unwrapTcsPageData(result.attempt);
    const termsTest = termsProps.test || termsProps.test_data || {};
    const attemptTest = attemptProps.test || attemptProps.test_data || {};

    result.test = { ...termsTest, ...attemptTest };

    const sectionCandidates = [
        termsProps.sections, termsProps.section, termsProps.section_data,
        attemptProps.sections, attemptProps.section, attemptProps.section_data,
        result.test.sections, result.test.section_data
    ];

    for (const candidate of sectionCandidates) {
        if (Array.isArray(candidate)) result.sections.push(...candidate);
        else if (candidate && typeof candidate === "object") {
            result.sections.push(...Object.values(candidate));
        }
    }

    const subjectCandidates = [
        termsProps.subjects, termsProps.subject, termsProps.subject_data,
        attemptProps.subjects, attemptProps.subject, attemptProps.subject_data,
        result.test.subjects, result.test.subject_data
    ];

    for (const candidate of subjectCandidates) {
        if (Array.isArray(candidate)) result.subjects.push(...candidate);
        else if (candidate && typeof candidate === "object") {
            result.subjects.push(...Object.values(candidate));
        }
    }

    return result;
}

function getQuestionSectionId(q) {
    return String(firstValue(
        q.section_id, q.sectionId, q.section, q.sectionID,
        q.subject_id, q.subjectId, q.subjectid,
        q.section_name, q.subject_title, q.subject
    ) || "unassigned");
}

function getSectionNameFromRecord(record, fallback = "") {
    if (!record || typeof record !== "object") return normalizeTcsName(record, fallback);
    return normalizeTcsName(firstValue(
        record.section_name, record.section_title, record.subject_title,
        record.subject_name, record.title, record.name, record.label,
        record.section, record.subject
    ), fallback);
}

function getSectionRequiredFlag(record) {
    if (!record || typeof record !== "object") return null;
    return firstValue(
        asBoolean(record.is_compulsory),
        asBoolean(record.compulsory),
        asBoolean(record.is_mandatory),
        asBoolean(record.mandatory),
        asBoolean(record.required),
        asBoolean(record.is_required),
        asBoolean(record.is_optional) === null ? null : !asBoolean(record.is_optional)
    );
}

function getOptionalGroupKey(record) {
    if (!record || typeof record !== "object") return "";
    return String(firstValue(
        record.optional_group_id,
        record.optional_group,
        record.group_id,
        record.group,
        record.choice_group_id,
        record.choice_group
    ) || "");
}

function normalizeTcsSectionRecord(record, index = 0) {
    const id = String(firstValue(
        record && record.section_id,
        record && record.sectionId,
        record && record.subject_id,
        record && record.id,
        record && record.value
    ) || `section_${index + 1}`);

    const name = getSectionNameFromRecord(record, `Section ${index + 1}`);
    const required = getSectionRequiredFlag(record);
    const group = getOptionalGroupKey(record);

    return {
        id,
        name,
        required,
        optional: required === null ? null : !required,
        group,
        questionCount: parseTcsNumber(firstValue(
            record && record.question_count,
            record && record.total_questions,
            record && record.questions_count,
            record && record.no_of_questions
        ), 0),
        time: firstValue(record && record.time, record && record.duration, record && record.section_time),
        positiveMarks: firstValue(record && record.positive_marks, record && record.marks_per_question),
        negativeMarks: firstValue(record && record.negative_marks, record && record.negative_marking),
        raw: record
    };
}

function mergeTcsSectionMetadata(questionRows, sectionRows = []) {
    const map = new Map();

    sectionRows.forEach((row, index) => {
        const normalized = normalizeTcsSectionRecord(row, index);
        map.set(normalized.id, normalized);
    });

    questionRows.forEach((q, index) => {
        const id = getQuestionSectionId(q);
        const existing = map.get(id) || {
            id,
            name: "",
            required: null,
            optional: null,
            group: "",
            questionCount: 0,
            time: null,
            positiveMarks: null,
            negativeMarks: null,
            raw: null
        };

        const qRequired = getSectionRequiredFlag(q);
        if (existing.required === null && qRequired !== null) {
            existing.required = qRequired;
            existing.optional = !qRequired;
        }

        if (!existing.group) existing.group = getOptionalGroupKey(q);
        if (!existing.name) {
            existing.name = normalizeTcsName(firstValue(
                q.section_title, q.section_name, q.subject_title,
                q.subject_name, q.section, q.subject
            ), `Section ${map.size}`);
        }

        existing.questionCount++;
        map.set(id, existing);
    });

    return Array.from(map.values()).filter(section => section.id);
}

function parseTcsTiming(testMeta = {}, sections = []) {
    const rawTime = firstValue(
        testMeta.time,
        testMeta.duration,
        testMeta.total_time,
        testMeta.test_duration,
        testMeta.time_limit
    );

    const sectionTimes = String(rawTime || "").split(/[+,|]/).map(v => parseTcsNumber(v, NaN));
    const validSectionTimes = sectionTimes.length > 1 && sectionTimes.every(Number.isFinite);

    if (validSectionTimes) {
        return {
            sectional: true,
            totalSeconds: sectionTimes.reduce((sum, value) => sum + value * 60, 0),
            sectionSeconds: sectionTimes.map(value => value * 60)
        };
    }

    const totalMinutes = parseTcsNumber(rawTime, 0);
    const declaredSections = sections.length || 1;
    return {
        sectional: false,
        totalSeconds: totalMinutes * 60,
        sectionSeconds: Array(declaredSections).fill(0)
    };
}

function getTcsMarkingDefaults(testMeta = {}) {
    return {
        positive: parseTcsNumber(firstValue(
            testMeta.positive_marks,
            testMeta.positive_mark,
            testMeta.marks_per_question,
            testMeta.correct_marks
        ), 0),
        negative: parseTcsNumber(firstValue(
            testMeta.negative_marks,
            testMeta.negative_mark,
            testMeta.negative_marking,
            testMeta.wrong_marks
        ), 0)
    };
}

function getTcsQuestionMarks(question, testMeta = {}) {
    const defaults = getTcsMarkingDefaults(testMeta);
    return {
        positive: parseTcsNumber(firstValue(
            question.positive_marks,
            question.positive_mark,
            question.marks,
            question.correct_marks
        ), defaults.positive),
        negative: parseTcsNumber(firstValue(
            question.negative_marks,
            question.negative_mark,
            question.wrong_marks
        ), defaults.negative)
    };
}

function normalizeTcsQuestion(row, index, testMeta = {}) {
    const q = { ...row };
    q.id = firstValue(q.id, q.question_id, q.questionId, index + 1);
    q._sectionId = getQuestionSectionId(q);
    q._positiveMarks = getTcsQuestionMarks(q, testMeta).positive;
    q._negativeMarks = getTcsQuestionMarks(q, testMeta).negative;
    q._questionIndex = index;
    return q;
}

function getTcsQuestionArray(payload) {
    if (Array.isArray(payload)) return payload;
    if (!payload || typeof payload !== "object") return [];

    const candidates = [
        payload.questions,
        payload.data,
        payload.test_questions,
        payload.question_list,
        payload.questionList,
        payload.result,
        payload.rows
    ];

    for (const candidate of candidates) {
        if (Array.isArray(candidate)) return candidate;
        if (candidate && typeof candidate === "object") {
            for (const nested of ["questions", "data", "rows", "items"]) {
                if (Array.isArray(candidate[nested])) return candidate[nested];
            }
        }
    }

    return [];
}

async function fetchTcsQuestionAsset(url) {
    if (!url) throw new Error("Test question JSON URL is missing.");

    const response = await fetch(url, {
        method: "GET",
        credentials: "omit",
        cache: "no-store",
        headers: { "Accept": "application/json, text/plain, */*" }
    });

    if (!response.ok) throw new Error(`Question JSON HTTP ${response.status}`);
    const payload = await response.json();
    return getTcsQuestionArray(payload);
}

async function fetchQuestionsAndSectionsForMeta(testMeta = {}) {
    const pageMetadata = await fetchTcsPageMetadata(testMeta);
    const mergedTestMeta = { ...(testMeta || {}), ...(pageMetadata.test || {}) };
    const questionUrl = firstValue(
        mergedTestMeta.test_questions_url,
        mergedTestMeta.questions_url,
        mergedTestMeta.question_json_url,
        mergedTestMeta.question_url,
        mergedTestMeta.testQuestionsUrl
    );

    if (!questionUrl) {
        const errors = pageMetadata.errors.map(item => `${item.source}: ${item.message}`).join("; ");
        throw new Error(`Question JSON URL was not found.${errors ? " " + errors : ""}`);
    }

    const rows = await fetchTcsQuestionAsset(questionUrl);
    const normalizedRows = rows.map((row, index) => normalizeTcsQuestion(row, index, mergedTestMeta));
    const sections = mergeTcsSectionMetadata(normalizedRows, pageMetadata.sections);

    tcsState.discoveredMetadata = {
        pageMetadata,
        test: mergedTestMeta,
        questionUrl,
        sectionIds: sections.map(section => section.id),
        sections,
        timing: parseTcsTiming(mergedTestMeta, sections),
        marking: getTcsMarkingDefaults(mergedTestMeta)
    };

    tcsState.testMeta = mergedTestMeta;
    return {
        loadedQuestions: normalizedRows,
        externalSecMap: sections,
        pageMetadata,
        testMeta: mergedTestMeta
    };
}
