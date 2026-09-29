import Logo from '../atoms/Logo.tsx'

type AuthBannerProps = {
  src: string
  alt?: string
}

function AuthBanner({ src, alt = '' }: AuthBannerProps) {
  return (
    <div className="relative h-full overflow-hidden rounded">
      <img src={src} alt={alt} className="size-full object-cover" />
      <Logo className="absolute inset-x-0 bottom-6 justify-center" />
    </div>
  )
}

export default AuthBanner
