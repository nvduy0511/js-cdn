import React, { useState, useRef, useEffect } from 'react';
import styles from './ExerciseDetail.module.css';
import clsx from 'clsx';
import AceEditor from "react-ace";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { defaultValueEditor, modeEditor, navLeftItems } from './dataCodeUI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faCircle, faArrowsLeftRight, faChevronDown, faChevronUp, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { faAlignLeft, faRankingStar, faClock } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-one_dark";
import {apis} from './api'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles);


function Editor() {
    let params = useParams();
    // console
    const [code,setCode] = useState('');
    const [resulCode, setResultCode] = useState('Console ...')
    const [input, setInput] = useState("")
    // navigate
    const [tabType, setTabType] = useState("content")
    const [isTestCase, setIsTestCase] = useState(true)
    const [language, setLanguage] = useState("c")
    const [testCases, setTestCases] = useState([])
    const [question,setQuestion] = useState({});
    const [isExtend, setIsExtend] = useState(true);
    // resize
    const [initialPos,   setInitialPos] = useState(null);
    const [initialSize, setInitialSize] = useState(null);

    const editor = useRef();

    const getData = async () => {
        const resQuestion = await apis.getQuestion(params.id);
        setQuestion(resQuestion.data);
        const resTestCase = await apis.getTestCase(params.id);
        setTestCases(resTestCase.data);
    }

    useEffect(()=>{
        getData();
    },[])

    const handleNavLeft = (value) => {
        setTabType(value);
    }
    
    function handleClickRunCode() {
        setResultCode("Đang chạy....");
        const data = async () => {
            try {
                const response = await apis.runCode({
                    code: editor.current.editor.getValue(),
                    input: input,
                    language: language
                });
                setResultCode(response.data);
            } catch (error) {
                console.log("Fetch data error: ", error);
            }
        }
        data();
    }

    const MouseDownResize = (e) =>
    {
        let resizable = document.getElementById('content-question');
        setInitialPos(e.clientX);
        setInitialSize(resizable.offsetWidth);
    }

    const handleResize = (e)=>{
        let resizable = document.getElementById('content-question');
        resizable.style.width = `${parseInt(initialSize) + parseInt(e.clientX - initialPos)}px`;
    }

    const handleClickSubmitCode = () => {
        const submit = async () => {
            setTestCases(testCases.map(() => 3))
            try {
                const response = await apis.runCodes({
                    code: editor.current.editor.getValue(),
                    input: '',
                    language: language
                }, params.id);
                setTestCases(response.data)
            } catch (error) {
                console.log("Fetch data error: ", error);
            }
        }
        submit();
    }

    return (
        <div className={cx("content_body")}>
            <div className={cx("nav_left")}>
                <div className={cx("is_select","nav_item")}>
                    <FontAwesomeIcon icon={faAlignLeft} className={cx("icon-navBar")} />
                </div>
                <div className={cx("nav_item ")} >
                    <FontAwesomeIcon icon={faRankingStar} className={cx("icon-navBar")}  />
                </div>
                <div className={cx("nav_item ")}>
                    <FontAwesomeIcon icon={faClock}  className={cx("icon-navBar")} />
                </div>
     
            </div>
        
            <div id='content-question' className={cx("content")}>
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
            
            <div className={cx("code_editor")}>
                <div className={cx('resize')} onMouseDown={MouseDownResize} draggable='true' onDrag={handleResize}>
                    <FontAwesomeIcon icon={faArrowsLeftRight}  />
                </div>
                <div className={cx("option_language")}>
                    <select className={cx("selectpicker")} onChange={(e) => {
                        setLanguage(e.target.value)
                        editor.current.editor.setValue(defaultValueEditor[e.target.value]);
                    }}>
                        <option value="c" defaultValue>C</option>
                        <option value="cpp" >C++</option>
                        <option value="py" >Python</option>
                        <option value="cs" >C#</option>
                        <option value="java">Java</option>
                      </select>
                </div>
                <div id='codeEditor' className={cx("editor")}>
                    <div className={cx("editor__wrapper")}>
                        <div className={cx("editor__body")}>
                        <AceEditor
                            ref={editor}
                            placeholder="Viết code của bạn ở đây..."
                            defaultValue={defaultValueEditor[language]}
                            mode={modeEditor[language]}
                            theme='one_dark'
                            fontSize='14pt'
                            width='100%'
                            height='100%'
                            name="UNIQUE_ID_OF_DIV"
                            showPrintMargin={false}
                            editorProps={{
                                $blockScrolling: true,
                            }}
                            setOptions={{
                                enableBasicAutocompletion: false,
                                enableLiveAutocompletion: false,
                                enableSnippets: true,
                                showLineNumbers: true
                            }}
                        />
                        </div>
                    </div>
                    <Button sx={{position:"absolute", right:"20px", bottom:"10px"}} color="success" variant="contained" size="medium"
                        onClick={handleClickSubmitCode}>
                        Nộp bài
                    </Button>
                    <div className={cx('btn-extend')} onClick={() => setIsExtend((p) => !p)}>
                        <FontAwesomeIcon icon={isExtend ? faChevronDown : faChevronUp }/>
                    </div>
                </div>
                
                <div className={cx(isExtend ? "result-extend" : "result")}>
                    
                    <div className={cx("navRessult")}>
                        <h3 onClick={() => setIsTestCase(true)} className={clsx(styles.navRessult_item, { [styles.isSelect_navRessult]: isTestCase })} >Test case</h3>
                        <h3 onClick={() => setIsTestCase(false)} className={clsx(styles.navRessult_item, { [styles.isSelect_navRessult]: !isTestCase })} >Console</h3>
                    </div>
                    {
                        isExtend && 
                        <div>
                            {
                                isTestCase ?
                                (<div className={cx("result_content")}>
                                    <ul className={cx("list_testcase")}>
                                        {
                                            
                                            testCases && testCases.map((testCase,index) => (
                                                <li key={index}>
                                                    <div className={cx("case")}>
                                                        <FontAwesomeIcon
                                                            className={clsx(styles.icon,{
                                                                [styles.icon_success]: testCase === 1 || testCase === 2,
                                                                [styles.icon_error]: testCase === 0,
                                                                [styles.icon_loading]: testCase === 3
                                                            })}
                                                            icon={testCase === 2
                                                                ? faCircle : (testCase === 1
                                                                    ? faCircleCheck : ( testCase === 3 
                                                                        ? faSpinner : faCircleXmark))
                                                                }
                                                         />
                                                        <span>Test case #{index}</span>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                        
                                    </ul>
                                </div>)
                                :   
                                (<div className={styles.consoleScreen}>
                                    <div className={styles.consoleContent}>
                                        {resulCode}
                                    </div>
                                    <div className={styles.consoleInput}>
                                        <div>
                                            <Button variant="contained" size="small" onClick={handleClickRunCode}>Chạy thử</Button>
                                        </div>
                                        <TextareaAutosize
                                            aria-label="empty textarea"
                                            placeholder="Input"
                                            onChange={(e) => setInput(e.target.value)}
                                            style={{ width: 300 , height:"60px", marginTop:"15px", borderRadius:"3px", outline:"none" }}
                                        />
                                    </div>
                                </div>)
                            }
                        </div>
                    }
                </div>
            </div>
    </div>
    )
}

export default Editor;