import { clsx } from "clsx"
import { TOOLS, Tool } from "../utils"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { setTool } from "../redux/slices/whiteboard"

interface Props {}

export default function Toolbar(props: Props) {
  const dispatch = useAppDispatch()
  const tool = useAppSelector((s) => s.tool)

  const onSelect = (tool: Tool) => {
    dispatch(setTool(tool))
  }

  return (
    <main className="flex justify-center items-center">
      <div className="rounded-xl m-4 p-1 mx-auto  bg-gray-200 box-content ">
        <h1 className="underline">
          {TOOLS.map((t) => {
            const btnClass = clsx(
              "mx-2 hover:bg-gray-300 rounded-xl p-2 transition-colors duration-300 ease-in-out font-bold uppercase",
              {
                "bg-gray-300": tool === t,
              },
            )
            return (
              <button className={btnClass} key={t} onClick={() => onSelect(t)}>
                {t}
              </button>
            )
          })}
        </h1>
      </div>
    </main>
  )
}
