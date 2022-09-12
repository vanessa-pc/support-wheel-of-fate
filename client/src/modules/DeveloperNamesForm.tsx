import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

//type for form fieldarray
type FormValues = {
  developers: {
    firstName: string;
    lastName: string;
  }[];
};
export const DeveloperNamesForm = () => {
  //useform declarations and setting defaultValues
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormValues>({
    defaultValues: { developers: [{ firstName: "", lastName: "" }] },
    mode: "onBlur",
  });

  //declare our fieldarray
  const { fields, append, remove } = useFieldArray({
    name: "developers",
    control,
  });

  //function to parse data for database
  const parseDataforDatabase = (developer: {
    firstName: string;
    lastName: string;
  }) => {
    return { first_name: developer.firstName, last_name: developer.lastName };
  };

  const onSubmitForm = (data: FormValues) => {
    data.developers.map(async (developer) => {
      try {
        const body = parseDataforDatabase(developer);
        console.log("body", body);
        await fetch("http://localhost:8000/developers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        alert("Successfully added your team!");
      } catch (error) {
        throw error;
      }
    });
  };

  // refresh fieldarrays once data have been sent
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ developers: [] });
      append({} as any);
    }
  }, [isSubmitSuccessful, reset, append]);

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="outline outline-pink bg-lightPink outline-1 p-4 rounded-md"
    >
      {fields.map((field: any, index: number) => {
        return (
          <div key={field.id}>
            <section key={field.id}>
              <>
                <div className="flex justify-between items-center gap-12 mb-4">
                  <div className="flex gap-4">
                    <span>{index + 1}.</span>

                    <input
                      className="shadow shadow-pink focus:ring-1 outline-none ring-pink text-center rounded-md"
                      placeholder="First Name"
                      type="string"
                      {...register(`developers.${index}.firstName`, {
                        required: "First name is required!",
                      })}
                    />
                    <span
                      role="alert"
                      id="error-name-required"
                      className="text-red"
                      style={{
                        display:
                          errors?.developers &&
                          errors?.developers[index]?.firstName &&
                          errors?.developers[index]?.firstName?.type ===
                            "required"
                            ? "block"
                            : "none",
                      }}
                    >
                      {errors?.developers &&
                        errors?.developers[index]?.firstName &&
                        errors?.developers[index]?.firstName?.message}
                    </span>

                    <input
                      className="shadow shadow-pink focus:ring-1 outline-none ring-pink text-center rounded-md"
                      placeholder="Last Name"
                      type="string"
                      {...register(`developers.${index}.lastName`, {
                        required: "Last name is required!",
                      })}
                    />
                  </div>
                  <span
                    role="alert"
                    id="error-name-required"
                    className="text-red"
                    style={{
                      display:
                        errors?.developers &&
                        errors?.developers[index]?.lastName &&
                        errors?.developers[index]?.lastName?.type === "required"
                          ? "block"
                          : "none",
                    }}
                  >
                    {errors?.developers &&
                      errors?.developers[index]?.lastName &&
                      errors?.developers[index]?.lastName?.message}
                  </span>
                  <button
                    className="transition-colors duration-150 bg-red rounded-md cursor-pointer focus:shadow-outline  hover:bg-pink text-center px-2 border border-red"
                    type="button"
                    onClick={() => {
                      if (fields.length > 1) {
                        remove(index);
                      }
                    }}
                  >
                    Remove
                  </button>
                </div>
              </>
            </section>
          </div>
        );
      })}
      <div className="mt-8 flex gap-4 justify-center">
        <button
          className="transition-colors duration-150 bg-purple rounded-md cursor-pointer focus:shadow-outline  hover:bg-lightPurple text-center px-2 border border-purple"
          type="button"
          onClick={() => append({} as any)}
        >
          Add
        </button>
        <input
          className="transition-colors duration-150 bg-green rounded-md cursor-pointer focus:shadow-outline  hover:bg-lightGreen text-center px-2 border border-green"
          type="submit"
          value="Save Team"
        ></input>
      </div>
    </form>
  );
};
