import { useGetQuotes } from "../../../../api/dashboardAPI/useGetQuotes"
import { useGetPeriodOfDay } from "../../../../hooks/useGetPeriodOfDay"
import { useGetUsername } from "../../../../hooks/useGetUsername"
import { motion, AnimatePresence } from "framer-motion"
import Summary from "./Summary"
import FeaturesSection from "./FeaturesSection"

const Home = () => {
  // Get Random Quotes
  const { data, isLoading, error } = useGetQuotes()

  //Get Username
  const username = useGetUsername()

  // Get Period of day
  const periodOfDay = useGetPeriodOfDay()

  // !isLoading && !error && console.log(data[0].quote)
  return (
    <main>
      <section className="bg-primaryblue-300 p-4 rounded-2xl flex flex-col space-y-5">
        <h1 className="text-2xl text-white font-semibold">Good {periodOfDay ?? "Day"}, {username ?? "User"}</h1>
        {/* The future belongs to those who believe in the beauty of their dreams - Eleanor Roosevelt */}

        <AnimatePresence mode="wait">
          <motion.span
            key={!isLoading && !error && data && data[0]?.quote}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="md:max-w-[80%]"
          >
            <span className="text-gray-300 font-light text-md italic">
              {isLoading && "Loading Quote"}
              {error && "The future belongs to those who believe in the beauty of their dreams - Eleanor Roosevelt"}
              {!isLoading && !error && data && `${data[0]?.quote} - ${data[0]?.author}`}
            </span>
          </motion.span>
        </AnimatePresence>
      </section>

      <section className="mt-14">
        <Summary />
      </section>

      <section className="my-6">
        <FeaturesSection />
      </section>
    </main>
  )
}

export default Home