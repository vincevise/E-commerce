export const USERCOLUMNS = [
    
    {
        Headers:'Name',
        accessor:'user',
        Cell:({row})=>(
            <div className='flex items-center gap-2'>
                <div className='w-10 rounded-full overflow-hidden'>
                    <img src={row.original.photo} alt="" className='w-max-full'/>
                </div>
                <div>
                    {row.original.username}
                </div>
            </div>
        )
    },
    {
        Headers:'Email',
        accessor:'email'
    },
    {
        Headers:'Role',
        accessor:'roles'
    },
     
]