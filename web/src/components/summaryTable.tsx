import { generatesDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning"
import { HabitDay } from "./habitDay";

const weekday = ['D','S','T','Q','Q','S','S']

const summaryDates = generatesDatesFromYearBeginning()

const minimumSummarySize = 18 * 7
const amountOfDaysToFill = minimumSummarySize - summaryDates.length

export function SummaryTable(){
    return(
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
               
            {weekday.map((weekday, i) =>{
                return(
                    <div key={`${weekday}-${i}`} className="text-zinc-400 text-xl font-bold h-10  w-10 flex items-center justify-center">{weekday}</div>
                )})}
            </div>
            <div className="grid grid-rows-7 grid-flow-col gap-3">
                    {summaryDates.map(date =>{
                        return <HabitDay key={date.toString()}
                        amount={1}
                        completed={0}
                        />
                    })}
                    {(amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill}).map((_,i) => {
                        return(
                            <div key={i} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"></div>
                        )
                    }))}
            </div>
        </div>
    )
}