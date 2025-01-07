import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Conversation } from "@/types/AiChatbot/Conversation";
import { Message } from "@/types/AiChatbot/Message";
import {
  useFrappeDocTypeEventListener,
  useFrappeGetDoc,
  useFrappeGetDocList,
} from "frappe-react-sdk";
import { useNavigate, useParams } from "react-router";
import ChatForm from "./ChatForm";

const ChatList = () => {
  const navigate = useNavigate();
  const { conversationId } = useParams();

  const { open } = useSidebar();

  if (!conversationId) return;

  const { data, mutate } = useFrappeGetDocList<Message>("Message", {
    fields: ["text", "type", "name"],
    filters: [["conversation", "=", conversationId + ""]],
  });

  const { data: conversation } = useFrappeGetDoc<Conversation>(
    "Conversation",
    conversationId,
    { fields: ["embedding_status"] }
  );

  useFrappeDocTypeEventListener("Message", () => {
    mutate();
  });

  // const isProcessing = conversation?.embedding_status === "Processing";

  // if (isProcessing)
  //   return (
  //     <div className="flex items-center justify-center h-full">
  //       <Spinner>Processing your file..</Spinner>
  //     </div>
  //   );

  return (
    <div className={`h-full pt-10 overflow-hidden h-max-screen max-h-screen `}>
      <div className="absolute top-2 right-2">
        <Button
          size="icon"
          variant="outline"
          className="ml-auto rounded-full"
          onClick={() => navigate("/")}
        >
          <Plus />
        </Button>
      </div>

      <div className="space-y-4 flex flex-col overflow-y-auto pb-20 max-h-full">
        {data?.map((message) => (
          <div
            key={message.name}
            className={`p-2.5 rounded-lg ${
              message.type === "User"
                ? "ml-auto bg-primary text-white"
                : "mr-auto bg-muted max-w-[75%]"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div
        className={`absolute bottom-0 right-0 p-2.5 bg-background ${
          open ? "md:left-[16rem]" : "left-0"
        }`}
      >
        <ChatForm />
      </div>
    </div>
  );
};

export default ChatList;
