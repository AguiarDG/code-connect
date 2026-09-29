import SocialButton from '../atoms/SocialButton.tsx'
import Divider from './Divider.tsx'

export type SocialProvider = 'github' | 'google'

const providers: { id: SocialProvider; icon: string; label: string }[] = [
  { id: 'github', icon: '/github.png', label: 'Entrar com Github' },
  { id: 'google', icon: '/gmail.png', label: 'Entrar com Gmail' },
]

type SocialLoginProps = {
  title?: string
  onSelect: (provider: SocialProvider) => void
}

function SocialLogin({
  title = 'ou entre com outras contas',
  onSelect,
}: SocialLoginProps) {
  return (
    <div className="flex flex-col gap-4">
      <Divider>{title}</Divider>
      <ul className="flex justify-center gap-6">
        {providers.map(({ id, icon, label }) => (
          <li key={id}>
            <SocialButton
              icon={icon}
              label={label}
              onClick={() => onSelect(id)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SocialLogin
