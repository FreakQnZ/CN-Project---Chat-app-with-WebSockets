import React, { useState, useEffect } from 'react'

const PREFIX = "CN-Project"

const UseLocalStorage = (key, initialValue) => {
  const prefix = PREFIX + key
  const [value, setValue] = useState(() => {
    const jsval = localStorage.getItem(prefix)
    if (jsval != null) {
        return JSON.parse(jsval)
    }
    if (typeof initialValue === 'function') {
        return initialValue()
    } else {
        return initialValue
    }
  })

  useEffect(()=> {
    localStorage.setItem(prefix, JSON.stringify(value))
  }, [prefix, value])

  return [value, setValue]
   
}

export default UseLocalStorage