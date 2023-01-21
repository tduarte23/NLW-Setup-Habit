import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { ProgressBar } from './progressBar';

interface HabitDayProps {
    completed: number;
    amount: number;
}

export function HabitDay({amount, completed}:HabitDayProps){
    const completedPorcentage = Math.round((completed / amount)*100)
    
    return(
    <Popover.Root>
        <Popover.Trigger className={clsx("w-10 h-10",{
            "w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg" : completedPorcentage === 0,
            "w-10 h-10 bg-violet-900 border-2 border-violet-700 rounded-lg" : completedPorcentage > 0 && completedPorcentage < 20,
            "w-10 h-10 bg-violet-800 border-2 border-violet-600 rounded-lg" : completedPorcentage >= 20 && completedPorcentage < 40,
            "w-10 h-10 bg-violet-700 border-2 border-violet-500 rounded-lg" : completedPorcentage >= 40 && completedPorcentage < 60,
            "w-10 h-10 bg-violet-600 border-2 border-violet-400 rounded-lg" : completedPorcentage >= 60 && completedPorcentage < 80,
            "w-10 h-10 bg-violet-500 border-2 border-violet-300 rounded-lg" : completedPorcentage >= 80,
        })}/>
        <Popover.Portal>
            <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col '>
                <span className='font-semibold text-zinc-400'>Terça-feira</span>
                <span className='mt-1 font-extrabold leading-tight text-3xl'>17/01</span>
                
                <ProgressBar progress={completedPorcentage}/>
               
                <Popover.Arrow height={8} width={16} className='fill-zinc-900'/>
            </Popover.Content>
        </Popover.Portal>
    </Popover.Root>
)
}