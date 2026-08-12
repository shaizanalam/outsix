"use client"
import * as React from "react"
import { useRef, useEffect, useCallback, useState } from "react"

/**
 * BlackHole - A premium 3D black hole accretion disk component.
 */

// ─── Types ───────────────────────────────────────────────────

type Particle = {
    angle: number
    radius: number
    height: number
    speedOffset: number
    colorIdx: number
}

type Centre = {
    voidRadius?: number
    voidX?: number
    voidY?: number
}

export type BlackHoleProps = {
    showCenter?: boolean
    centre?: Centre
    particleCount?: number
    particleSize?: number
    colors?: string[]
    outerRadius?: number
    tilt?: number
    tiltSideway?: number
    trail?: number
    orbitSpeed?: number
    pullSpeed?: number
    style?: React.CSSProperties
}

// ─── Constants ───────────────────────────────────────────────

const BG = "#000000"
const PERSPECTIVE = 1300

// ─── Defaults ────────────────────────────────────────────────

const DEFAULT_CENTRE = {
    voidRadius: 40,
    voidX: 50,
    voidY: 50,
}

const DEFAULTS = {
    showCenter: true,
    centre: DEFAULT_CENTRE,
    particleCount: 1000,
    particleSize: 4,
    colors: ["#ffffff"],
    outerRadius: 70,
    tilt: 20,
    tiltSideway: 160,
    trail: 50,
    orbitSpeed: 4,
    pullSpeed: 0,
}

const COMPONENT_DEFAULTS = {
    showCenter: DEFAULTS.showCenter,
    centre: {
        voidRadius: DEFAULT_CENTRE.voidRadius,
        voidX: DEFAULT_CENTRE.voidX,
        voidY: DEFAULT_CENTRE.voidY,
    },
    colors: DEFAULTS.colors,
    outerRadius: DEFAULTS.outerRadius,
    particleCount: DEFAULTS.particleCount,
    particleSize: DEFAULTS.particleSize,
    orbitSpeed: DEFAULTS.orbitSpeed,
    trail: DEFAULTS.trail,
    tilt: DEFAULTS.tilt,
    tiltSideway: DEFAULTS.tiltSideway,
    pullSpeed: DEFAULTS.pullSpeed,
}

// ─── Component ───────────────────────────────────────────────

