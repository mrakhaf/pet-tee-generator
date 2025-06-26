import "./globals.css";

export const metadata = {
  title: "Pet Tee Generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex justify-center items-center min-h-screen bg-white">{children}</body>
    </html>
  );
}
