import AuthLayout from "../components/AuthLayout";
import CardUi from "../components/CardUi";
import InputUi from "../components/InputUi";
import { MdOutlineEmail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import SubmitBtn from "../components/SubmitBtn";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema, type LoginFormSchemaType } from "../../../schemas/auth/loginValidationSchema";
import { useState, type ReactElement } from "react";
import { loginApi } from "../../../api/authAPI/loginApi";
import useNotification from "antd/es/notification/useNotification";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { authWithGoogle } from "../../../api/authAPI/authWithGoogle";


type InputFields = {
  id: number;
  name: keyof LoginFormSchemaType;
  icon: ReactElement;
  type: string;
  placeholder: string;
  labelName: string
}

const inputFields: InputFields[] = [
  {
    id: 1,
    name: "email",
    icon: <MdOutlineEmail />,
    type: "text",
    placeholder: "Enter your email",
    labelName: "Email"
  },
  {
    id: 2,
    name: "password",
    icon: <IoLockClosedOutline />,
    type: "password",
    placeholder: "********",
    labelName: "Password"
  },
]

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [message, context] = useNotification()
  const [disableGoogleBtn, setDisableGoogleBtn] = useState<boolean>(false)

  const navigate = useNavigate()

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema)
  })

  const submitLogin = async (data: LoginFormSchemaType) => {
    setLoading(true)

    const delay = async (time: number) => {
      return new Promise(resolve => setTimeout(resolve, time))
    }

    console.log(data)
    try {
      await delay(1000)
      await loginApi(data?.email, data?.password)
      message.success({
        message: "Logged in Successfully!"
      })

      await delay(1000)
      navigate('/')
    } catch (error) {
      message.error({
        message: "Something went wrong, Please try again"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setDisableGoogleBtn(true)
    try {
      const res = await authWithGoogle()
      console.log(res)

      setDisableGoogleBtn(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className="">
      {context}
      <AuthLayout>
        <CardUi>
          <section className="mb-5">
            <h1 className="text-2xl font-semibold mb-3">Login</h1>
            <p className="text-gray-500 text-lg">Enter your email and password to access your account</p>
          </section>

          <form onSubmit={handleSubmit(submitLogin)}>
            {
              inputFields.map((each) => (
                <div key={each.id} className="mb-3">
                  <Controller
                    name={each.name}
                    control={control}
                    render={({ field }) => (
                      <InputUi
                        {...field}
                        icon={each.icon}
                        inputType={each.type}
                        placeholder={each.placeholder}
                        labelName={each.labelName}
                      />
                    )}

                  />
                  {errors[each.name] && (
                    <p className="text-red-600 text-sm">{errors[each.name]?.message}</p>
                  )}
                </div>
              ))
            }
            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-3">
              <SubmitBtn btnName={loading ? "Hang on a sec..." : "Login"} loadingState={loading} />
              <button type="button" className="bg-black/10 rounded-2xl p-[10px] text-3xl h-full text-center cursor-pointer hover:opacity-80 hover:transition-all hover:duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed" title="Authenticate with google" disabled={disableGoogleBtn} onClick={handleGoogleAuth}>
                <FcGoogle className="mx-auto" />
              </button>
            </div>

          </form>

        </CardUi>
      </AuthLayout>
    </main>
  )
}

export default Login