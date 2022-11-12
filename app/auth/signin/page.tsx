import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import SignInComponent from "./SignInComponent";

type Props = {};

async function SignInPage({}: Props) {
  const providers = await getProviders();

  return (
    <div>
      <div className="flex justify-center">
        <Image
          className="rounded-full -mx-2 object-cover"
          width={700}
          height={700}
          src="https://links.papareact.com/161"
          alt="Profile picture"
        />
      </div>
      <SignInComponent providers={providers} />
    </div>
  );
}

export default SignInPage;
