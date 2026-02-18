"use client"

import { createContext, useContext } from "react"
import { motion, useReducedMotion } from "framer-motion"

const FadeInStaggerContext = createContext(false)

const viewport = { once: true, margin: "0px 0px -200px" }

export function FadeIn({
    children,
    className,
    delay = 0, // Manual delay
}: {
    children: React.ReactNode
    className?: string
    delay?: number
}) {
    const shouldReduceMotion = useReducedMotion()
    const isInStaggerGroup = useContext(FadeInStaggerContext)

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
                visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, delay }}
            {...(isInStaggerGroup
                ? {}
                : {
                    initial: "hidden",
                    whileInView: "visible",
                    viewport,
                })}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function FadeInStagger({
    children,
    className,
    faster = false,
}: {
    children: React.ReactNode
    className?: string
    faster?: boolean
}) {
    return (
        <FadeInStaggerContext.Provider value={true}>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                transition={{ staggerChildren: faster ? 0.12 : 0.2 }}
                className={className}
            >
                {children}
            </motion.div>
        </FadeInStaggerContext.Provider>
    )
}
