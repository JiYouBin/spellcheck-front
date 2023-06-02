import axios from "axios";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import swal from "sweetalert2";
import Title1 from "./Title1";
import Title2 from "./Title2";
import "./SpellCheck.css";
import { MdNavigateNext, MdCopyAll } from "react-icons/md";
import { BsCheck } from "react-icons/bs"

const SpellCheck = () => {

    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handlerChangeInput = e => {
        setInput(e.target.value);
    };

    const handlerCheck = () => {
        axios.post(`http://${process.env.REACT_APP_REST_API_SERVER_IP}:${process.env.REACT_APP_REST_API_SERVER_PORT}/checker`, { sentence: input })
            .then(response => {
                setOutput(JSON.parse(response.data[0]));
            })
            .catch(error => {
                console.log(error);
            });
    };

    const copyAlert = () => {
        swal.fire({
            title: '٩(๑•̀o•́๑)و 복사완료 ٩(๑•̀o•́๑)و',
            timer: 1000,
            icon: "success"
        })
    };

    return (
        <div id="my-container">
            <div className="spell_check_container">
                <div className="title_circle" />
                <div className="spellcheck-box">
                    {/* 검사 전 */}
                    <div className="original_text">
                        <Title1 />
                        <div className="input-text">
                            <textarea className="input-text-box" 
                                        onChange={handlerChangeInput} 
                                        placeholder="맞춤법 검사를 원하는 단어나 문장을 입력해주세요." />
                            <button className="btn" 
                                    onClick={handlerCheck}>검사 시작 <BsCheck className="check-icon" /> </button>
                        </div>
                    </div>

                    <div className="next">
                        <MdNavigateNext />
                        <MdNavigateNext />
                        <MdNavigateNext />
                    </div>

                    {/* 검사 후 */}
                    <div className="Result_text">
                        <Title2 />
                        {/* 검사 후에 나오는 변경된 부분에 대한 설명 */}
                        <div className="input-text">
                            <div className="Result_text2">
                                {output && output.result}
                                {output && output.suggest.map(sgst =>
                                    <p>{sgst.info}</p>
                                )}
                            </div>

                            {/* 변경된 텍스트만 복사 */}
                            <CopyToClipboard text={output && output.result}>
                                <button className="copy-btn" onClick={copyAlert}>복사하기 <MdCopyAll className="copy-icon" /> </button>
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>
                <div className="front-bg"></div>
            </div>
        </div>
    );

}
export default SpellCheck;
