import { useEffect, useState } from "react"
import { type addEventValidationSchemaType } from "../../../../schemas/events/addEventValidationSchema"
import { getAllEvents } from "../../../../api/dashboardAPI/EventsApi/getEvents"
import LoadingComponent from "../../../../components/loadingComponent/LoadingComponent"
import emptyEventImg from "../../../../assets/noTaskIllustration-Photoroom.webp"
import CardUi from "../../Home/component/CardUi"
import { CiClock2 } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { GoPeople } from "react-icons/go";


// const colorBasedOnEventType = [
//     { type: 'fun', color: '#FFB703' },
//     { type: 'meeting', color: '#219EBC' },
//     { type: 'family', color: '#8ECAE6' },
//     { type: 'others', color: '#9B9B9B' }
// ];

const colorBasedOnEventType = new Map<string, string>([
    ["fun", "#FFB703"],
    ["meeting", "#219EBC"],
    ["family", "#8ECAE6"],
    ["others", "#9B9B9B"],
])

const MapEvents = () => {
    const [events, setEvents] = useState<addEventValidationSchemaType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error>()

    useEffect(() => {
        setLoading(true)

        const subscribe = () => {
            getAllEvents({
                onData(events) {
                    setEvents(events)
                    setLoading(false)
                },
                onError(error) {
                    setError(error)
                    setLoading(false)
                },
            })
        }

        return () => subscribe()
    }, [])

    console.log(events)


    return (
        <main>
            {loading && <LoadingComponent />}
            {error && <p>An Error Occured</p>}

            <section className="flex flex-col space-y-3 mb-6">
                {!loading && events.length === 0 && (
                    <span>
                        <img src={emptyEventImg} alt="task empty icon" className='w-full md:max-w-[70%] lg:max-w-[50%] mx-auto' />
                    </span>
                )}

                {!loading && events.length > 0 && events.map((event) => (
                    <CardUi key={event.id}>
                        <main className="flex flex-row justify-between">
                            <div className="flex flex-row space-x-3 items-start">
                                <section className={`w-3 h-3 rounded-full`} style={{ backgroundColor: colorBasedOnEventType.get(event.eventType || "fun") }}>
                                </section>

                                <section className="flex flex-col space-y-3 w-full">
                                    <div>
                                        <h1 className="text-black">{event.eventName}</h1>
                                    </div>
                                    <div className='text-black/50 text-[14px]'>
                                        <p>{event.desc}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 md:flex md:flex-row md:space-x-4 w-full">
                                        <span className="flex flex-row space-x-1 items-center text-black/50">
                                            <CiClock2 className="text-lg" />
                                            <p>{event.startTime || "NIL"} - {event.endTime || "NIL"}</p>
                                            <p></p>
                                        </span>

                                        <span className="flex flex-row space-x-1 items-center text-black/50">
                                            <CiLocationOn className="text-lg" />
                                            <p>{event.location || "NIL"}</p>
                                        </span>

                                        <span className="flex flex-row space-x-1 items-center text-black/50 w-fit">
                                            <GoPeople className="text-lg" />
                                            <p>{event.noOfAttendees || 0} attendees</p>

                                        </span>
                                        <span className="w-fit flex flex-row space-x-1 items-center text-black/50">
                                            <p className="px-4 rounded-full text-sm text-white font-semibold" style={{ backgroundColor: colorBasedOnEventType.get(event.eventType || "fun") }}>{event.eventType!.slice(0,1).toUpperCase() + event.eventType?.slice(1,)}</p>
                                        </span>
                                    </div>
                                </section>
                            </div>

                            <section className="">...</section>
                        </main>
                    </CardUi>
                ))}

            </section>
        </main>
    )
}

export default MapEvents