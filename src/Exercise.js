import React from 'react';
import styles from './ExerciseDetail.module.css';
import classNames from 'classnames/bind'
const cx = classNames.bind(styles);
export default function Exercise({question}) {
  return (
    <div>
        <div>
        <h1 className={cx('content-question_title')}>{question.title}</h1>
        </div>
        <div className={cx("question")}>
            <p>
                {question.content}
            </p>
        </div>

        <div>
            <h2>Input Format</h2>
            <p>{question.inputFomat}</p>
        </div>

        <div>
            <h2>Contraints</h2>
            <p>{question.constraint}</p>
        </div>

        <div>
            <h2>Output Format</h2>
            <p>{question.outputFormat}</p>
        </div>

        <div>
            <h2>Sample Input</h2>
            <div className={cx("sample_input")}>
                {question.sampleInput}
            </div>
        </div>

        <div>
            <h2>Sample Ouput</h2>
            <div className={cx("sample_output")}>
                {question.sampleOutput}
            </div>
        </div>
    </div>
  )
}
