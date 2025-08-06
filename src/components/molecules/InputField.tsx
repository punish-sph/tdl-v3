import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputType?: string;
  name: string;
  id: string;
  placeholder?: string;
  error?: string;
}

export default function InputField({
  label,
  inputType = "text",
  name,
  id,
  placeholder,
  error,
  ...props
}: InputFieldProps) {
  return (
    <div className="mb-4">
      <Label id={id}>{label}</Label>
      <Input
        type={inputType}
        name={name}
        id={id}
        placeholder={placeholder}
        className="border-purple-500 bg-transparent text-white focus:ring-purple-500"
        {...props}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