export default function BlackHole(props: BlackHoleProps) {
    props = { ...COMPONENT_DEFAULTS, ...props }
    const {
        showCenter = DEFAULTS.showCenter,
        centre,
        particleCount = DEFAULTS.particleCount,
        particleSize: particleSizeRaw = DEFAULTS.particleSize,
        colors = DEFAULTS.colors,
        outerRadius = DEFAULTS.outerRadius,
        tilt = DEFAULTS.tilt,
        tiltSideway = DEFAULTS.tiltSideway,
        trail: trailRaw = DEFAULTS.trail,
        orbitSpeed = DEFAULTS.orbitSpeed,
        pullSpeed: pullSpeedRaw = DEFAULTS.pullSpeed,
        style,
    } = props

    const {
        voidRadius: rawVoidRadius,
        voidX = 50,
        voidY = 50,
    } = {
        ...DEFAULT_CENTRE,
        ...centre,
    }

    const voidColor = BG
    const perspective = PERSPECTIVE

    const particleSize =
        0.5 + (Math.max(1, Math.min(50, particleSizeRaw ?? 20)) - 1) * (4 / 49)
    const pullSpeed = Math.max(0, pullSpeedRaw ?? 1) / 2
    const trailAlpha = Math.max(
        0.02,
        1 - (Math.max(0, trailRaw ?? 40) / 50) * 0.98
    )

    const voidRadius = showCenter !== false ? (rawVoidRadius ?? 40) : 1

    const outerRadFromSize = useCallback(
        (w: number) => {
            const maxR = w / 2
            const pct = Math.max(0, Math.min(100, outerRadius)) / 100
            return voidRadius + pct * (maxR - voidRadius)
        },
        [voidRadius, outerRadius]
    )

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const fgCanvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const animRef = useRef<number>(0)
    const sizeRef = useRef({ w: 600, h: 600 })
    const [sizeVersion, setSizeVersion] = useState(0)

    const initParticles = useCallback(
        (
            count: number,
            horizonRad: number,
            outerRad: number,
            colorsLength: number
        ) => {
            const pts: Particle[] = []
            for (let i = 0; i < count; i++) {
                const radius =
                    horizonRad +
                    Math.pow(Math.random(), 2) * (outerRad - horizonRad)
                pts.push({
                    angle: Math.random() * Math.PI * 2,
                    radius,
                    height: (Math.random() - 0.5) * 16,
                    speedOffset: 0.75 + Math.random() * 0.5,
                    colorIdx: Math.floor(Math.random() * colorsLength),
                })
            }
            particlesRef.current = pts
        },
        []
    )

    useEffect(() => {
        const { w, h } = sizeRef.current
        initParticles(
            particleCount,
            voidRadius,
            outerRadFromSize(w, h),
            colors.length
        )
    }, [
        particleCount,
        voidRadius,
        colors.length,
        initParticles,
        outerRadFromSize,
        sizeVersion,
    ])

    useEffect(() => {
        const container = containerRef.current
        const canvas = canvasRef.current
        const fgCanvas = fgCanvasRef.current
        if (!container || !canvas || !fgCanvas) return

        const ro = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect
                const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
                canvas.width = width * dpr
                canvas.height = height * dpr
                canvas.style.width = `${width}px`
                canvas.style.height = `${height}px`
                fgCanvas.width = width * dpr
                fgCanvas.height = height * dpr
                fgCanvas.style.width = `${width}px`
                fgCanvas.style.height = `${height}px`
                const prev = sizeRef.current
                sizeRef.current = { w: width, h: height }
                if (prev.w !== width || prev.h !== height) {
                    setSizeVersion((v) => v + 1)
                }
            }
        })
        ro.observe(container)
        return () => ro.disconnect()
    }, [])

    const colorsKey = JSON.stringify(colors);

    useEffect(() => {
        const canvas = canvasRef.current
        const fgCanvas = fgCanvasRef.current
        if (!canvas || !fgCanvas) return
        const ctx = canvas.getContext("2d")
        const fgCtx = fgCanvas.getContext("2d")
        if (!ctx || !fgCtx) return

        let lastTime = performance.now()

        const draw = (now: number) => {
            const dt = Math.min((now - lastTime) / 16.667, 3)
            lastTime = now

            const { w, h } = sizeRef.current
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            fgCtx.setTransform(dpr, 0, 0, dpr, 0, 0)

            ctx.globalCompositeOperation = "destination-out"
            ctx.fillStyle = `rgba(0, 0, 0, ${trailAlpha})`
            ctx.fillRect(0, 0, w, h)
            ctx.globalCompositeOperation = "source-over"

            fgCtx.globalCompositeOperation = "destination-out"
            fgCtx.fillStyle = `rgba(0, 0, 0, ${trailAlpha})`
            fgCtx.fillRect(0, 0, w, h)
            fgCtx.globalCompositeOperation = "source-over"

            const outerRad = outerRadFromSize(w)
            const voidCx = (voidX / 100) * w
            const voidCy = (voidY / 100) * h

            const pts = particlesRef.current
            const tiltRad = (tilt * Math.PI) / 180
            const tiltSidewayRad = (tiltSideway * Math.PI) / 180

            type ProjectedPt = {
                x: number
                y: number
                size: number
                alpha: number
                z: number
                color: string
            }

            const backgroundParticles: ProjectedPt[] = []
            const foregroundParticles: ProjectedPt[] = []

            for (let i = 0; i < pts.length; i++) {
                const pt = pts[i]
                pt.angle += (0.012 * orbitSpeed * dt) / Math.sqrt(pt.radius / 50)
                pt.radius -= 0.15 * pullSpeed * dt
                if (pt.radius < voidRadius * 0.4) {
                    pt.radius = outerRad * (0.8 + Math.random() * 0.2)
                    pt.angle = Math.random() * Math.PI * 2
                }

                const px = pt.radius * Math.cos(pt.angle)
                const py = pt.height
                const pz = pt.radius * Math.sin(pt.angle)

                const cosT = Math.cos(tiltRad)
                const sinT = Math.sin(tiltRad)
                const y1 = py * cosT - pz * sinT
                const z1 = py * sinT + pz * cosT

                const cosS = Math.cos(tiltSidewayRad)
                const sinS = Math.sin(tiltSidewayRad)
                const x2 = px * cosS + z1 * sinS
                const z2 = -px * sinS + z1 * cosS

                const dist = perspective + z2
                const scale = perspective / Math.max(dist, 10)
                const screenX = voidCx + x2 * scale
                const screenY = voidCy + y1 * scale

                const isForeground = z2 > 0
                const alpha = Math.max(0, Math.min(1, scale * 0.8))
                const particleColor = colors[pt.colorIdx % colors.length] || "#ffffff"
                const item = {
                    x: screenX,
                    y: screenY,
                    size: pt.size * scale,
                    alpha,
                    z: z2,
                    color: particleColor,
                }

                if (isForeground) {
                    foregroundParticles.push(item)
                } else {
                    backgroundParticles.push(item)
                }
            }

            backgroundParticles.sort((a, b) => a.z - b.z)
            foregroundParticles.sort((a, b) => a.z - b.z)

            for (let i = 0; i < backgroundParticles.length; i++) {
                const pt = backgroundParticles[i]
                ctx.globalAlpha = pt.alpha
                ctx.fillStyle = pt.color
                ctx.beginPath()
                ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2)
                ctx.fill()
            }
            ctx.globalAlpha = 1.0


                    if (colorStr.startsWith("#")) {
                        const hex = colorStr.replace("#", "")
                        if (hex.length === 3) {
                            r = parseInt(hex[0] + hex[0], 16)
                            g = parseInt(hex[1] + hex[1], 16)
                            b = parseInt(hex[2] + hex[2], 16)
                        } else if (hex.length >= 6) {
                            r = parseInt(hex.substring(0, 2), 16)
                            g = parseInt(hex.substring(2, 4), 16)
                            b = parseInt(hex.substring(4, 6), 16)
                        }
                    } else if (colorStr.startsWith("rgb")) {
                        const match = colorStr.match(
                            /rgba?\((\d+),\s*(\d+),\s*(\d+)/
                        )
                        if (match) {
                            r = parseInt(match[1])
                            g = parseInt(match[2])
                            b = parseInt(match[3])
                        }
                    }
                    return { r, g, b }
                }
                const voidRgb = hexToRgb(voidColor)

                const sphereGrad = ctx.createRadialGradient(
                    voidCx - voidRadius * 0.25,
                    voidCy - voidRadius * 0.3,
                    voidRadius * 0.05,
                    voidCx,
                    voidCy,
                    voidRadius
                )
                const edgeR = Math.min(255, voidRgb.r + 18)
                const edgeG = Math.min(255, voidRgb.g + 18)
                const edgeB = Math.min(255, voidRgb.b + 18)
                sphereGrad.addColorStop(
                    0,
                    `rgba(${Math.min(255, voidRgb.r + 8)}, ${Math.min(255, voidRgb.g + 8)}, ${Math.min(255, voidRgb.b + 8)}, 1)`
                )
                sphereGrad.addColorStop(
                    0.65,
                    `rgba(${voidRgb.r}, ${voidRgb.g}, ${voidRgb.b}, 1)`
                )
                sphereGrad.addColorStop(
                    0.92,
                    `rgba(${edgeR}, ${edgeG}, ${edgeB}, 1)`
                )
                sphereGrad.addColorStop(
                    1,
                    `rgba(${edgeR}, ${edgeG}, ${edgeB}, 0.9)`
                )

                ctx.globalAlpha = 1.0
                ctx.fillStyle = sphereGrad
                ctx.beginPath()
                ctx.arc(voidCx, voidCy, voidRadius, 0, Math.PI * 2)
                ctx.fill()

                const rimGrad = ctx.createRadialGradient(
                    voidCx,
                    voidCy,
                    voidRadius * 0.88,
                    voidCx,
                    voidCy,
                    voidRadius * 1.02
                )
                rimGrad.addColorStop(0, `rgba(255, 255, 255, 0)`)
                rimGrad.addColorStop(0.6, `rgba(180, 180, 200, 0.06)`)
                rimGrad.addColorStop(0.85, `rgba(180, 180, 200, 0.12)`)
                rimGrad.addColorStop(1, `rgba(180, 180, 200, 0)`)
                ctx.globalAlpha = 1.0
                ctx.fillStyle = rimGrad
                ctx.beginPath()
                ctx.arc(voidCx, voidCy, voidRadius * 1.02, 0, Math.PI * 2)
                ctx.fill()
            }

            for (let i = 0; i < foregroundParticles.length; i++) {
                const pt = foregroundParticles[i]
                fgCtx.globalAlpha = pt.alpha
                fgCtx.fillStyle = pt.color
                fgCtx.beginPath()
                fgCtx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2)
                fgCtx.fill()
            }
            fgCtx.globalAlpha = 1.0

            animRef.current = requestAnimationFrame(draw)
        }

        animRef.current = requestAnimationFrame(draw)
        return () => cancelAnimationFrame(animRef.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        voidX,
        voidY,
        voidRadius,
        voidColor,
        showCenter,
        particleCount,
        particleSize,
        colorsKey,
        outerRadFromSize,
        tilt,
        tiltSideway,
        trailAlpha,
        orbitSpeed,
        pullSpeed,
        perspective,
    ])

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "100%",
                background: "transparent",
                ...style,
                position: "relative",
                overflow: "hidden",
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }}
            />
            <canvas
                ref={fgCanvasRef}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                }}
            />
        </div>
    )
}
