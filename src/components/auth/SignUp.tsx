import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => (
  <SignUp 
    afterSignUpUrl="/"
    signInUrl="/sign-in"
  />
);

export default SignUpPage;