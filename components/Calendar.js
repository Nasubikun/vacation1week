import { DatePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from "date-fns/locale/ja";
import { parseISO } from 'date-fns'; 

const Calendar = ({date,setDate}) =>{

    // const [previewDate, setPreviewDate] = useState(new Date());
    console.log({date})

    return <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
    <DatePicker
      autoOk={true}
      orientation="landscape"
      variant="static"
    //   disablePast={true}
      disableToolbar={true}
      openTo="date"
      value={parseISO(date)}
      onChange={setDate}
    />
</MuiPickersUtilsProvider>
}

export default Calendar