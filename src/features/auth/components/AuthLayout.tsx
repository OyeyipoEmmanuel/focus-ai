import { Link } from 'react-router-dom'
import logo from '../../../assets/focus-ai logo2.png'


const AuthLayout = (props: any) => {
    const pathname: string = location.pathname

    return (
        <main className='flex items-center justify-center max-w-[90%] min-h-screen mx-auto md:w-full'>
            <div>
                {/* LOGO */}
                <section className='flex items-center justify-center '>
                    <img src={logo} alt="focus-ai" className='max-w-20' />
                </section>

                <section className='text-center'>
                    <h1 className='text-2xl'>{pathname === '/login' || pathname === '/' ? "Welcome Back" : "Create Your Account"}</h1>
                    <h3 className='mt-2 text-md text-[#1e293b] font-light'>{pathname === '/login' || pathname === '/' ? "Sign in to your account to continue" : "Get Started with your AI assistant today"}</h3>
                </section>

                {/* Form */}
                <section className='mt-8 mb-6 mx-auto md:min-w-[600px]'>{props.children}</section>

                {/* Footer */}
                <section className='text-[#1e293b] font-light text-center flex items-center justify-center'>
                    <span className='flex text-sm'>
                        {pathname === '/login' || pathname === '/' ? "Don't have an account yet?" : "Already have an account?"}
                        <Link to={pathname === '/login' || pathname === '/' ? '/signup' : '/login'}><p className='text-[#2563EB] underline font-semibold cursor-pointer hover:opacity-75'>
                            {pathname === '/login' || pathname === '/' ? "Sign Up" : "Sign in"}
                        </p>
                        </Link>
                    </span>
                </section>
            </div>
        </main>
    )
}

export default AuthLayout