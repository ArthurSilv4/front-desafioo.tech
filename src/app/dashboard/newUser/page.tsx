import { NewUserForms } from "@/components/Forms/NewUserForms/page";

export default function NewUser() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="mx-auto p-4 max-w-5xl">
        <NewUserForms/>
      </div>
    </div>
  );
}
