import React, { useMemo } from 'react'
import {AiOutlineArrowLeft,AiOutlineArrowRight,AiOutlineArrowDown, AiOutlineArrowUp} from 'react-icons/ai'
import { useSelector } from 'react-redux'
import {useTable, useSortBy,usePagination} from 'react-table'
import { USERCOLUMNS } from '../columns/userColumns'
import { selectAllUser } from '../features/userSlice'

const UserTable = () => {
    const userState = useSelector(selectAllUser)
    console.log(userState.users)
    const columns = useMemo(()=>USERCOLUMNS,[])
    const users = useMemo(()=>userState.users,[])

    const tableInstance = useTable({
        columns:columns,
        data:users
    },
    useSortBy,usePagination)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        prepareRow,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        pageCount
    } = tableInstance

    const {pageIndex} = state


  return (
    <>
    <table {...getTableProps()} className="border border-slate-300 rounded-md w-full text-left text-sm bg-white "  >
        <thead className='font-thin text-slate-500'>
            {
                headerGroups.map((headerGroup,i)=>(
                    <tr  key={i} {...headerGroup.getHeaderGroupProps()}  >
                        {headerGroup.headers.map((column,i)=>(
                                <th key={i} {...column.getHeaderProps(column.getSortByToggleProps())} className="px-4 py-2 text-slate-500">
                                    
                                    <span className='inline flex items-center gap-2'>
                                    {column.render('Headers')}
                                        {column.isSorted ? 
                                            (column.isSortedDesc ? 
                                               <AiOutlineArrowDown/> : <AiOutlineArrowUp/>)
                                                :
                                                ''
                                        }
                                    </span>
                                </th>
                        ))}
                    </tr>
                ))
            }
            
        </thead>
        <tbody {...getTableBodyProps()} >
            {
                page.map((row,i)=>{
                    prepareRow(row)
                    const style = `${i % 2 ? 'bg-[#f9fafb]' : 'bg-white'}`
                    return (
                        <tr  key={i} {...row.getRowProps()}  className={`${style} text-sm`}>
                            {
                                row.cells.map((cell,i)=>{
                                    return <td className="px-4 py-4" key={i} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })
                            }
                        </tr>
                    )
                })
            }
           
        </tbody>
    </table>
    <div className='w-full flex items-center justify-between px-10 py-3 border border-slate-300 border-t-0 rounded-b-lg bg-white'>
       
        
        <button onClick={()=> previousPage()} disabled={!canPreviousPage} className='px-2 py-1 flex items-center gap-2 border border-slate-300 rounded-md text-slate-900 font-semibold'><AiOutlineArrowLeft/>Previous</button>

        <div style={{display:'inline'}}>
        
        {Array.apply(null, Array(pageCount)).map((x,i)=>{
                var style = ''
                if(pageIndex===i){
                    style = 'bg-gray-300 text-black'
                }else{
                    style = 'bg-none'
                }
            return(
                <button key={i} onClick={()=>gotoPage(i)} className={`${style} py-2 px-4 mx-2 rounded-md text-slate-600`}>{i + 1}</button>
            )
        })}
        </div> 

        <button onClick={()=>nextPage()} disabled={!canNextPage}  className='px-2 py-1 flex items-center gap-2 border border-slate-300 rounded-md text-slate-900 font-semibold'>Next <AiOutlineArrowRight/></button>
    </div>
   
    </>
  )
}

export default UserTable