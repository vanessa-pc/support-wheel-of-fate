import { useState } from "react";
import { useForm } from "react-hook-form";

// types for criteria needed to generate the roster by
type CriteriaTypes = {
  criteria: {
    oneShiftPerDay?: boolean;
    twoShiftsInTwoWeeks?: boolean;
    noTwoShiftsOnSameDay?: boolean;
    noTwoShiftsOnConsecutiveDays?: boolean;
  };
};

export const CriteriaChecklist = () => {
  //useform variable declarations and setting defaultValues for checked status of checkboxes
  const {
    setValue,
    handleSubmit,
    // formState: { errors },
  } = useForm<CriteriaTypes>({
    defaultValues: {
      criteria: {
        oneShiftPerDay: false,
        twoShiftsInTwoWeeks: false,
        noTwoShiftsOnConsecutiveDays: false,
        noTwoShiftsOnSameDay: false,
      },
    },
  });

  const [oneShiftPerDay, setOneShiftPerDay] = useState(false);
  const [twoShiftsInTwoWeeks, setTwoShiftsInTwoWeeks] = useState(false);
  const [noTwoShiftsOnConsecutiveDays, setNoTwoShiftsOnConsecutiveDays] =
    useState(false);
  const [noTwoShiftsOnSameDay, setNoTwoShiftsOnSameDay] = useState(false);

  // parsing data to sent to backend database
  const parseDataforDatabase = ({ criteria }: CriteriaTypes) => {
    return {
      one_shift_per_day: criteria.oneShiftPerDay,
      two_shifts_in_two_weeks: criteria.twoShiftsInTwoWeeks,
      no_two_shifts_on_consecutive_days: criteria.noTwoShiftsOnConsecutiveDays,
      no_two_shifts_on_same_day: criteria.noTwoShiftsOnSameDay,
    };
  };

  //submit function with an alert
  const onSubmitChecklist = async (data: CriteriaTypes) => {
    try {
      const body = parseDataforDatabase(data);
      await fetch("http://localhost:8000/rosters-criteria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      alert("Successfully saved your criteria!");
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="mt-8">
        <form
          onSubmit={handleSubmit(onSubmitChecklist)}
          className="outline outline-pink bg-lightPink outline-1 p-4 rounded-md"
        >
          <span className="text-md font-semibold">
            Please select your preferred roster criteria from those below:
          </span>
          <div className="flex justify-center gap-4 form-check">
            <label>Maximum of one shift per day</label>
            <input
              type="checkbox"
              className="w-4 h-4 text-purple disabled:bg-lightGray rounded border checked:bg-purple focus:ring-lightPurple focus:ring-2"
              onChange={(event) => {
                setValue(
                  "criteria.oneShiftPerDay",
                  event.target.checked ? true : false
                );
                setOneShiftPerDay(!oneShiftPerDay);
              }}
              checked={oneShiftPerDay}
            />
          </div>
          <div className="flex justify-center gap-4">
            <label>Maximum of two shifts in a 2-week period</label>
            <input
              className="w-4 h-4 text-purple bg-lightGray rounded border border-gray focus:ring-lightPurple focus:ring-2"
              type="checkbox"
              onChange={(event) => {
                setValue(
                  "criteria.twoShiftsInTwoWeeks",
                  event.target.checked ? true : false
                );
                setTwoShiftsInTwoWeeks(!twoShiftsInTwoWeeks);
              }}
              checked={twoShiftsInTwoWeeks}
            />
          </div>
          <div className="flex justify-center gap-4">
            <label>No two shifts on consecutive days</label>
            <input
              className="w-4 h-4 text-purple bg-lightGray rounded border border-gray focus:ring-lightPurple focus:ring-2"
              type="checkbox"
              onChange={(event) => {
                setValue(
                  "criteria.noTwoShiftsOnConsecutiveDays",
                  event.target.checked ? true : false
                );
                setNoTwoShiftsOnConsecutiveDays(!noTwoShiftsOnConsecutiveDays);
              }}
              checked={noTwoShiftsOnConsecutiveDays}
            />
          </div>
          <div className="flex justify-center gap-4">
            <label>No two shifts on the same day</label>
            <input
              className="w-4 h-4 text-purple bg-lightGray rounded border border-gray focus:ring-lightPurple focus:ring-2"
              type="checkbox"
              onChange={(event) => {
                setValue(
                  "criteria.noTwoShiftsOnSameDay",
                  event.target.checked ? true : false
                );
                setNoTwoShiftsOnSameDay(!noTwoShiftsOnSameDay);
              }}
              checked={noTwoShiftsOnSameDay}
            />
          </div>
          <div className="flex justify-center mt-4">
            <input
              className="transition-colors duration-150 bg-purple rounded-md cursor-pointer focus:shadow-outline  hover:bg-lightPurple text-center px-2 border border-purple"
              type="submit"
              value="Save Criteria"
            ></input>
          </div>
        </form>
      </div>
    </>
  );
};
