import { Card } from '@tremor/react'

import EvalList from '../components/evalList'
import Tabs from '../components/Tabs'
import UserInfo from '../components/UserInfo'

function DashboardCliente() {
  return (
    <>
    <Card>
      <div className='container mxauto pt-10'>
        <h2 className='text-4xl font-bold text-center'>Información Personal</h2> 
        <UserInfo />
        <h2 className='text-4xl font-bold text-center'>Evaluaciones</h2>
        <div className='grid gap-10 px-5 pt-10'>
          <EvalList />
        </div>
        <div className='grid gap-10 px-5 pt-10'>
          <Tabs />
        </div>
        {/*<div className='grid grid-cols-8 mt-2'>
          <div className='col-span-2'>
            <ListUsageExample />
          </div>
          <div className='col-span-6 px-5'>
            <Card>
              <AreaChartUsageExample />
            </Card>
          </div>
        </div>*/}
      </div>
      </Card>
    </>
  )
}

export default DashboardCliente;





