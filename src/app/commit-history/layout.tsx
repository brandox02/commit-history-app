



export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {

   return (
      <div className="bg-[#F8F9FA] w-full h-screen flex justify-center  ">{children}</div>
   )
}
