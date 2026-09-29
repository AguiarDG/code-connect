import type { ReactNode } from 'react'
import Heading from '../atoms/Heading.tsx'
import Icon from '../atoms/Icon.tsx'
import Text from '../atoms/Text.tsx'

type AuthTemplateProps = {
  banner: ReactNode
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
}

function AuthTemplate({
  banner,
  title,
  subtitle,
  children,
  footer,
}: AuthTemplateProps) {
  return (
    <div className="relative isolate flex min-h-svh items-center justify-center overflow-hidden px-4 py-10">
      <Icon
        name="chain-link"
        className="absolute -top-4 left-[7%] -z-10 hidden w-80 text-decor md:block"
      />
      <Icon
        name="chain-link"
        className="absolute right-[7%] -bottom-4 -z-10 hidden w-80 text-decor md:block"
      />
      <main className="grid w-full max-w-5xl gap-10 rounded-3xl bg-surface p-6 md:grid-cols-[minmax(0,26rem)_1fr] md:p-14">
        <div className="hidden md:block">{banner}</div>
        <div className="flex flex-col gap-8">
          <header className="flex flex-col gap-6">
            <Heading>{title}</Heading>
            <Text className="text-2xl">{subtitle}</Text>
          </header>
          {children}
          {footer}
        </div>
      </main>
    </div>
  )
}

export default AuthTemplate
