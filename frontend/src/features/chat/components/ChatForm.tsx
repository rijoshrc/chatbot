import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFrappeCreateDoc } from "frappe-react-sdk";
import { Send } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";

type Props = {};

const ChatForm = (props: Props) => {
  const [input, setInput] = useState("");

  const { conversationId } = useParams();

  const inputLength = input.trim().length;

  const { createDoc } = useFrappeCreateDoc();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputLength === 0) return;

    await createDoc("Message", {
      text: input,
      conversation: conversationId,
      type: "User",
    });

    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center space-x-2"
    >
      <Input
        id="message"
        placeholder="Type your message..."
        className="flex-1"
        autoComplete="off"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <Button type="submit" size="icon" disabled={inputLength === 0}>
        <Send />
        <span className="sr-only">Send</span>
      </Button>
    </form>
  );
};

export default ChatForm;
