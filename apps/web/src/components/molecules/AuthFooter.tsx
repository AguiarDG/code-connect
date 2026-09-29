import Icon from '../atoms/Icon.tsx'
import Link from '../atoms/Link.tsx'
import Text from '../atoms/Text.tsx'

type AuthFooterProps = {
  text: string
  linkText: string
  to: string
}

function AuthFooter({ text, linkText, to }: AuthFooterProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <Text>{text}</Text>
      <Link
        to={to}
        variant="primary"
        icon={<Icon name="clipboard" className="size-6" />}
      >
        {linkText}
      </Link>
    </div>
  )
}

export default AuthFooter
