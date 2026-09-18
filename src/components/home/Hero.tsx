import { useState } from 'react'
import { siteConfig } from '../../data/siteConfig'
import { projects } from '../../data/projects'
import { getVideoMetadata } from '../../utils/videoMetadata'
import { ButtonLink } from '../Button'
import { PlayIcon, CloseIcon } from '../Icons'

function GradientBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#1E222A_0%,#0B0C0E_70%)]"
    />
  )
}

interface HeroVisualProps {
  playing: boolean
  onPlay: () => void
  onStop: () => void
}

function HeroVisual({ playing, onPlay, onStop }: HeroVisualProps) {
  // Resolve video URL: siteConfig showreel -> first featured project
  const resolvedVideoUrl = siteConfig.showreel.videoUrl || projects[0]?.videoUrl || null
  const meta = resolvedVideoUrl ? getVideoMetadata(resolvedVideoUrl) : null
  const posterUrl =
    siteConfig.showreel.posterUrl ||
    meta?.thumbnailUrl ||
    (projects[0]?.thumbnailUrl ?? null)

  const [posterFailed, setPosterFailed] = useState(false)

  // Active video playback state
  if (playing && resolvedVideoUrl) {
    return (
      <div className="relative rounded-2xl border border-ink-700/80 bg-ink-900/90 p-2 shadow-2xl ring-1 ring-white/5 backdrop-blur-sm">
        <div className="mb-2 flex items-center justify-between px-2 text-[10px] uppercase tracking-widest text-bone-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" />
            <span className="text-red-400 font-bold">PLAYING</span>
            <span>• 4K UHD</span>
          </div>
          <button
            type="button"
            onClick={onStop}
            className="flex items-center gap-1 text-bone-400 hover:text-ember-400 transition-colors"
          >
            <CloseIcon className="h-3 w-3" />
            <span>Close</span>
          </button>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
          {meta?.embedUrl ? (
            <iframe
              className="h-full w-full border-0"
              src={meta.embedUrl}
              title="Showreel player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <video
              className="h-full w-full object-cover"
              src={resolvedVideoUrl}
              poster={posterUrl ?? undefined}
              controls
              autoPlay
              playsInline
            />
          )}
        </div>
      </div>
    )
  }

  // Cinematic Director's Monitor / Viewfinder preview state
  return (
    <div className="relative rounded-2xl border border-ink-700/80 bg-ink-900/90 p-2 shadow-2xl ring-1 ring-white/5 backdrop-blur-sm">
      {/* Top Monitor Hardware Bezel */}
      <div className="mb-2 flex items-center justify-between px-2 text-[10px] uppercase tracking-widest text-bone-400 font-mono">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span>SDI-1 • 4K UHD</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-bone-500">COLOR: REC.709</span>
          <span className="text-ember-400 font-semibold">DIRECTOR MONITOR</span>
        </div>
      </div>

      {/* Screen Area with 16:9 Aspect Ratio */}
      <div className="group relative aspect-video w-full overflow-hidden rounded-xl border border-ink-700/60 bg-ink-950">
        {/* Background Poster / Thumbnail */}
        {posterUrl && !posterFailed ? (
          <img
            src={posterUrl}
            alt="Showreel preview"
            width={1280}
            height={720}
            fetchPriority="high"
            decoding="async"
            onError={() => setPosterFailed(true)}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <GradientBackdrop />
        )}

        {/* Cinematic Vignette Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/30 to-ink-950/80" />

        {/* Viewfinder Reticle Brackets (4 corners) */}
        <div className="pointer-events-none absolute inset-0 p-3 sm:p-5">
          <div className="relative h-full w-full">
            <div className="absolute left-0 top-0 h-3.5 w-3.5 border-l-2 border-t-2 border-bone-100/50 sm:h-4 sm:w-4" />
            <div className="absolute right-0 top-0 h-3.5 w-3.5 border-r-2 border-t-2 border-bone-100/50 sm:h-4 sm:w-4" />
            <div className="absolute bottom-9 left-0 h-3.5 w-3.5 border-b-2 border-l-2 border-bone-100/50 sm:bottom-11 sm:h-4 sm:w-4" />
            <div className="absolute bottom-9 right-0 h-3.5 w-3.5 border-b-2 border-r-2 border-bone-100/50 sm:bottom-11 sm:h-4 sm:w-4" />

            {/* Center Framing Crosshair */}
            <div className="absolute inset-0 flex items-center justify-center opacity-25">
              <div className="relative h-6 w-6">
                <div className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-bone-200" />
                <div className="absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2 bg-bone-200" />
                <div className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 bg-bone-200" />
                <div className="absolute right-0 top-1/2 h-px w-2 -translate-y-1/2 bg-bone-200" />
              </div>
            </div>
          </div>
        </div>

        {/* HUD Top Overlay */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-3 sm:p-4 text-[11px] font-mono text-bone-200">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            </span>
            <span className="font-bold tracking-widest text-red-400">REC</span>
            <span className="hidden sm:inline text-bone-300">00:01:24:18</span>
          </div>

          <div className="rounded border border-white/10 bg-ink-950/70 px-2 py-0.5 text-[9px] uppercase tracking-wider text-bone-300 backdrop-blur-sm sm:text-[10px]">
            2.39:1 CINEMA
          </div>

          <div className="flex items-center gap-2 text-bone-400">
            <span className="hidden sm:inline">24 FPS</span>
            <span className="rounded bg-ember-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-ember-400 sm:text-[10px]">
              4K UHD
            </span>
          </div>
        </div>

        {/* Center Interactive Play Trigger */}
        <button
          type="button"
          onClick={onPlay}
          className="group/btn absolute inset-0 flex flex-col items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ember-400"
          aria-label="Play showreel"
        >
          <div className="relative flex items-center justify-center">
            {/* Pulsing ambient halo */}
            <span className="absolute -inset-4 rounded-full bg-ember-500/20 blur-lg transition-all duration-500 group-hover/btn:scale-150 group-hover/btn:bg-ember-500/40" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-bone-50/30 bg-ink-950/80 shadow-glow backdrop-blur-md transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:border-ember-400 group-hover/btn:bg-ember-600 sm:h-20 sm:w-20">
              <PlayIcon className="ml-1 h-7 w-7 text-bone-50 transition-transform group-hover/btn:scale-110 sm:h-8 sm:w-8" />
            </span>
          </div>
          <div className="text-center transition-transform duration-300 group-hover/btn:translate-y-0.5">
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-bone-50 drop-shadow sm:text-sm group-hover/btn:text-ember-300 transition-colors">
              Watch Showreel
            </p>
            <p className="font-mono text-[10px] tracking-wider text-bone-400 sm:text-[11px]">
              Click to Play • 2026 Cut
            </p>
          </div>
        </button>

        {/* HUD Bottom Control Strip */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-3 sm:p-4 text-bone-300">
          {/* Simulated Scrubber Progress Track */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-bone-400">01:14</span>
            <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-bone-100/20">
              <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-ember-600 to-ember-400 shadow-glow-sm" />
            </div>
            <span className="font-mono text-[10px] text-bone-400">03:45</span>
          </div>

          {/* Audio VU Levels & Audio Meta */}
          <div className="flex items-center justify-between text-[10px] font-mono text-bone-400">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] uppercase tracking-wider text-bone-500">AUDIO CH 1/2</span>
              {/* VU Meter Bars */}
              <div className="flex items-end gap-0.5 h-2.5">
                <span className="w-1 h-1 bg-emerald-500 rounded-xs" />
                <span className="w-1 h-1.5 bg-emerald-500 rounded-xs" />
                <span className="w-1 h-2 bg-emerald-500 rounded-xs" />
                <span className="w-1 h-2.5 bg-ember-400 rounded-xs" />
                <span className="w-1 h-1.5 bg-bone-500/30 rounded-xs" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline">BITRATE: 150 Mbps</span>
              <span className="text-ember-400 font-medium">STEREO // 48kHz</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Cinematic hero. No autoplaying video: the showreel is poster-first and only
 * loads a video element after the user clicks play.
 */
export default function Hero() {
  const [playing, setPlaying] = useState(false)
  const titleParts = siteConfig.professionalTitle.split('&').map((part) => part.trim())

  return (
    <section aria-labelledby="home-heading" className="relative">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-12 sm:px-8 sm:pt-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-14 lg:pt-20">
        <div>
          <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-bone-400">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ember-400" />
            {siteConfig.name}
            {siteConfig.location ? ` — ${siteConfig.location}` : ''}
          </p>

          <h1
            id="home-heading"
            className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tighter text-bone-50 text-balance sm:text-5xl lg:text-6xl"
          >
            {titleParts.length > 1 ? (
              <>
                {titleParts.slice(0, -1).join(' & ')} &{' '}
                <span className="text-ember-400">{titleParts[titleParts.length - 1]}</span>
              </>
            ) : (
              siteConfig.professionalTitle
            )}
          </h1>

          <p className="mt-6 max-w-prose text-lg leading-relaxed text-bone-300">
            {siteConfig.heroIntro}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink to="/work" variant="primary">
              View My Work
            </ButtonLink>
            <ButtonLink to="/contact">Let&apos;s Work Together</ButtonLink>
          </div>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.18),transparent_70%)] blur-2xl"
          />
          <HeroVisual
            playing={playing}
            onPlay={() => setPlaying(true)}
            onStop={() => setPlaying(false)}
          />
        </div>
      </div>
    </section>
  )
}