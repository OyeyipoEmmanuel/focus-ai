import { MdOutlineEmail } from "react-icons/md"
import AuthLayout from "../components/AuthLayout"
import { IoLockClosedOutline } from "react-icons/io5"
import { FaRegUser } from "react-icons/fa6";
import CardUi from "../components/CardUi"
import SubmitBtn from "../components/SubmitBtn"
import InputUi from "../components/InputUi"
import { signupValidationSchema, type signupValidationType } from "../../../schemas/auth/sugnupValidationSchema";
import { useState, type ReactElement } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpApi } from "../../../api/authAPI/signUpAPI";
import useNotification from "antd/es/notification/useNotification";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { authWithGoogle } from "../../../api/authAPI/authWithGoogle";

type InputFields = {
  id: number;
  name: keyof signupValidationType;
  icon: ReactElement;
  type: string;
  placeholder: string;
  labelName: string
}

const inputFields: InputFields[] = [
  {
    id: 1,
    name: "username",
    icon: <FaRegUser />,
    type: "text",
    placeholder: "e.g Batman",
    labelName: "Username"
  },
  {
    id: 2,
    name: "email",
    icon: <MdOutlineEmail />,
    type: "email",
    placeholder: "Enter your email",
    labelName: "Email"
  },
  {
    id: 3,
    name: "password",
    icon: <IoLockClosedOutline />,
    type: "password",
    placeholder: "********",
    labelName: "Password"
  },
  {
    id: 4,
    name: "confirmPwd",
    icon: <IoLockClosedOutline />,
    type: "password",
    placeholder: "********",
    labelName: "Confirm Password"
  },
]



const SignUp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [disableGoogleBtn, setDisableGoogleBtn] = useState<boolean>(false)

  const [message, context] = useNotification()

  const navigate = useNavigate()

  const { control, handleSubmit, formState: { errors } } = useForm<signupValidationType>({
    resolver: zodResolver(signupValidationSchema)
  })

  const submitSignUp = async (data: signupValidationType) => {
    setIsLoading(true)
    console.log(data)

    // Wait a few sec before signUp so loading can show
    const delay = (time: number) => {
      return new Promise(resolve => setTimeout(resolve, time))
    }

    try {
      await delay(1000)

      await signUpApi(data?.email, data?.password, data?.username)
      message.success({
        message: "Successful🚀"
      })

      await delay(1000)
      navigate('/login')

    } catch (error) {
      console.log(error)
      message.error({
        message: "Something went wrong, Please try again"
      })
    } finally {
      setIsLoading(false)
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
    <main>
      {context}
      <AuthLayout>
        <CardUi>
          <section className="mb-5">
            <h1 className="text-2xl font-semibold mb-3">Sign Up</h1>
            <p className="text-gray-500 text-lg">Enter your information to create your account</p>
          </section>

          <form onSubmit={handleSubmit(submitSignUp)}>
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
                  {errors[each.name] && <p className="text-red-600 text-sm">{errors[each.name]?.message}</p>}
                </div>
              ))
            }

            <section className="flex items-center space-x-2 mb-5">
              <input type="checkbox" />
              <p className="text-sm">I agree to the <span className="text-blue-500 underline">privacy policy</span></p>
            </section>

            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-3">
              <SubmitBtn btnName={isLoading ? "Creating..." : "Create Account"} loadingState={isLoading} />

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

export default SignUp