interface FormErrorsProps<T extends Record<string, any>> {
  fieldKey: keyof T;
  errors: T | undefined;
  children: React.ReactNode;
}

export function FormErrors<T extends Record<string, any>>({
  errors,
  fieldKey,
  children,
}: FormErrorsProps<T>) {
  const error_message = errors?.[fieldKey]?.message;
  if (!error_message) return children;
  return (
    <div className="w-full text-error bg-error/10 rounded-lg p-1">
      {children}
      <p className="text-error">{error_message}</p>
    </div>
  );
}

interface GeneralFormError {
  error_message?: string;
}

export function GeneralFormError({ error_message }: GeneralFormError) {
  if (!error_message) return;
  return (
    <div className="w-full text-error bg-error/10 rounded-lg p-[3%]">
        <p className="text-error">{error_message}</p>
    </div>
  );
}
