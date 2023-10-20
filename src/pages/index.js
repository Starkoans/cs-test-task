import { Manrope } from 'next/font/google'
import {useEffect, useState} from "react";
import Select from "@/ui/Select";

const inter = Manrope({ subsets: ['latin'] })

export default function Home() {
  const ordinate = ['0', '500', '1 000', '2 000', '5 000', '10 000'];
  const months_en = [ "January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October", "November", "December" ]
  const months_ru = ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'];
  const [abscissa, setAbscissa] = useState([]);
  const [chart, setChart] = useState({});
  const [period, setPeriod] = useState('month')

  useEffect(() => {
    const getUserInfo = async (period) => {
      const res = await fetch('https://652f96cc0b8d8ddac0b2c287.mockapi.io/user')
      const data = await res.json();
      const chartData = data[0].finance.periods[0].graph;
      setChart(chartData[period]);
        let y = [];
        for (let key in chartData[period]) {
          const monthName = months_en.find((elem) => (key === elem))
          const i = months_en.indexOf(monthName)
          y.push(months_ru[i]);
          setAbscissa(y);
        }
    }
    getUserInfo(period);
  },[period])

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className='grid gap-[28px]'>
        <div className='flex justify-end'>
          <Select
              defValue={period}
              onChange={(value)=> setPeriod(value)}
              options={[{
                text:'За последний месяц', value:'month'},
                {text:'За последний год', value: 'year'},
                {text:'За последние 6 месяцев', value: 'half_year'}]}
          />
        </div>
      <div className='chart'>
        <div className='ordinate'>
          {ordinate.reverse().map((y, index) => (
              <span
                  className='self-end'
                  key={index}>{y}</span>))}
        </div>
          <div className='abscissa'>
            {
              Object.entries(chart).map(([key, value],index)=>{
                let endHeight = 1;
                switch (true) {
                  case  (value > 0 && value <= 1000):
                    endHeight = value/10;
                    break;
                  case (value > 1000 && value <= 2000):
                    endHeight = value/13;
                    break;
                  case (value > 2000 && value <= 5000):
                    endHeight = value/25;
                    break;
                  case (value > 5000 && value <= 10000):
                    endHeight = value/40;
                    break;
                  default:
                    endHeight = 1;
                    break;
                }
                return(
                    <div key={key} className='bar-container'>
                    <div  className='bar' style={{height:`${endHeight}px`}}>
                      {value &&
                          <span className='bar-value'>
                            {value}
                          </span>
                      }
                    </div>
                      <span className='pt-[10px] h-[30px]' key={index}>
                        {
                            period === 'month' ?
                                (key == 1 || key % 5 == 0) ?
                                    key < 10 ? `0${key}` : key
                                    : ''
                                : abscissa[index]
                        }
                      </span>

                    </div>
                    )
              })
            }
          </div>
      </div>
      </div>
    </main>
  )
}