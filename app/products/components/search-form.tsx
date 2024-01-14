"use client"
import { FormPendingContainer, SubmitButton } from "@/components/forms"
type searchFormProps = { action: any }

export function SearchForm({ action }: searchFormProps) {
  return (
    <form action={action} className="w-full">
      <FormPendingContainer className="w-full flex items-start justify-between">
        <input type="text" name="searchText" placeholder="search for anything ..." className="flex-grow border-gray-200 border focus:border-[#33CC99] focus:outline-none focus:shadow-lg rounded-lg p-2 px-4" />
        <SubmitButton>Magic Search<img src="sparkle.svg" className="w-5 h-5 ml-1" /></SubmitButton>
      </FormPendingContainer>
    </form>
  );
}