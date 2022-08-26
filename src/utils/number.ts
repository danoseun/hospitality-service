export const DaysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

enum roomTypesandWeekDayRates {
    'regular' = 7,
    'deluxe' = 8.5,
    'palatial' = 11
  }
  
  enum roomTypesandWeekendRates {
    'regular' = 10,
    'deluxe' = 12,
    'palatial' = 16
  }

export const hasOnlyDigits = (value: string) => {
    return /^\d+$/.test(value);
}

export const calculateFees = (day:string, roomType:string, exitDateTime:string, amountPaid:number, checkoutTime:string) => {
    if(DaysOfTheWeek.indexOf(day) < 5){
        const type = Object.keys(roomTypesandWeekDayRates).find(type => type === roomType);
          const rate = roomTypesandWeekDayRates[type as string];
          let timeDifference = Math.abs(+new Date(exitDateTime) - +new Date(checkoutTime));
          const here = ((timeDifference/1000)/60)/60;
          const ceil = Math.ceil(here)
          const overStayFees = ((ceil * rate)/100 * +amountPaid) + +amountPaid;
          return overStayFees;
    } else {
        const type = Object.keys(roomTypesandWeekendRates).find(type => type === roomType);
          const rate = roomTypesandWeekendRates[type as string];
          let timeDifference = Math.abs(+new Date(exitDateTime) - +new Date(checkoutTime));
          const here = ((timeDifference/1000)/60)/60;
          const ceil = Math.ceil(here)
          const overStayFees = ((ceil * rate)/100 * +amountPaid) + +amountPaid;
          return overStayFees;
    }
}