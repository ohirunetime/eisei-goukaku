import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Link } from "gatsby"
import Layout from "@/components/layout/Layout"
import * as styles from "./question.module.scss";
import eyeOpenSvg from "@/images/question/eye-open.svg"
import eyeCloseSvg from "@/images/question/eye-close.svg"
import starYellowSvg from "@/images/question/star-yellow.svg"
import starWhiteSvg from "@/images/question/star-white.svg"
import circleGreenSvg from "@/images/question/circle-green.svg"
import closeRedSvg from "@/images/question/close-red.svg"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useAuth } from "@/contexts/AuthContext";


import { ANSWER_STATE, type AnswerState } from '@/constants/answer';
import parse from 'html-react-parser'
import sanitizeHtml from 'sanitize-html'


type QuestionPageContext = {
  prevUid: number | null,
  nextUid: number | null,

  question: {
    uid: string;
    period: number;
    month: number;
    index: number;
    subject: string;
    questionText: string;
    choice1: string;
    explanation1: string;
    choice2: string;
    explanation2: string;
    choice3: string;
    explanation3: string;
    choice4: string;
    explanation4: string;
    choice5: string;
    explanation5: string;
    correctChoice: number;
  };
};

const IndexPage: React.FC<PageProps<{}, QuestionPageContext>> = ({ pageContext }) => {
  const question = pageContext.question;
  const nextUid = pageContext.nextUid;
  const {user} = useAuth();


  if (!question) return <div>データがありません</div>;

  // 型安全にアクセスするために選択肢を配列に集める
  const choices = [
    [
      question.choice1,
      question.explanation1,
    ],
    [
      question.choice2,
      question.explanation2,
    ],
    [
      question.choice3,
      question.explanation3,
    ],
    [

      question.choice4,
      question.explanation4,
    ],
    [
      question.choice5,
      question.explanation5,
    ],
  ];

  const [selectedChoiceIndex, setSelected] = React.useState<number | null>(null);
  const [hiddenChoiceIndices, setHiddenChoices] = React.useState<number[]>([]);
  const [answerState, setAnswerState] = React.useState<AnswerState>(ANSWER_STATE.UNANSWERED);
  const [understandingRating, setSelectedStar] = React.useState<number | null>(null);
  const [showResultAnimation, setShowResultAnimation] = React.useState<null | "correct" | "incorrect">(null);

  const [isAnimationFinished, setIsAnimationFinished] = React.useState(false);

  // 選択肢のセレクト状態
  const handleChoiceSelect = (choiceIndex: number) => {
    setSelected(prev => (prev == choiceIndex ? null : choiceIndex));
    setHiddenChoices(prev =>
      prev.includes(choiceIndex) ? prev.filter(i => i !== choiceIndex) : prev
    )
  }

  // 各選択肢の打ち消し線を管理
  const handleChoiceVisibilityToggle = (choiceIndex: number) => {
    setHiddenChoices(prev =>
      prev.includes(choiceIndex) ? prev.filter(i => i !== choiceIndex) : [...prev, choiceIndex]
    )
  }

  const handleAnswer = () => {
    const isCorrect = selectedChoiceIndex === question.correctChoice - 1;
    setAnswerState(isCorrect ? ANSWER_STATE.CORRECT : ANSWER_STATE.INCORRECT);

    if (isCorrect) {
      setShowResultAnimation("correct")
    } else {
      setShowResultAnimation("incorrect")
    }
    setTimeout(() => {
      setShowResultAnimation(null)
      setIsAnimationFinished(true)
    }, 1600);

  }

  // 問題理解度の星のクリック状態
  const handleUnderstandingRatingSelect = (selectStar: number) => {
    setSelectedStar(selectStar);
  }

  return (
    <Layout>
      <section>

        <div className={styles.question}>
          {showResultAnimation === "correct" && (
            <div className={styles.question__lottieOverlay}>
              <div style={styles.question_lottieCorrectWrapper}>
                <DotLottieReact
                  src="/lottie/correct-lottie.json"
                  autoplay
                  speed={1.1}
                  onAnimationEnd={() => setIsAnimationFinished(true)}
                />
              </div>
            </div>
          )}
          {showResultAnimation === "incorrect" && (
            <div className={styles.question__lottieOverlay}>
              <div style={styles.question_lottieIncorrectWrapper}>

                <DotLottieReact
                  src="/lottie/incorrect-lottie.json"
                  autoplay
                  speed={1.8}
                  onAnimationEnd={() => setIsAnimationFinished(true)}
                />
              </div>
            </div>
          )}

          <article>
            <header className={styles.question__header}>
              <h1 className={styles.question__period}>衛生管理者 令和{question.period}年{question.month}月度 過去問 第{question.index}問</h1>
              <span className={styles.question__subject}>{question.subject}</span>
            </header>
            <h2 className={styles.question__text}>
              <span className={styles.question__number}>問{question.index}</span>
              <span>
                {parse(
                  sanitizeHtml(question.questionText, {
                    allowedTags: ['strong']
                  })
                )}
              </span>
            </h2>

            <ul className={styles.question__choices}>
              {choices.map((choice, i) => (
                <li className={
                  styles.question__choice +
                  (hiddenChoiceIndices.includes(i) ? " " + styles["question__choiceHidden"] : "")
                  + (answerState !== ANSWER_STATE.UNANSWERED ? " " + styles["question__choiceAnswered"] : "")

                } key={i + 1}>
                  <div className={styles.question__choiceWrapper
                    + (answerState !== ANSWER_STATE.UNANSWERED && i + 1 === question.correctChoice ? " " + styles["question__choiceWrapperCorrect"] : "")
                    + (answerState === ANSWER_STATE.INCORRECT && i === selectedChoiceIndex ? " " + styles["question__choiceWrapperIncorrect"] : "")
                    + (answerState !== ANSWER_STATE.UNANSWERED ? " " + styles["question__choiceWrapperDone"] : "")
                  }
                  >
                    <label className={styles.question__label}>
                      <input
                        type="checkbox"
                        name="question"
                        value={i + 1}
                        checked={selectedChoiceIndex === i}
                        className={styles.question__checkbox}
                        onChange={() => handleChoiceSelect(i)}
                      />
                      <span className={styles.question__choiceText}>{choice[0]}</span>
                    </label>
                    <div className={styles.question__eyeIcon} onClick={() => handleChoiceVisibilityToggle(i)}>
                      {hiddenChoiceIndices.includes(i) && i !== selectedChoiceIndex &&
                        <img src={eyeOpenSvg} alt="open Icon" />
                      }
                      {!hiddenChoiceIndices.includes(i) && i !== selectedChoiceIndex &&

                        <img src={eyeCloseSvg} alt="close Icon" />
                      }
                    </div>


                  </div>
                  {isAnimationFinished && (

                    <div className={styles.question__commentary}>

                      <span className={styles.question__commentary_icon}>
                        {answerState !== ANSWER_STATE.UNANSWERED && (
                          <img src={i + 1 === question.correctChoice ? circleGreenSvg : closeRedSvg} />
                        )}
                        {/* {answerState === ANSWER_STATE.INCORRECT && i === selectedChoiceIndex && (
                          <img src={closeRedSvg} />
                        )} */}
                      </span>

                      {answerState !== ANSWER_STATE.UNANSWERED && (
                        <>
                          <span className={
                            styles.question__commentary_text
                          }>{parse(
                            sanitizeHtml(choice[1], {
                              allowedTags: ['ul', 'li', 'strong', 'br']
                            })
                          )}</span>
                        </>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            {answerState === ANSWER_STATE.UNANSWERED &&
              <button type="button" className={styles.question__answerButton} onClick={() => handleAnswer()}>解答する</button>
            }
            {answerState !== ANSWER_STATE.UNANSWERED &&

              // <div className={styles.question__rating}>
              //   <span className={styles.question__rating_title}>理解度評価</span>

              //   <div className={styles.question__rating_stars}>
              //     {Array.from({ length: 5 }, (_, i) => (
              //       <span
              //         className={
              //           styles.question__rating_star +
              //           (understandingRating !== null && i + 1 <= understandingRating ? " " + styles["question__rating_starSelected"] : "")
              //         }
              //         onClick={() => handleUnderstandingRatingSelect(i + 1)}
              //       ></span>
              //     ))}
              //   </div>
              // </div>

              <div className={styles.question__keep}>
                <input type="checkbox" id="keep" />
                <label htmlFor="keep">あとで見返す</label>
              </div>
            }
            {answerState !== ANSWER_STATE.UNANSWERED && nextUid &&
              <Link to={`/question/${nextUid}`} className={styles.question__nextButton}>
                次の問題へ
              </Link>
            }
          </article>

        </div>
      </section>

    </Layout>

  )

}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
