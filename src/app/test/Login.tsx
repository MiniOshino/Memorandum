"use client";
import { login, pullState, pushState, signup, validateToken } from "@/actions/account";
import { useState } from "react";

export function Signup() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ userName: '', password: '' });

    const handle = async (e) => {
        e.preventDefault();
        const { errors } = await signup(userName, password);
        if (errors.userName) setError({ userName: errors.userName, password: "" });
        if (errors.password) setError({ userName: errors.userName, password: errors.password });
    }

    return <form>
        <input className='text-black' name='username' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />
        {error.userName && <span>Error: {error.userName}</span>}
        <br />
        <input className='text-black' name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        {error.password && <span>Error: {error.password}</span>}
        <button type="submit" onClick={handle}>
            hi
        </button>
    </form>;
}

export function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ userName: '', password: '' });

    const handle = async (e) => {
        e.preventDefault();
        const { errors } = await login(userName, password);
        if (errors.userName) setError({ userName: errors.userName, password: "" });
        if (errors.password) setError({ userName: errors.userName, password: errors.password });
    }

    return <form>
        <h2>Login</h2>
        <input className='text-black' name='username' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />
        {error.userName && <span>Error: {error.userName}</span>}
        <br />
        <input className='text-black' name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        {error.password && <span>Error: {error.password}</span>}
        <br />
        <button type="submit" onClick={handle}>
            login
        </button>
    </form>;
}

export function TestVerify() {
    const handle = async (e) => {
        e.preventDefault();
        const foo = await validateToken();
        console.log(foo);
    }

    return <form>
        <br />
        <button type="submit" onClick={handle}>
            verify
        </button>
    </form>;
}

export function StatForm() {
    const [stat, setUserName] = useState("");
    const [value, setPassword] = useState("");

    const handle = async (e) => {
        e.preventDefault();
        const success = await pushState(stat, value);
        console.log(success);
    }

    return <form>
        <h2>Set Stat</h2>
        <input className='text-black' name='stat' type='text' value={stat} onChange={(e) => setUserName(e.target.value)} />
        <br />
        <input className='text-black' name='value' type='text' value={value} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit" onClick={handle}>
            login
        </button>
    </form>;
}

export function StatDisplay() {
    const [stats, setStats] = useState<{ key: string, value: string }[]>([]);

    const handle = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await pullState();
        console.log(result);
        if ('error' in result) {
            console.error(result.error);
        } else {
            setStats(result);
        }
    }

    return <form>
        <ul>
            {stats.map(s => <li><span>{s.key}</span> <span>{s.value}</span></li>)}
        </ul>
        <button type="submit" onClick={handle}>
            get stats
        </button>
    </form>;
}
