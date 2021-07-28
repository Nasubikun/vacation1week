import DatePicker from '@material-ui/lab/DatePicker';
// import { DatePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from "date-fns/locale/ja";
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import { parseISO } from 'date-fns'; 
import { useEffect } from "react";

const CalendarV2 = ({date,setDate}) =>{

  // useEffect(() =>{
  //   setDate(parseISO(date))
  // },[]);

    // const [previewDate, setPreviewDate] = useState(new Date());
    console.log({date})

    return <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker
      // autoOk={true}
      orientation="landscape"
      variant="static"
    //   disablePast={true}
      disableToolbar={true}
      openTo="date"
      value={date}
      onChange={setDate}
    />
</LocalizationProvider>
}

export default CalendarV2