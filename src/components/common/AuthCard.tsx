interface AuthCardProps {
  children: React.ReactNode;
}

const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="card w-80 h-[400px] bg-base-100 border border-base-300 shadow-sm p-6">
        <div className="card-body items-center justify-center p-0">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthCard;
