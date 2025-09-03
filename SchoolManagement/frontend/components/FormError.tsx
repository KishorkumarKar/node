"use client";
const alertClass = {
  info: "text-blue-800 dark:text-blue-400 bg-blue-50",
  danger: "text-red-800  dark:text-red-400 bg-red-50",
  success: "text-green-800 dark:text-green-400 bg-green-50",
};
type errorType = {
  type: keyof typeof alertClass;
  text: string;
};

// props type for Header
type MethodProps = {
  error: errorType;
};

export default function FormError({ error }: MethodProps) {
  return (
    <>
      <div
        className={
          "p-4 mb-4 text-sm rounded-lg dark:bg-gray-800 " +
          alertClass[error.type]
        }
        role="alert"
      >
        <span className="font-medium">{error.text}</span>
      </div>
    </>
  );
}
