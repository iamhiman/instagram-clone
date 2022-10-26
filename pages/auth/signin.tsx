import type { NextPage } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn as SignIntoProvider,
} from "next-auth/react";
import { Header } from "../../components/Header";
import Instagram from "../assets/instagram.webp";

interface IProviderProps {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;
}

const signIn: NextPage<IProviderProps> = ({ providers }) => {
  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col items-center justify-center py-2 px-14 text-center">
        <img className="w-80" src={Instagram?.src} alt="" referrerPolicy="no-referrer" />
        <p className="font-xs italic">
          This is not a REAL app, it is built for educational purposes only
        </p>

        <div className="mt-40">
          {Object.values(providers).map(provider => (
            <div key={provider.name}>
              <button
                onClick={() => SignIntoProvider(provider.id, { callbackUrl: "/" })}
                className="rounded-lg bg-blue-500 p-3 text-white"
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: { providers },
  };
}

export default signIn;
