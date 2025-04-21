interface AuthCardProps {
  children: React.ReactNode;
}

const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 border border-base-300 shadow-sm p-6">
        <div className="card-body items-center justify-center p-0">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthCard;
