import { signOut, useSession } from 'next-auth/client';

const Account = () => {
  const [session, loading] = useSession();
  console.log(session);
  return (
    <div>
      <h1>Account</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>You did it</p>
          <button onClick={signOut}>Eff this</button>
        </>
      )}
    </div>
  );
};

export default Account;
