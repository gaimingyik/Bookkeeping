import classNames from 'classnames'
import './index.scss'
import { useMemo, useState } from 'react'
import {billTypeToName} from '@/contants'
import Icon from '@/components/icon'
const DailyBill = ({date,billList}) => {
    const dataResilt = useMemo(()=>{
        const pay = billList.filter(item=>item.type==='pay').reduce((pre,cur)=>{
            return pre+cur.money
        },0)
        const income = billList.filter(item=>item.type==='income').reduce((pre,cur)=>{
            return pre+cur.money
        },0)
        return {
            pay,
            income,
            balance:income+pay
        }
    },[billList])
    const [flow,setFlow] = useState(false)
  return (
    <div className={classNames('dailyBill')}>
      <div className="header" onClick={()=>setFlow(!flow)}>
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames('arrow',flow&&'expand')}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dataResilt.pay}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dataResilt.income}</span>
          </div>
          <div className="balance">
            <span className="money">{dataResilt.balance}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      {/* 单日列表 */}
   {flow&&<div className="billList">
  {billList.map(item => {
    return (
      <div className="bill" key={item.id}>
        <Icon type = {item.useFor}/>
        <div className="detail">
          <div className="billType">{billTypeToName[item.useFor]}</div>
        </div>
        <div className={classNames('money', item.type)}>
          {item.money.toFixed(2)}
        </div>
      </div>
    )
  })}
</div>}
    </div>
  )
}
export default DailyBill