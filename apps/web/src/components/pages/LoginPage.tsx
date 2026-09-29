import AuthFooter from '../molecules/AuthFooter.tsx'
import SocialLogin from '../molecules/SocialLogin.tsx'
import AuthBanner from '../organisms/AuthBanner.tsx'
import LoginForm from '../organisms/LoginForm.tsx'
import AuthTemplate from '../templates/AuthTemplate.tsx'

function LoginPage() {
  return (
    <AuthTemplate
      banner={<AuthBanner src="/banner-login.png" />}
      title="Login"
      subtitle="Boas-vindas! Faça seu login."
      footer={
        <AuthFooter
          text="Ainda não tem conta?"
          linkText="Crie seu cadastro!"
          to="/cadastro"
        />
      }
    >
      {/* TODO: call the API once authentication exists */}
      <LoginForm onSubmit={({ login }) => console.info('login', login)} />
      <SocialLogin
        onSelect={(provider) => console.info('social login', provider)}
      />
    </AuthTemplate>
  )
}

export default LoginPage
