"use client"

import React from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import { useEffect, useState } from 'react'

export function SuccessConfetti() {
    const { width, height } = useWindowSize()
    const [isClient, setIsClient] = useState(false)

    // ensure it only mounts on client to prevent hydration mismatch
    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) return null

    return (
        <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={600}
            gravity={0.15}
            colors={['#849b87', '#d4c5b9', '#e0d5ce', '#bc9c82', '#9faca2']} // Muted sage greens, warm blush, taupe, and subtle gold for an elegant floral palette
        />
    )
}
