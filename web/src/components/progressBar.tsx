interface ProgressBarProps{
    progress : number;
}


export function ProgressBar(props: ProgressBarProps){
    return (
        <div className='h3 rounded-xl'>
        <div 
        role="progressbar"
        aria-label='Barra de progresso'
        aria-aria-valuenow={props.progress}
        className='bg-violet-600 h-3 rounded-xl '
        style={{width: `${props.progress}%`}}
        />
    </div>
    )
}