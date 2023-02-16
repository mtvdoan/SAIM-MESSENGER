import React, {useState, useEffect} from 'react'

const UseLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    });

    function getStorageValue(key, defaultValue) {
    // getting stored value
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(key);
            const initial = saved !== null ? JSON.parse(saved) : defaultValue;
            return initial;
        }
    }
    useEffect(() => {
        // storing input name
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return ([value, setValue]);
}

export default UseLocalStorage;