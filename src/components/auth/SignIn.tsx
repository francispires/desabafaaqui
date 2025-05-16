import { SignIn } from '@clerk/nextjs';

const SignInPage = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    <SignIn
      afterSignInUrl="/"
      signUpUrl="/sign-up"
    />
  </div>
);

export default SignInPage;