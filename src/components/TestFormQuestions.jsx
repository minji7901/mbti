import React from "react";

export default function TestFormQuestions({
  question,
  index,
  answer,
  onChange,
}) {
  return (
    <div key={question.id} className="mb-6 p-5 border border-black rounded-sm">
      <p className="font-semibold text-lg mb-3">
        Q{index + 1}. {question.question}
      </p>
      <div className="flex flex-col gap-2">
        {question.options.map((option, i) => (
          <label key={i} className="cursor-pointer block">
            <input
              type="radio"
              name={`question-${index}`}
              value={question.type.split("/")[i]}
              checked={answer === question.type.split("/")[i]}
              onChange={() => onChange(question.type.split("/")[i])}
              className="mr-2 text-primary-color"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}
