"use client";

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes';

const ThemeButton = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    })

    if (!mounted) {
        return <button type='button' disabled={true}></button>
    }

    const dark = theme === 'dark';

    return <button
                type='button' 
                onClick={() => setTheme(`${dark ? 'light' : 'dark'}`)}
            > 모드 변경
            </button>
};

export default ThemeButton;