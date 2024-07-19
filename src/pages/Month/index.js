import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import DayBill from './components/DayBill'
const Month = () => {
    const [dataVisble,setDateVisble] = useState(false)
    const [currentDate,setCurrentDate] = useState(()=>{
        return dayjs(new Date()).format('YYYY-MM')
     })
    
     const billList = useSelector(state=>state.bill.billList)
     const monthGroup = useMemo(()=>{
        return _.groupBy(billList,item=>dayjs(item.date).format('YYYY-MM'))
     },[billList])
     const [currentMonthList,setMonthList] = useState([])
// 开局就渲染好
useEffect(()=>{
    if(monthGroup[dayjs(new Date()).format('YYYY-MM')]){
       setMonthList(monthGroup[dayjs(new Date()).format('YYYY-MM')]) 
    }
},[monthGroup])
    const onConfirm = (value) => {
     setDateVisble(false)
     setCurrentDate(dayjs(value).format('YYYY-MM'))
     setMonthList(monthGroup[dayjs(value).format('YYYY-MM')])
     }
     const monthResilt = useMemo(()=>{
        if(currentMonthList.length===0){
            return {
                pay:0,
                income:0,
                balance:0
            }
        }
        const pay = currentMonthList.filter(item=>item.type==='pay').reduce((pre,cur)=>{
            return pre+cur.money
        },0)
        const income = currentMonthList.filter(item=>item.type==='income').reduce((pre,cur)=>{
            return pre+cur.money
        },0)
        return {
            pay,
            income,
            balance:income+pay
        }
    },[currentMonthList])
    const dayGroup = useMemo(()=>{
        const groupData = _.groupBy(currentMonthList,item=>dayjs(item.date).format('YYYY-MM-DD'))
        const keys = Object.keys(groupData)
        return{
            groupData,
            keys
        }
    },[currentMonthList])
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisble(true)}>
            <span className="text">
            {currentDate+''}月 账单
            </span>
            <span className={classNames('arrow',dataVisble&&'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{monthResilt.pay}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResilt.income}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResilt.balance}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dataVisble}
            onCancel={() => setDateVisble(false)}
            onConfirm={onConfirm}
            max={new Date()}
          />
        </div>
      {
      dayGroup.keys.map(key=>{
        return <DayBill key={key} date={key} billList={dayGroup.groupData[key]}/>
      })
      }
      </div>
    </div >
   
  )
}

export default Month