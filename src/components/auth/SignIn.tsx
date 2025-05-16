import { SignIn } from '@clerk/nextjs';

const SignInPage = () => (
  <SignIn 
    afterSignInUrl="/"
    signUpUrl="/sign-up"
  />
);

export default SignInPage;