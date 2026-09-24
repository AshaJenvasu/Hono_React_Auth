import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Footer from '../components/Footer'
import Header from '../components/Header'

import appCss from '../styles.css?url'

// 1. สร้าง instance ของ QueryClient (อยู่นอก component)
const queryClient = new QueryClient()

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  // 2. จัดการหน้า Not Found และ Error component เพิ่มเติม
  notFoundComponent: () => (
    <div className="p-4 text-center">
      <h1 className="text-xl font-bold">404 - Not Found</h1>
      <p>ไม่พบหน้าที่คุณต้องการ</p>
    </div>
  ),
  errorComponent: ({ error }: { error: any }) => (
    <div className="p-4 text-red-500">
      <h1 className="text-xl font-bold">Something went wrong</h1>
      <pre>{(error as Error).message || String(error)}</pre>
    </div>
  ),
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(79,184,178,0.24)]">
        {/* 3. ครอบ QueryClientProvider ไว้ตรงนี้ */}
        <QueryClientProvider client={queryClient}>
          <Header />
          {children}
          <Footer />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>

        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            // {
            //   name: 'React Query',
            //   render: <ReactQueryDevtoolsPanel />,
            // },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
