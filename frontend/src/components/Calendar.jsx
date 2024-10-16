import "bear-react-datepicker/dist/index.css";
import { Datepicker } from "bear-react-datepicker";
import { useState } from "react";

// frontend/src/components/calendar.jsx
const Calendar = () => {
  const [myDate, setMyDate] = useState(new Date());

  return (
    <div>
      <Datepicker onChange={setMyDate} value={myDate} />
    </div>
  );
};

export default Calendar;
