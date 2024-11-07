function Layout({ children }) {
  return (
    <div className="flex justify-center items-center h-[95vh] bg-slate-200">
      {children}
    </div>
  );
}

export default Layout;
