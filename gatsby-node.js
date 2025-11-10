require("dotenv").config();
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.GATSBY_SUPABASE_URL;
const supabaseKey = process.env.GATSBY_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  });
};

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  // ESMパッケージは動的import
  const camelcaseKeys = (await import("camelcase-keys")).default;

  const { data, error } = await supabase
    .from("questions")
    .select(`*,subjects:subject (id,subject)`)
    .order("index", { ascending: true });

  if (error) throw error;
  if (!data) throw new Error("questionsが取得できませんでした。");

  const questions = camelcaseKeys(data, { deep: true });

  // examtype+year+monthごとにグループ化
  const grouped = {};
  questions.forEach((q) => {
    const key = `${String(q.examType).padEnd(2, "0")}${q.year}${String(
      q.month
    ).padStart(2, "0")}`; // 例: 202504
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(q);
  });

  // 各グループでページ生成
  Object.entries(grouped).forEach(([key, questions]) => {
    // 年月ごとのページ
    createPage({
      path: `/questions/${key}`,
      component: path.resolve(`./src/templates/questionsTemplate.tsx`),
      context: {
        year: questions[0].year,
        month: questions[0].month,
        questions,
        type: "yearMonth",
        subjectId: null,
      },
    });
  });

  questions.forEach((question, index) => {
    const prevUid = index > 0 ? questions[index - 1].questionId : null;
    const nextUid =
      index < questions.length - 1 ? questions[index + 1].questionId : null;

    createPage({
      path: `/question/${question.questionId}`,
      component: path.resolve(`./src/templates/questionTemplate.tsx`),
      context: {
        question,
        prevUid,
        nextUid,
      },
    });
  });

  // subject.idごとにグループ化
  const subjectGrouped = {};
  questions.forEach((q) => {
    const key = q.subjects.id;
    if (!subjectGrouped[key]) subjectGrouped[key] = [];
    subjectGrouped[key].push(q);
  });

  // 各ジャンルでページ生成
  Object.entries(subjectGrouped).forEach(([subjectId, questions]) => {
    // ジャンルごとのページ
    createPage({
      path: `/subject/${subjectId}`,
      component: path.resolve(`./src/templates/questionsTemplate.tsx`),
      context: {
        subjectId: subjectId,
        questions: questions,
        type: "subject",
      },
    });
  });
};
