import { DatePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from "date-fns/locale/ja";

const Calendar = ({date,setDate}) =>{

    // const [previewDate, setPreviewDate] = useState(new Date());

    return <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
    <DatePicker
      autoOk
      orientation="landscape"
      variant="static"
    //   disablePast={true}
      disableToolbar={true}
      openTo="date"
      value={date}
      onChange={setDate}
    />
</MuiPickersUtilsProvider>
}

export default Calendar