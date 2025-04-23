interface AuthCardProps {
  children: React.ReactNode;
}

const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 border border-base-300 shadow-sm px-6 py-10">
        <div className="card-body items-center justify-center gap-6 p-0 min-h-[380px] w-full">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthCard;
