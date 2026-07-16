import { useState } from 'react'

type LazyImageProps = {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}

export default function LazyImage({
  src,
  alt,
  className = '',
  width = 600,
  height = 600,
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-gray-200 ${className}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}
