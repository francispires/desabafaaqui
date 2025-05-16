import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    <SignUp
      afterSignUpUrl="/"
      signInUrl="/sign-in"
    />
  </div>
);

export default SignUpPage;