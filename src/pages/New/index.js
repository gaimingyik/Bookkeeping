import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { addBillList } from '@/store/modules/billStore'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
const New = () => {
    const [tapExpenditure,setExpenditure] = useState('pay')
  const navigate = useNavigate()
  const dispatch = useDispatch()
   const [money,setMoney] = useState('')
   const [useFor,setUseFor] = useState('')
//   const [useFor,setUseFor] = useState('')
const selectType = (type) => {
    return () => {
        setUseFor(type)
    }
   }
   const [date,setDate] = useState(new Date())
   const saveBill = () => {
    const data = {
        type:tapExpenditure,
        money:tapExpenditure==='pay'?-money:money,
        date:date,
       useFor:useFor
      }
      dispatch(addBillList(data))
      navigate(-1)
   }
   const [Open,steOpen] = useState(false)
   const onConfirm=(value)=>{
    setDate(value)
    steOpen(false)
   }
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            onClick={()=>setExpenditure('pay')}
            className={classNames(tapExpenditure==='pay'?'selected':'')}
          >
            支出
          </Button>
          <Button
          onClick={()=>setExpenditure('income')}
            className={classNames(tapExpenditure==='income'?'selected':'')}
            shape="rounded"
          >
            收入
          </Button>
        </div>

       <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={()=>steOpen(true)}>{dayjs(date).format('YYYY-MM-DD')}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={Open}
                onCancel={() => steOpen(false)}
                 onConfirm={onConfirm}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={value => setMoney(value)}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[tapExpenditure].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        useFor===item.type?'selected':''
                      )}
                      key={item.type}
                    >
                      <div className="icon" onClick={selectType(item.type)}>
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New