
import { useEffect, useState } from 'react'
import { getAllTasks, getCompletedTasks, getTodayTasks, getUpcomingTasks } from '../../../../api/dashboardAPI/TaskApi/getTasks'
import type { addTaskValidationSchemaType } from '../../../../schemas/addTaskValidationSchema'
import CardUi from '../../Home/component/CardUi'
import { FaCalendar } from 'react-icons/fa6'
import emptyTaskImg from "../../../../assets/noTaskIllustration-Photoroom.webp";
import LoadingComponent from '../../../../components/loadingComponent/LoadingComponent'
import { FaCheck } from "react-icons/fa6";
import { updateTaskCompletion } from '../../../../api/dashboardAPI/TaskApi/postReqToDb'
import { message } from 'antd'
import { useSelector } from 'react-redux'


const MapTask = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [tasks, setTasks] = useState<addTaskValidationSchemaType[]>([])
  const [error, setError] = useState<Error | null>(null)

  const tasktab = useSelector((state: any) => state.taskTabState.tab)

  useEffect(() => {

    setLoading(true)
    let res: () => void;

    switch (tasktab) {
      case "Today":
        res = getTodayTasks({
          onData: (fetchedTasks) => {
            setLoading(false)
            setTasks(fetchedTasks)
          },
          onError: (error) => {
            setError(error)
            setLoading(false)
          }
        })
        break;

      case "Upcoming":
        res = getUpcomingTasks({
          onData: (fetchedTasks) => {
            setLoading(false)
            setTasks(fetchedTasks)
          },
          onError: (error) => {
            setError(error)
            setLoading(false)
          }
        })
        break;

      case "Completed":
        res = getCompletedTasks({
          onData: (fetchedTasks) => {
            setLoading(false)
            setTasks(fetchedTasks)
          },
          onError: (error) => {
            setError(error)
            setLoading(false)
          }
        })
        break;

      default:
        res = getAllTasks({
          onData: (fetchedTasks) => {
            setLoading(false)
            setTasks(fetchedTasks)
          },
          onError: (error) => {
            setError(error)
            setLoading(false)
          }
        })

        break;
    }


    return () => res()
  }, [tasktab])

  const taskTypeModes = {
    work: {
      bgColor: '#DBEAFE',
      textColor: '#193CC8'
    },
    learning: {
      bgColor: '#F3E8FF',
      textColor: '#6E11C2'
    },
    personal: {
      bgColor: '#D0FAE5',
      textColor: '#007598'
    },
    others: {
      bgColor: '#F3F4F6',
      textColor: '#374151'
    }
  }

  const priorityModes = {
    high: {
      dotColor: '#F01023'
    },
    medium: {
      dotColor: '#EC8000'
    },
    low: {
      dotColor: '#00AF74'
    },
  }

  const handleTaskCompleted = async (id: string, isCompleted: boolean) => {
    try {
      await updateTaskCompletion(id, !isCompleted)

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <main className='mb-8'>
      {loading && (<LoadingComponent />)}
      <section className='flex flex-col space-y-4'>
        {!loading && tasks.length === 0 && (
          <span>
            <img src={emptyTaskImg} alt="task empty icon" className='w-full md:max-w-[70%] lg:max-w-[50%] mx-auto' />
          </span>
        )}
        {!loading && tasks.length > 0 && tasks.map((task) => (
          <CardUi key={task.id}>
            <section className='flex justify-between space-x-4 items-start'>
              <div className='max-w-[10%]'>
                {/* <input type='checkbox' checked={task.completed} /> */}
                <div className={`flex items-center justify-center w-4 h-4 mt-1 rounded-full border-[0.5px] bg-white border-gray-400 ${task.completed && "border-green-600 border-2"}`} onClick={() => handleTaskCompleted(task.id || "", task.completed || false)}>
                  {task.completed && <FaCheck className='text-[10px] mx-auto text-green-600 font-light' />}
                </div>
              </div>
              <div className='w-full space-y-3 flex flex-col'>
                <span>
                  <h1 className={` text-black ${task.completed && "text-black/50 line-through font-light"}`}>{task.taskName}</h1>
                </span>
                <span>
                  <p className='text-black/50 text-[14px]'>{task.desc}</p>
                </span>
                <span className='flex justify-between items-center mt-3 md:max-w-fit md:space-x-8'>
                  <aside className={`text-center py-0.5 px-3 rounded-full`} style={{ backgroundColor: taskTypeModes[task.taskType ?? "others"].bgColor }}>
                    <p
                      className={`text-sm`}
                      style={{ color: taskTypeModes[task.taskType ?? "others"].textColor }}
                    >
                      {task.taskType?.slice(0, 1).toUpperCase() + task.taskType!.slice(1,)}
                    </p>
                  </aside>
                  <aside className='flex flex-row space-x-1 items-center'>
                    <FaCalendar className='text-black/50' />
                    <p className='text-black/50 text-sm '>{task.dueDate}</p>
                  </aside>
                  <aside className='flex flex-row space-x-2 items-center'>
                    <span className='w-2 h-2 rounded-full' style={{ backgroundColor: priorityModes[task.priority ?? "medium"].dotColor }}></span>
                    <p className='text-sm'>{task.priority?.slice(0, 1).toUpperCase() + task.priority!.slice(1,)}</p>
                  </aside>
                </span>
              </div>
              <div className='font-extrabold '>...</div>
            </section>
          </CardUi>

        ))}
      </section>
    </main>
  )

}

export default MapTask