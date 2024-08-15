"use client";

import Question from "./Question";

const Questions = () => {
  const questions = [
    {
      question: "このウェブサイトはなんですか？",
      answer:
        "このサイトは私がフロントエンドスキルとバックエンドスキルのデモ用に作成したECサイトです。使用した技術やフレームワークはTypescript Next.js PostgreSQL Prisma Figmaなどです。詳しくはGithubページをご覧ください。https://github.com/ryomaur/amser-ecommerce-demo",
    },
    {
      question: "本当にこのブランドは存在するの？",
      answer: "このブランドは架空のブランドで実際には存在しません。",
    },
    {
      question: "このサイトの商品は存在するの？",
      answer:
        "このサイトの商品は全て、私がプロダクトデザインしてBlenderなどの3Dモデリングソフトウェアを使用してモデリング、レンダリングした物なので現実には存在しません。",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      {questions.map((question, index) => (
        <Question
          key={index}
          question={question.question}
          answer={question.answer}
        />
      ))}
    </div>
  );
};

export default Questions;
