import React from 'react';

function LoginPage() {
    const [id, setId] = React.useState("");
    const [pw, setPw] = React.useState("");

    const login = () => {
        console.log(id);
        console.log(pw);
    };

    return (
        <div>
            <form className="flex flex-col gap-y-3 p-4 border-2 border-gray-300 rounded-xl text-base"
                onSubmit={(e) => {
                    e.preventDefault();
                    login();
                }}>
                <p className="px-1 text-lg font-semibold">회원가입</p>
                <div className="flex flex-col">
                    <label className="p-1">이메일</label>
                    <input className="min-w-80 p-3 border-2 border-gray-200 rounded-2xl" placeholder="piebin@naver.com" required
                           onChange={(e) => {
                               setId(e.target.value);
                           }} />
                </div>
                <div className="flex flex-col">
                    <label className="p-1">비밀번호</label>
                    <input className="p-3 border-2 border-gray-200 rounded-2xl" placeholder="••••••••" type="password" required
                           onChange={(e) => {
                               setPw(e.target.value);
                           }} />
                </div>
                <button className="p-2 border-2 rounded-2xl hover:bg-gray-100" type="submit">
                    로그인
                </button>
            </form>
            <a href="/register" className="flex flex-1 justify-end px-2 py-1 text-gray-400 hover:text-gray-500">계정이 없으신가요? 회원가입하기</a>
        </div>
    );
}

export default LoginPage;