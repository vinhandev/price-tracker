export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        
        minHeight: '100vh',

        padding: 16,

        backgroundColor: '#070F2B',
        color: '#15F5BA',
      }}
    >
      {children}
    </div>
  );
}
