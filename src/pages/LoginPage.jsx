import { LoginForm } from '../components/LoginForm';

const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-start justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h1>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        No tienes cuenta? <a href="/auth/register" className="font-medium text-green-600 hover:text-green-500">Regístrate aquí</a>
                    </p>
                </div>
                <LoginForm />
                <div className="mt-6">
                    <a
                        href="/auth/github"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    >
                        <i className="fa-brands fa-github mr-2"></i> Ingresar con GitHub
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
