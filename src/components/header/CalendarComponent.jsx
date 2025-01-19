import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { RxCross1 } from "react-icons/rx";

function CalendarComponent({
  outboundDate,
  returnDate,
  isCalendarVisible,
  setOutboundDate,
  setReturnDate,
  setIsCalendarVisible
}) {
  const handleDateChange = (date) => {
    if (!outboundDate || (outboundDate && returnDate)) {
      setOutboundDate(date);
      setReturnDate(null); 
      if (outboundDate && returnDate) {
      }
    } else if (!returnDate && date >= outboundDate) {
      setReturnDate(date);
      handleCloseCalendar(); 
    }
  };

  const handleReturnNotNeeded = () => {
    setReturnDate(null);
    setIsCalendarVisible(false);
  };

  const handleCloseCalendar = () => {
    setIsCalendarVisible(false);
  };

  const currentDate = new Date();
  const oneYearLater = new Date();
  oneYearLater.setFullYear(currentDate.getFullYear() + 1);

  return (
    <>
      {isCalendarVisible && (
        <div className="w-full h-[100vh] bg-white z-40 overflow-y-hidden absolute top-0 right-0 md:top-[73px] md:right-[180px] md:w-[450px] md:h-[500px] md:drop-shadow-md  ">
            <div className="md:hidden">
            <button
              onClick={handleCloseCalendar}
              className="absolute top-2 right-2"
            >
              <RxCross1 size={20} />
            </button>

            <h1 className="workfontb text-[1.3em] p-2">Flight date</h1>
            <div className="flex mx-auto w-[90%] m-2 text-center text-[1.1em] border-b pb-6">
              <div className="p-2 border-2 rounded-l-lg w-[50%]">
                <span>
                  {outboundDate
                    ? outboundDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "Outbound"}
                </span>
              </div>
              <div className="p-2 border-2 rounded-r-lg w-[50%]">
                <span>
                  {returnDate
                    ? returnDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "Return"}
                </span>
              </div>
            </div>

            </div>
          <div id="calendar" className="mt-4 mx-auto w-[80%] justify-center">
            <Calendar
              onChange={handleDateChange}
              onClickDay={handleDateChange}
              selectRange={true}
              minDate={currentDate}
              maxDate={oneYearLater}
              minDateForReturn={outboundDate || currentDate}
              className="rounded-lg react-calendar"
              formatShortWeekday={(locale, date) =>
                date.toLocaleDateString(locale, { weekday: "short" })[0].toUpperCase()
              }
            />
          </div>

          <div className="w-full flex justify-center">
            <button
              onClick={handleReturnNotNeeded}
              className="bg-[#37a6db] w-[60%] text-white rounded-lg mx-auto p-3 my-6"
            >
              Return ticket not needed
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CalendarComponent;
