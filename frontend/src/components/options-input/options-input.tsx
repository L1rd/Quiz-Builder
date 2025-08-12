import { useFieldArray } from "react-hook-form";

type OptionsInputProps = {
  nestIndex: number;
  control: any;
  register: any;
  errors: any;
};

export const OptionsInput = ({ nestIndex, control, register, errors }: OptionsInputProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${nestIndex}.options`,
  });

  return (
    <div>
      <label className="block font-semibold mb-1">Options</label>
      {fields.map((field, i) => (
        <div key={field.id} className="flex items-center mb-2 space-x-2">
          <input
            {...register(`questions.${nestIndex}.options.${i}.text` as const)}
            className="flex-1 border border-gray-300 rounded px-2 py-1"
            placeholder="Option text"
          />
          <label className="inline-flex items-center space-x-1">
            <input
              type="checkbox"
              {...register(`questions.${nestIndex}.options.${i}.isCorrect` as const)}
              className="form-checkbox"
            />
            <span>Correct</span>
          </label>
          <button
            type="button"
            onClick={() => remove(i)}
            className="text-red-600 hover:text-red-800"
            aria-label="Remove option"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ text: '', isCorrect: false })}
        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        + Add Option
      </button>
      {errors?.questions?.[nestIndex]?.options && (
        <p className="text-red-600 mt-1">
          {errors.questions[nestIndex].options.message}
        </p>
      )}
    </div>
  );
}